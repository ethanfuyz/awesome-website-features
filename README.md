# 🔐 SIT774 10.4HD: Interactive Web Tutorial – Validation, Encryption and Styling

This project is created for the High Distinction task **10.4HD** of the Deakin University unit **SIT774: Web Technologies and Development**.

---

## 🌐 Project Overview

This is an interactive tutorial-style demo website that showcases:

### 1. **Custom Form Validation**
- Fully customized username and password requirements.
- Real-time feedback using JavaScript validation logic.
- Dynamic styling effects to highlight validation success/failure.

### 2. **Password Encryption and Storage**
- User-entered passwords are hashed using **bcrypt** (with adjustable cost factor).
- Encrypted data is stored securely using **SQLite3** as a file-based local database.

### 3. **Cool CSS & Visual Enhancements**
- Tailored **Bootstrap** components.
- Gradient backgrounds, hover animations, custom input borders.
- Responsive layout with scrollable feature tutorial section.

---

## 🎯 Purpose

This site is designed not just as a functional demo, but as a **tutorial experience**. It explains key front-end and back-end techniques through integrated UI and live interaction, making the learning process intuitive and engaging.

Users can:
- Experiment with input validation.
- See how bcrypt encryption works.
- Understand how user data is safely stored.

---

## 🛠️ Technologies Used

- HTML + CSS + JavaScript
- Node.js + Express
- bcryptjs / bcrypt
- SQLite3
- Bootstrap 5

---

## 📁 Structure

```
public_html/
├── demo.html        # Main page with form and tutorial
├── validation.js    # Custom validation and fetch logic
├── styles.css       # Custom visual design

index.js             # Server-side code (Express + bcrypt + SQLite)
database.db          # Local SQLite database
```

---

## 🧪 To Run Locally

1. Clone the repo  
2. Install dependencies:  
   `npm install express bcrypt sqlite3 body-parser`
3. Run the server:  
   `node index.js`
4. Open in browser:  
   `http://localhost:3000/demo.html`

---

## 👨‍🏫 Created for

Deakin University  
**SIT774 – Web Technologies and Development**  
**Task 10.4HD: Complete Awesome Website**
