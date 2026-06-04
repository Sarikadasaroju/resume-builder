# Resume Builder

A Full Stack Resume Builder application built using React.js, Node.js, Express.js, SQLite, and JWT Authentication.

## Live Demo

(Add deployment link here after deployment)

---

## Features

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Resume Creation
- Personal Information Section
- Education Section
- Skills Section
- Projects Section
- Certifications Section
- Profile Photo Upload
- Resume Preview
- PDF Download
- Save Resume
- Update Resume
- Delete Resume
- Multiple Resume Templates
- Responsive Design

---

## Tech Stack

### Frontend

- React.js
- React Router
- Axios
- HTML2Canvas
- jsPDF
- CSS

### Backend

- Node.js
- Express.js
- SQLite
- JWT
- bcrypt

---

## Project Structure

```
resume-builder
│
├── backend
│   ├── database
│   ├── middleware
│   ├── routes
│   └── server.js
│
├── src
│   ├── components
│   ├── pages
│   ├── services
│   ├── styles
│   └── App.jsx
│
└── package.json
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Sarikadasaroju/resume-builder.git
```

### Frontend Setup

```bash
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

---

## API Endpoints

### Authentication

#### Register

```http
POST /api/auth/register
```

#### Login

```http
POST /api/auth/login
```

---

### Resume

#### Get Resumes

```http
GET /api/resumes
```

#### Create Resume

```http
POST /api/resumes
```

#### Update Resume

```http
PUT /api/resumes/:id
```

#### Delete Resume

```http
DELETE /api/resumes/:id
```

---

## Screenshots

### Login Page

(Add Screenshot)

### Resume Builder

(Add Screenshot)

### Resume Preview

(Add Screenshot)

---

## Future Enhancements

- AI Resume Suggestions
- Resume Sharing Link
- Resume Templates Marketplace
- Dark Mode
- Export to DOCX
- Resume Analytics

---

## Author

Sarika

GitHub:
https://github.com/Sarikadasaroju