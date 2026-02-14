const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// ⚠️ เอา Token และ User ID ของ LINE Messaging API มาใส่ตรงนี้!
const LINE_ACCESS_TOKEN = '3PGTlX8RqFKhkbd1upMgDMSp8RM8FROe/BEsYZOPinhNsTh8yOcl80bbO95m+EQdHRAzhYp5oU+R0uLTYB/jB9av9wl/f8X5jQ/wbZU6JZ+x1Rq8Q/GRFwsVaUQDWCXbIqJ+pwlSiuOEj5cjWLCc8QdB04t89/1O/w1cDnyilFU=';
const MY_USER_ID = 'Uc9c07b67707bf4f360168f5babebdf71';

app.post('/webhook', async (req, res) => {
    const data = req.body;

    // เช็คว่าแอคชันคือการกด Star ใช่ไหม
    if (data.action === 'created' || data.action === 'started') {
        const repoName = data.repository?.name || "Unknown_Repo";
        const senderName = data.sender?.login || "Unknown_User";

        const messageText = `⭐ ว้าว! คุณ ${senderName} เพิ่งกด Star ให้โปรเจกต์ ${repoName}`;

        try {
            await axios.post('https://api.line.me/v2/bot/message/push', {
                to: MY_USER_ID,
                messages: [{ type: 'text', text: messageText }]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`
                }
            });
            console.log(`✅ ส่งแจ้งเตือน: ${senderName} กดดาวให้ ${repoName}`);

            // ✅ ถ้าส่งผ่าน ให้ Postman โชว์ว่า Success
            return res.status(200).json({
                status: "success",
                message: "LINE notification sent successfully!"
            });

        } catch (error) {
            const errorDetails = error.response ? error.response.data : error.message;
            console.error('❌ Error ส่ง LINE ไม่ผ่าน:', errorDetails);

            // ❌ ถ้าพัง ให้ Postman โชว์จอแดง (Status 500) พร้อมบอกรายละเอียด Error ของ LINE
            return res.status(500).json({
                status: "error",
                message: "Failed to send LINE notification",
                details: errorDetails
            });
        }
    }

    // กรณี GitHub ส่ง Event อื่นมา (เช่น ping เทสต์ระบบ) เราจะตอบกลับไปเฉยๆ เพื่อไม่ให้มันขึ้น Error
    return res.status(200).json({ status: "ignored", message: "Event not a star action." });
});

app.listen(3000, () => {
    console.log('🚀 เซิร์ฟเวอร์ Webhook รันแล้วที่ http://localhost:3000');
});