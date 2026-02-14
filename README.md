# 🚀 GitHub to LINE Notification Bot

A lightweight Node.js webhook server that sends real-time LINE notifications using the **LINE Messaging API** whenever someone stars your GitHub repository. 

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![LINE](https://img.shields.io/badge/LINE_Messaging_API-00C300?style=for-the-badge&logo=line&logoColor=white)
![Ngrok](https://img.shields.io/badge/Ngrok-1F1E37?style=for-the-badge&logo=ngrok&logoColor=white)

## 📋 Prerequisites

ก่อนเริ่มใช้งาน ต้องเตรียมเครื่องมือเหล่านี้ให้พร้อม:
1. **Node.js** (v14+)
2. **Ngrok** (สำหรับทำ Local Tunnel)
3. **LINE Channel Access Token** & **User ID** จาก [LINE Developers Console](https://developers.line.biz/en/)

---

## 🛠️ Installation & Setup

**1. Clone or Create Project**
```bash
mkdir github-line-bot
cd github-line-bot
npm init -y
2. Install Dependencies

Bash
npm install express axios
3. Configure LINE API Keys
เปิดไฟล์ server.js และนำ Token กับ User ID ของคุณไปใส่ในตัวแปร:

JavaScript
const LINE_ACCESS_TOKEN = 'YOUR_CHANNEL_ACCESS_TOKEN';
const MY_USER_ID = 'YOUR_USER_ID';
🚀 How to Run (Local Development)
คุณต้องเปิด Terminal 2 หน้าต่างเพื่อรัน Server และ Ngrok ควบคู่กัน

Terminal 1: รัน Webhook Server

Bash
node server.js
# Output: 🚀 เซิร์ฟเวอร์ Webhook รันแล้วที่ http://localhost:3000
Terminal 2: รัน Ngrok เพื่อเปิดท่อออกเน็ต

Bash
.\ngrok http 3000
# ก๊อปปี้ลิงก์ Forwarding ที่ได้ (เช่น [https://abcd-1234.ngrok-free.app](https://abcd-1234.ngrok-free.app))
⚙️ GitHub Webhook Configuration
ไปที่ Repository ของคุณบน GitHub > Settings > Webhooks > Add webhook

Payload URL: ใส่ลิงก์ Ngrok ของคุณ แล้วตามด้วย /webhook
(ตัวอย่าง: https://abcd-1234.ngrok-free.app/webhook)

Content type: เลือก application/json ⚠️ (สำคัญมาก)

Which events: เลือก Let me select individual events.

ติ๊กเลือกเฉพาะ Stars แล้วกด Add webhook

🧪 Testing with Postman
หากต้องการทดสอบระบบโดยไม่ต้องพึ่ง GitHub ให้ยิง HTTP POST Request ไปที่ Localhost:

Method: POST

URL: http://localhost:3000/webhook

Headers: Content-Type: application/json

Body (raw/JSON):

JSON
{
  "action": "created",
  "repository": {
    "name": "my-awesome-repo"
  },
  "sender": {
    "login": "TestUser"
  }
}
หากตั้งค่าถูกต้อง บอทจะส่งข้อความเข้า LINE ของคุณทันที และ Postman จะได้รับ Status 200 OK


---

### 💡 ทริคเพิ่มเติม:
ถ้าบิ๊กอยากเอาโปรเจกต์นี้ดันขึ้น GitHub (Push to GitHub) เป็นผลงานอีกชิ้น **อย่าลืมลบ Token ของจริงออกจากไฟล์ `server.js` ก่อนนะครับ!** (ไม่งั้นเดี๋ยวคนอื่นเอาบอทเราไปรันเล่น) ให้แก้เป็นคำว่า `'YOUR_TOKEN_HERE'` ไว้แบบใน README ก็พอครับ

**อยากให้ผมช่วยบอกคำสั่ง Git สำหรับดันโปรเจกต์นี้ขึ้นไปเก็บเป็น Repository ใหม่บนโปรไฟล์ของบิ๊กเลยไหมครับ?** แบบรวดเดียวจบ!