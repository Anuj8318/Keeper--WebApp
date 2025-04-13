# Keeper--WebApp
# 📝 Keeper Web App

A minimal, full-stack note-taking web application inspired by Google Keep. Users can **sign up, log in, create, edit, and delete notes** securely. Built with modern technologies including **React**, **Node.js**, and **PostgreSQL**.

---

## 🚀 Tech Stack

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/API-Express-black?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens&logoColor=white)

---

## 📸 UI Preview

| 🏠 Notes Dashboard | 🔐 Login & Sign Up |
|--------------------|--------------------|
| ![notes](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTgzNTFiOTM1N2Q3ZDZiNDQ2ZWI2ZjgyOWVjZjk4ZDY0ZmI2ZDg0NSZjdD1n/ftnIXIYyzMZ4nCZAgR/giphy.gif) | ![auth](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDdiYmVhM2JkZTRlODVmZjk1MTk1MzliZDY0Yzc5NzM4M2U5OTNiMCZjdD1n/8lIPx8FJg7nQ6p2aYZ/giphy.gif) |

---

## 🔧 Features

- ✅ User Authentication (JWT)
- 📝 Add, Edit, and Delete Notes
- 📦 Notes saved in PostgreSQL DB
- 🔐 Auth-protected `/app` route
- 📱 Responsive, lightweight UI

---

## 🛠️ How to Run the Project

### 1. Clone the repository
```bash
git clone https://github.com/your-username/keeper-web-app.git
cd keeper-web-app
```
### 2. Setup Backend
- Install dependencies:
```bash
cd backend
npm install
```
-  Create PostgreSQL database
-  Create a notes table and a users table as required.
-  Configure .env:
 ```bash
  PORT=3000
DATABASE_URL=your_postgres_connection_url
JWT_SECRET=your_jwt_secret
```
- Run the Server
``` bash
npm start
```
### 2. Setup Frontend
- Install dependencies:
```bash
cd frontend
npm install
```
- Run the Server
``` bash
npm run dev
```
## 📁 Folder Structure
/frontend
  └── src
      ├── components
      ├── App.jsx
      └── index.jsx
/backend
  ├── index.js
  ├── db.js
  └── routes
## 🙌 Acknowledgements
Inspired by Google Keep
Built with 💙 using the MERN-like stack (without Mongo)


📫 Contact
For questions, reach out to me at: anujsingh000@gmail.com

---

Let me know if you want me to:
- Replace with your actual GitHub repo link
- Add real screenshots or generate preview GIFs
- Help set up the `notes.sql` schema or `.env.example` file

Want a markdown file version of this?

