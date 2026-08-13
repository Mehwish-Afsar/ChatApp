# 💬 Realtime Chat App

A full-stack real-time chat application built with **React, Node.js, Express, MongoDB, and Socket.io**.

## 🚀 Live Demo

[**View Live Demo**](https://ai-chatapp-dh2p.onrender.com/)

## ✨ Features

* 🔐 JWT Authentication
* ⚡ Real-time messaging with Socket.io
* 🟢 Online/Offline status
* ✍️ Typing indicators
* 🔔 Notification and typing sounds
* 📨 Welcome emails with Resend
* 🖼️ Image uploads with Cloudinary
* 🚦 API rate limiting with Arcjet
* 🎨 Responsive UI with React, Tailwind CSS & DaisyUI
* 🧠 Zustand for state management

## 🛠️ Tech Stack

**Frontend**

* React
* Tailwind CSS
* DaisyUI
* Zustand
* Socket.io Client

**Backend**

* Node.js
* Express.js
* Socket.io
* MongoDB & Mongoose
* JWT

**Services**

* Cloudinary
* Resend
* Arcjet

## 📁 Project Structure

```text
Chat_App/
├── Backend/
└── Frontend/
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Mehwish-Afsar/ChatApp.git
cd Chat_App
```

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 3. Configure Backend Environment Variables

Create a `.env` file inside `Backend`:

```env
PORT=3000

MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RESEND_API_KEY=your_resend_api_key
ARCJET_KEY=your_arcjet_key
```

### 4. Start Backend

```bash
npm run dev
```

### 5. Install Frontend Dependencies

Open another terminal:

```bash
cd Frontend
npm install
```

### 6. Start Frontend

```bash
npm run dev
```

The frontend will usually run at:

```text
http://localhost:5173
```

## 👩‍💻 Author

**Mehwish**

Software Engineering Student & MERN Stack Developer
