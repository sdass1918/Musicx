# 🎵 MusicX Quiz App

## 🚀 Overview

The **MusicX Quiz App** is a full-stack quiz creation tool that allows users to generate customized quizzes instantly by selecting a topic, difficulty level, and question count. It fetches questions from the **Open Trivia Database (TDB) API** and enables seamless quiz sharing through **Google Forms**. The application also includes secure **user authentication** using **Appwrite**.

---

## 🧠 Problem Statement

Creating and sharing custom quizzes online remains cumbersome for many, particularly those without technical expertise. Existing platforms often lack flexibility in topic-specific questions and require manual setup. The MusicX Quiz App solves this by automating quiz generation and form creation using public APIs and authentication systems.

---

## 🎯 Objective

To empower users to:

- Instantly create quizzes by choosing a topic and preferences.
- Fetch relevant questions from the Open Trivia DB API.
- Generate and share editable Google Forms containing quiz content.
- Securely login/logout using Appwrite Authentication.
- View quiz answers directly through a separate interface.

---

## 🛠 Methodology

### 1. Frontend (React + Appwrite)

- Built with **React** and **Vite**
- **Appwrite** authentication for user sessions
- UI for quiz customization
- Display fetched questions and options
- Integration with backend to generate Google Form
- Navigation to quiz answers page

### 2. Backend (Node.js Proxy Server)

- Acts as a CORS proxy
- Connects with **Google Forms API**
- Creates Google Forms with questions and options
- Returns `formUrl` and `editUrl`

### 3. Google Apps Script

- Used to script the creation of quizzes inside Google Forms

---

## 🧩 Project Structure

```
MusicX
│-- cors-proxy-server
│   │-- server.js
│   │-- package.json
│
│-- Frontend
│   │-- public/
│   │-- src/
│   │   ├── assets/
│   │   ├── Components/
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── LogoutBtn.jsx
│   │   │   ├── Pages/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Language.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Signup.jsx
│   │   │   │   ├── QuizAnswers.jsx
│   │   ├── conf/
│   │   │   └── conf.js
│   │   ├── lib/
│   │   │   ├── appwrite.js
│   │   │   └── fileConfig.js
│   │   ├── store/
│   │-- App.jsx
│   │-- App.css
│   │-- index.css
│-- .env
│-- vite.config.js
```

---

## 📚 Scope

- **Educators** can create quick tests for students.
- **Content Creators** can engage followers through quizzes.
- **Developers** can explore full-stack integration using APIs and Auth.

Future enhancements include:

- Timer-based quiz solving
- Result analysis and dashboard
- Support for importing/exporting quizzes

---

## 🔧 Tech Stack & Tools

| Feature            | Technology Used            |
| ------------------ | -------------------------- |
| Frontend Framework | React + Vite               |
| Backend Proxy      | Node.js                    |
| Auth               | Appwrite                   |
| Forms              | Google Forms + Apps Script |
| Quiz Data Source   | Open Trivia DB API         |
| Styling            | Tailwind CSS (optional)    |

---

## 📦 APIs Used

- [Open Trivia Database API](https://opentdb.com/)
- [Google Forms API](https://developers.google.com/forms/api)
- Google Apps Script for extended form creation

---

## ✅ Features

- 🔐 Secure user login/logout using Appwrite
- 📥 Fetch questions dynamically from category and difficulty
- 🧾 Auto-generate Google Forms with editable links
- 📤 Share quiz directly with others
- 📄 View answers to generated quiz

---

## 🙌 Acknowledgements

Thanks to:

- Open Trivia DB for providing the free trivia API.
- Appwrite for seamless authentication.
- Google for robust form APIs.

---
