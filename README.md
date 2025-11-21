# trveFeedback

> **Where Truth Finds a Voice — Anonymous, Secure, AI-Powered Feedback**

trveFeedback is a modern web application that enables users to receive **anonymous feedback through a personal shareable link**, helping them gain honest insights for personal growth, peer evaluation, or social engagement. Built with **Next.js**, it features **secure authentication, email verification, AI-powered message suggestions using Gemini AI**, and a responsive, user-friendly interface.

🚀 Perfect for **portfolio enhancement, peer reviews, social posting, and professional feedback collection**.

## 🔗 Live Demo

👉 https://trve-feedback.vercel.app

## ✨ Features

| Feature                            | Description                                                          |
| ---------------------------------- | -------------------------------------------------------------------- |
| 🎯 Personalized Profile URL        | Each user gets a unique shareable link to collect anonymous messages |
| 🔐 Email / Password Authentication | Secure login and signup using NextAuth                               |
| 📨 OTP Email Verification          | SendGrid-powered OTP verification during signup                      |
| 🤐 Anonymous Message Sending       | Anyone can send messages without creating an account                 |
| 🤖 AI Message Suggestions          | Gemini AI helps generate thoughtful and creative feedback            |
| 🔎 Dashboard & Message Management  | Users can view and manage received messages securely                 |
| 🌐 Fully Responsive UI             | Clean, minimal, and responsive design using Tailwind + Shadcn UI     |
| 🚀 Production Deployment           | Optimized and deployed on Vercel with environment configs            |

## 🛠 Tech Stack

### Frontend & Styling

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI

### Backend & Services

- MongoDB
- NextAuth
- SendGrid (Email OTP)
- Gemini AI API
- JWT

### Libraries & Tools

- React Hook Form
- Zod
- Vercel Deployment

---

## 🚀 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/Jisan-Dev/trve_feedback.git
cd trve_feedback
npm install
npm run dev
```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory and configure the following:

```bash
MONGO_URI="your_mongodb_connection_string"
NEXTAUTH_SECRET="your_nextauth_secret"
GEMINI_API_KEY="your_gemini_api_key"
SENDGRID_API_KEY="your_sendgrid_api_key"
NEXT_PUBLIC_BASE_URL="https://trve-feedback.vercel.app"
```

> **💡 Note:** For local development, use `http://localhost:3000` as `NEXT_PUBLIC_BASE_URL`.

---

## 📘 User Flow

1️⃣ Sign up using email, password, and unique username \
2️⃣ Verify account using OTP sent via email (SendGrid) \
3️⃣ Access dashboard with your unique shareable feedback link \
4️⃣ Share the link on Instagram, WhatsApp, Facebook, or anywhere \
5️⃣ Senders submit anonymous messages (optionally using AI suggestions) \
6️⃣ Messages appear instantly in your private dashboard

---

## 💡 What I Learned

This project helped me enhance my understanding of:

✔ Full-stack development with Next.js & MongoDB\
✔ Secure authentication and OTP email verification\
✔ Working with AI APIs (Gemini AI)\
✔ Form validation using React Hook Form & Zod\
✔ Deployment, CI/CD, and environment configuration on Vercel\
✔ API handling, session management, and UI optimization

---

## 💼 Why This Project Matters

✔ Real-world application solving a genuine problem
✔ Showcases full-stack engineering using production tools
✔ Includes authentication, AI integration, email automation, and database management
✔ Fully deployed and optimized for scalability

---

## 📬 Contact

Istiak Kashem Jisan\
📧 istiakkashemjisan@gmail.com

💼 Portfolio: https://istiakjisan.vercel.app/

⭐ If you found this project interesting, consider giving it a star on GitHub!
