# 🏢 Society Desk

A full-stack **Society Desk** application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and a RESTful backend. The platform simplifies apartment maintenance management by allowing residents to report issues, track complaint progress, and receive email updates, while administrators efficiently manage complaints, priorities, overdue cases, notices, and analytics through a centralized dashboard.

---

# 🚀 Features

## 👤 Resident

* Secure Registration & Login
* Raise maintenance complaints
* Upload complaint photos
* Select complaint categories
* Track complaint status in real time
* View complete complaint history
* Receive email notifications on status updates
* Access the society notice board

## 🛠️ Admin

* Secure Admin Login
* View and manage all complaints
* Filter complaints by category, status, and date
* Assign priorities (Low, Medium, High)
* Update complaint status (Open → In Progress → Resolved)
* Add notes with every status update
* Automatically detect overdue complaints
* Post and pin important notices
* View maintenance analytics through a dashboard

---
<img width="698" height="449" alt="image" src="https://github.com/user-attachments/assets/766b7d4e-66bb-43fe-8059-bc8f3ae7ef31" />


# 📊 Dashboard

The Admin Dashboard provides:

* Total complaints
* Complaints by status
* Complaints by category
* Priority-wise statistics
* Overdue complaint count
* Recent complaint activities

---
<img width="671" height="447" alt="image" src="https://github.com/user-attachments/assets/ac361454-e37c-4fd8-86c1-5f71e116ae0e" />


# ⚙️ Tech Stack

### Frontend

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
<img width="703" height="461" alt="image" src="https://github.com/user-attachments/assets/2dced5c2-f74a-43c2-8845-a50bccc16d29" />

### Backend

* Node.js
* Express.js
* REST API
* JWT Authentication

### Database

* MongoDB
* Mongoose

### Additional Services

* Multer (Photo Upload)
* Cloudinary (Image Storage)
* Nodemailer (Email Notifications)

---
<img width="709" height="448" alt="image" src="https://github.com/user-attachments/assets/dfa712c9-277c-4071-82b4-aa6e531cd6a4" />

# 🛠️ Installation

### Clone the Repository

```bash
git clone <repository-url>
cd society-desk
```

### Install Dependencies
<img width="695" height="443" alt="image" src="https://github.com/user-attachments/assets/66801abb-feee-4f23-b95f-a7cfaba2f013" />

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file using the provided `.env.example`.

### Start the Development Server

```bash
npm run dev
```

Visit:

```text
http://localhost:4028
```

---

# 📁 Project Structure

```text
society-desk/
│
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── styles/
│   ├── types/
│   └── utils/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── uploads/
│
├── .env.example
├── package.json
└── README.md
```

---

# 🔄 Complaint Workflow

```text
Open
   ↓
In Progress
   ↓
Resolved
```

Each status update records:

* Timestamp
* Updated By
* Current Status
* Optional Notes

Once resolved, the complaint is automatically closed.

---

# 📸 Photo Upload

Residents can attach photos with maintenance complaints to help administrators identify and resolve issues more efficiently.

---

# 📢 Notice Board

Administrators can:

* Publish society-wide announcements
* Pin important notices
* Notify residents via email for important updates

---

# 📧 Email Notifications

Residents automatically receive emails when:

* Their complaint status changes
* A new important notice is posted

---

# 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run format   # Format code
```

---

# 🚀 Deployment

Deploy using:

* **Frontend:** Vercel
* **Backend:** Render or Railway
* **Database:** MongoDB Atlas

---

# 🔐 User Roles

### Resident

* Register & Login
* Submit Complaints
* Upload Photos
* Track Complaint History
* View Notices

### Admin

* Manage Complaints
* Assign Priorities
* Update Status
* Detect Overdue Issues
* Publish Notices
* View Dashboard & Reports

---

# 📚 Key Features

* Role-Based Authentication
* Complaint Lifecycle Management
* Complaint History Tracking
* Overdue Detection
* Priority Management
* Photo Upload Support
* Notice Board with Pinned Announcements
* Email Notifications
* Analytics Dashboard
* RESTful API
* Responsive User Interface

---

# 📄 License

This project is developed for educational and assessment purposes.

---

## ⭐ Society Desk

**Society Desk** is a modern apartment maintenance management platform that improves communication between residents and administrators through transparent complaint tracking, automated notifications, overdue monitoring, and an intuitive dashboard for efficient society management.
