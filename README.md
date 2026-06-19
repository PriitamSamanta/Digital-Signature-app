# ✍️ Digital Signature Application

A full-stack Digital Signature Application that allows users to upload PDF documents, generate public signing links, send email invitations, collect signatures, track document activity, and download signed PDFs.

Built during the Innovexis Internship Program.

---

## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Document Management
- Upload PDF Documents
- View Documents
- Manage Document List

### Digital Signatures
- Create Typed Signatures
- Drag & Drop Signature Placement
- Reposition Signatures
- Save Signatures

### Public Signing
- Generate Public Signing Links
- Sign Documents Without Login
- Public Signature Workflow

### Email Invitations
- Send Signing Invitations via Email
- Secure Public Link Sharing

### Audit Trail
- Document Uploaded
- Public Link Generated
- Invitation Sent
- Public Signature Added
- Signer Name Tracking

### PDF Generation
- Generate Signed PDF
- Download Signed PDF

---

## 🛠️ Tech Stack

### Frontend
- Next.js 15
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Axios
- Zustand
- React PDF

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Nodemailer

---

## 📂 Project Structure

### Frontend

```bash
src/
├── app/
│   ├── dashboard/
│   ├── document/
│   ├── login/
│   ├── register/
│   └── sign/
│
├── features/
│   ├── auth/
│   ├── documents/
│   ├── signatures/
│   └── audit/
│
├── services/
├── store/
└── components/
```

### Backend

```bash
src/
├── controllers/
├── routes/
├── models/
├── middleware/
├── services/
└── utils/
```

---

## 📌 Core Workflow

```text
Upload Document
      ↓
Generate Public Link
      ↓
Send Email Invitation
      ↓
Public Signer Signs Document
      ↓
Audit Trail Updated
      ↓
Generate Signed PDF
      ↓
Download Signed PDF
```

---

## 🔐 Authentication Flow

```text
Register
    ↓
Login
    ↓
JWT Token Generated
    ↓
Protected Dashboard Access
```

---

## 📊 Audit Trail Events

The system tracks important document activities:

- DOCUMENT_UPLOADED
- PUBLIC_LINK_GENERATED
- INVITATION_SENT
- PUBLIC_SIGNATURE_ADDED

---

## 📧 Email Invitations

Users can:

- Generate Public Signing Links
- Send Signing Invitations via Email
- Allow Signers to Sign Without Creating Accounts

---

## 📄 Signed PDF Generation

The application overlays saved signatures onto PDF documents and generates a downloadable signed version.

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/digital-signature-app.git
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🔑 Environment Variables

### Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

FRONTEND_URL=http://localhost:3000
```

---


## 🔮 Future Enhancements

- Email Verification
- Forgot Password
- Multiple Signers
- Draw Signature Support
- Signature Expiry Links
- Cloud Storage (AWS S3)
- Role-Based Permissions
- Real-Time Notifications

---

## 👨‍💻 Author

Developed as part of the Innovexis Internship Program.

### Technologies Used

Next.js • TypeScript • Node.js • Express.js • MongoDB • JWT • Tailwind CSS • Nodemailer

---

## 📜 License

This project is developed for educational and portfolio purposes.
