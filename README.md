# TrueFeedback

> **Honest Thoughts, Anonymously Delivered.**

TrueFeedback is an anonymous messaging platform built with **Next.js**, where users can receive anonymous feedback via a personal URL. It also features an **AI-powered message suggestion system** using Gemini AI, making it easier for senders to craft thoughtful, meaningful messages.

---

## 🚀 Live Demo

👉 [https://trve-feedback.vercel.app](https://trve-feedback.vercel.app)

---

## ✨ Features

- **Personalized Feedback URLs for Users**
- **Anonymous Message Sending** — no sign-up required for senders
- **AI-Powered Message Suggestions** with Gemini API
- **Minimal, Secure, and Clean UI**
- **Secure Authentication with Email Verification** powered by SendGrid

---

## 🛠 Tech Stack

- **Next.js**
- **Tailwind CSS**
- **Shadcn**
- **MongoDB**
- **React Hook Form**
- **Zod**
- **SendGrid**
- **Gemini AI API**

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Jisan-Dev/trve_feedback
cd trveFeedback
npm install
npm run dev
```

## 🛑 Environment Variables

```js
MONGO_URI = your_mongodb_connection_string;
RESEND_API_KEY = your_resend_api_key;
NEXTAUTH_SECRET = your_nextauth_secret;
TRANSPORTER_PASS = your_email_transporter_password;
TRANSPORTER_EMAIL = your_email_address;
GEMINI_API_KEY = your_gemini_api_key;
SENDGRID_API_KEY = your_sendgrid_api_key;
```

## How to use the app?

- First sign up with a unique user name, email and password.
- You'll get a verification otp in your email to securely complete the signup process.
- You'll see a dashboard where you'll have unique URL which you can copy and share to your any groups or friends,
- Senders will click the URL and get to see options to send you the message. There they'll be able to get the help of Ai in generating random messages.
- After that in your homepage you'll be able to see the messages you received from them but their infos will remain anonymous.
