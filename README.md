# InternTrack 🎯

> A full-stack internship tracking application to help students manage their internship applications, deadlines, and interviews.

## 🌐 Live Demo

**🚀 Hosted Application:** [https://interntrack-kj8nj64dj-himani23-creators-projects.vercel.app](https://interntrack-kj8nj64dj-himani23-creators-projects.vercel.app)

**📚 API Documentation:** [View API Docs](./API_DOCUMENTATION.md)

---

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based signup/login
- 📊 **Interactive Dashboard** - View stats, upcoming deadlines, and interviews
- 🔍 **Browse Internships** - Search and explore 42+ opportunities across 8 categories
- ✏️ **Full CRUD Operations** - Create, Read, Update, Delete internships and tasks
- 📅 **Date Management** - Track application deadlines and interview dates
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations
- 🔄 **Backend Filtering** - Pagination, sorting, and filtering through API
- 📱 **Responsive Design** - Works seamlessly on all devices

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router
- Axios
- Vite

**Backend:**
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs

## 📸 Screenshots

<!-- Add screenshots here after deployment -->

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB Atlas account (free)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/InternTrack.git
   cd InternTrack
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Run the Application**
   
   Terminal 1 - Backend:
   ```bash
   cd backend
   node server.js
   ```
   
   Terminal 2 - Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the App**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📖 API Endpoints

### Internships (with Pagination, Sorting, Filtering)
```bash
GET    /api/internships?page=1&limit=10&sortBy=createdAt&order=desc&status=Applied&search=keyword
POST   /api/internships
PUT    /api/internships/:id
DELETE /api/internships/:id
```

### Browse
```bash
GET /api/browse/categories
GET /api/browse/search?q=keyword
GET /api/browse/category/:category
```

### Tasks
```bash
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

### Authentication
```bash
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
```

**📚 Full API Documentation:** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 🎯 Key Features for Grading

✅ **CRUD Operations:**
- 2+ Create operations (Internships, Tasks)
- 4+ Read operations (Internships, Tasks, Browse Categories, Browse Search)
- 2+ Update operations (Internships, Tasks)
- 2+ Delete operations (Internships, Tasks)

✅ **Backend-Driven:**
- All pagination through API (`?page=1&limit=10`)
- All sorting through API (`?sortBy=company&order=asc`)
- All filtering through API (`?status=Applied&search=keyword`)

✅ **Database Persistence:**
- All operations persist to MongoDB Atlas
- Real-time updates visible in database

## 📁 Project Structure

```
InternTrack/
├── backend/
│   ├── config/         # Database configuration
│   ├── middleware/     # Auth middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── context/    # Context providers
│   │   ├── pages/      # Page components
│   │   └── App.jsx     # Main app component
│   └── index.html
├── DEPLOYMENT_GUIDE.md # Deployment instructions
└── README.md
```

## 🚀 Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions on:
- Render (Recommended)
- Vercel
- Railway

**After deployment, update the live demo link at the top of this README!**

## 📝 License

MIT

## 👨‍💻 Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- Email: your.email@example.com

---

⭐ **Star this repo if you found it helpful!**
