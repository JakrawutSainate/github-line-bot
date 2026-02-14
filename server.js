require('dotenv').config(); // 👈 ต้องอยู่บรรทัดแรกสุดเพื่อโหลดค่าจาก .env
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// 🔐 ดึงค่าจาก Environment Variables
const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;
const MY_USER_ID = process.env.MY_USER_ID;
const PORT = process.env.PORT || 3000;

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

            return res.status(200).json({
                status: "success",
                message: "LINE notification sent successfully!"
            });

        } catch (error) {
            const errorDetails = error.response ? error.response.data : error.message;
            console.error('❌ Error ส่ง LINE ไม่ผ่าน:', errorDetails);

            return res.status(500).json({
                status: "error",
                message: "Failed to send LINE notification",
                details: errorDetails
            });
        }
    }

    return res.status(200).json({ status: "ignored", message: "Event not a star action." });
});

app.listen(PORT, () => {
    console.log(`🚀 เซิร์ฟเวอร์ Webhook รันแล้วที่ http://localhost:${PORT}`);
});