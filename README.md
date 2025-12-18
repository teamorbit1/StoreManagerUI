# Store Manager Dashboard  
A clean, modern full-stack dashboard for managing products, orders, customers, and store analytics.  
Built with **React + Vite**, **Node.js**, **Express**, and **Prisma**.

This project includes:
- Complete admin UI (Products, Orders, Customers, Dashboard)
- Live charts & statistics
- Skeleton loaders on every page
- Dark mode + animations
- Fade/slide page transitions
- REST API backend with Prisma ORM
- Fully documented code structure
- Ready for local development or deployment

---

## Features

### **Frontend**
- React + Vite for fast development
- Stylish, animated dashboard UI  
- Page transitions (fade + slide)
- Skeleton loaders while fetching
- Dark/light theme switching
- Modular component structure
- Recharts for interactive graphs

### **Backend**
- Node.js + Express API
- Prisma ORM + SQLite (or PostgreSQL/MySQL)
- Seed script for demo data
- Controllers, routes, middleware
- Clean error handling

---

## Project Structure

```
StoreManagerUI/
├── client/          # React frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles.css
│   │   └── App.jsx
│   └── index.html
│
└── server/          # Node backend (Express + Prisma)
    ├── src/
    │   ├── routes/
    │   ├── controllers/
    │   ├── db/
    │   ├── utils/
    │   ├── server.js
    │   └── app.js
```

---

## Installation

### **1. Clone the repo**
```bash
git clone https://github.com/teamorbit1/StoreManagerUI.git
cd StoreManagerUI
```

---

## Backend Setup (server)

### **2. Install backend dependencies**
```bash
cd server
npm install
```

### **3. Create your environment file**
Create a new file:  
`server/.env`

Paste:

```env
DATABASE_URL="file:./dev.db"
PORT=5000
```

(Use PostgreSQL/MySQL if deploying)

### **4. Run Prisma migrations**
```bash
npx prisma migrate dev --name init
```

### **5. Seed the database**
```bash
node src/db/seed.js
```

### **6. Start the backend**
```bash
npm start
```

API will run at:  
**http://localhost:5000**

---

## Frontend Setup (client)

### **1. Install frontend dependencies**
```bash
cd ../client
npm install
```

### **2. Start the frontend**
```bash
npm run dev
```

Frontend will run at:  
**http://localhost:5173**

---
<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/79fa7987-5655-4cd5-93d7-bd0b1d55f9d3" />

<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/7b716dbb-2471-4349-8faa-a6e1e6561ce0" />


[Demo Video](https://www.youtube.com/watch?v=2MPSlmn7Yus)


## Tech Stack

**Frontend:**  
- React  
- Vite  
- Recharts  
- React Router  
- CSS (custom animated UI)  

**Backend:**  
- Node.js  
- Express  
- Prisma  
- SQLite / PostgreSQL  
- Seeded mock data  




