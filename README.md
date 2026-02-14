<div align="center">

# 🤖 GitHub to LINE Notification Bot

An elegant Node.js webhook server that delivers real-time notifications from GitHub directly to your LINE chat. <br/>
Never miss a star, push, or issue again!

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![LINE API](https://img.shields.io/badge/LINE_Messaging_API-00C300?style=for-the-badge&logo=line&logoColor=white)
![Ngrok](https://img.shields.io/badge/Ngrok-1F1E37?style=for-the-badge&logo=ngrok&logoColor=white)

</div>

---

## ✨ Features

- **Instant Notifications**: Receive alerts the moment someone stars or pushes to your repo.
- **Lightweight**: Built on Express.js with minimal dependencies.
- **Easy Setup**: Simple configuration with direct LINE API integration.
- **Customizable**: Extendable to handle Pull Requests, Issues, and CI/CD status updates.

---

## 📋 Prerequisites

Before you begin, ensure you have the following ready:

1.  **[Node.js](https://nodejs.org/)** (v14 or higher) installed.
2.  **[Ngrok](https://ngrok.com/)** installed (for local tunneling).
3.  A **LINE Channel Access Token** & **User ID** from the [LINE Developers Console](https://developers.line.biz/en/).

---

## � Installation & Setup

### 1. Clone & Install Dependencies

```bash
# Clone the repository (if hosted) or create a new folder
mkdir github-line-bot
cd github-line-bot

# Initialize project
npm init -y

# Install required packages
npm install express axios
```

### 2. Configure API Keys

Open `server.js` and replace the placeholder values with your credentials:

> [!WARNING]
> **Security Notice**: Avoid committing real API keys to GitHub. Use environment variables (like `dotenv`) for production apps.

```javascript
// server.js

// ⚠️ Replace with your actual LINE API credentials
const LINE_ACCESS_TOKEN = 'YOUR_CHANNEL_ACCESS_TOKEN';
const MY_USER_ID = 'YOUR_USER_ID';
```

---

## ⚡ How to Run (Local Development)

You need **two** terminal windows running simultaneously.

### Terminal 1: Start the Server

```bash
node server.js
# Output: 🚀 Webhook Server is running at http://localhost:3000
```

### Terminal 2: Expose Localhost via Ngrok

```bash
ngrok http 3000
```
Running this command will generate a **Forwarding URL** (e.g., `https://abcd-1234.ngrok-free.app`). Copy this URL.

---

## ⚙️ GitHub Webhook Configuration

1.  Go to your GitHub Repository > **Settings** > **Webhooks**.
2.  Click **Add webhook**.
3.  **Payload URL**: Paste your Ngrok URL followed by `/webhook`.
    - Example: `https://abcd-1234.ngrok-free.app/webhook`
4.  **Content type**: Select `application/json` (Critically important!).
5.  **Which events?**: Select **"Let me select individual events"** and check **Stars** (or Pushes/Pull requests based on your need).
6.  Click **Add webhook**.

---

## 🧪 Testing

### Option 1: Trigger via GitHub
Simply go to your repository and click the **Star** button (unstar/star again) to trigger an event. Wait for the notification on your LINE app!

### Option 2: Test via Postman

Send a `POST` request to `http://localhost:3000/webhook` with the following JSON body:

```json
{
  "action": "created",
  "repository": {
    "name": "my-awesome-repo"
  },
  "sender": {
    "login": "TestUser"
  }
}
```

**Expected Response:**
```json
{
  "status": "success",
  "message": "LINE notification sent successfully!"
}
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the bot's functionality.

---

<div align="center">
  <b>Made with ❤️ by <a href="https://github.com/JakrawutSainate">Jakrawut Sainate</a></b>
</div>