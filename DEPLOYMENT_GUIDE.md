# InternTrack Deployment Guide
## Vercel (Frontend) + Render (Backend) + MongoDB Atlas (Database)

---

## 🎯 Deployment Architecture

- **Frontend:** Vercel (React app)
- **Backend:** Render (Node.js API)
- **Database:** MongoDB Atlas (Already configured ✅)

---

## 📋 Pre-Deployment Checklist

### 1. Update Frontend API URL Configuration

Create `frontend/.env.production`:
```env
VITE_API_URL=https://your-backend-name.onrender.com
```

### 2. Update All API Calls to Use Environment Variable

You need to update the API base URL in your context files:

**Files to update:**
- `frontend/src/context/AuthContext.jsx`
- `frontend/src/context/InternshipContext.jsx`
- `frontend/src/context/TaskContext.jsx`
- `frontend/src/pages/BrowseInternships.jsx`

**Change from:**
```javascript
axios.get('http://localhost:5000/api/...')
```

**To:**
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
axios.get(`${API_URL}/api/...`)
```

### 3. Update Backend CORS

Edit `backend/server.js` to allow your Vercel frontend:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-app-name.vercel.app'  // Add after Vercel deployment
  ],
  credentials: true
}));
```

---

## 🚀 Step-by-Step Deployment

### STEP 1: Push to GitHub

```bash
cd /Users/himanipinjani/Desktop/InternTrack

# Initialize git (if not already done)
git init
git add .
git commit -m "Ready for deployment"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/InternTrack.git
git branch -M main
git push -u origin main
```

---

### STEP 2: Deploy Backend on Render

#### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

#### 2.2 Deploy Backend
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name:** `interntrack-backend` (or your choice)
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** `Free`

#### 2.3 Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**:

```
MONGO_URI = mongodb+srv://interntrack_user:RFp1OJlCfYEpaTTT@cluster0.lrwuptp.mongodb.net/interntrack?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET = anythingSecret123
```

#### 2.4 Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. **Copy your backend URL:** `https://interntrack-backend.onrender.com`

#### 2.5 Verify Backend
Visit: `https://interntrack-backend.onrender.com/api/browse/categories`
- Should return JSON with categories

---

### STEP 3: Update Frontend for Production

#### 3.1 Create Production Environment File
```bash
cd frontend
```

Create `.env.production`:
```env
VITE_API_URL=https://interntrack-backend.onrender.com
```

#### 3.2 Update API Base URL in Code

**Option A: Quick Fix (Recommended)**
Create `frontend/src/config.js`:
```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

Then update each context file to import and use it:
```javascript
import { API_URL } from '../config';

// Use it in API calls
axios.get(`${API_URL}/api/internships`)
```

**Option B: I can do this for you** - Let me know and I'll update all files automatically.

#### 3.3 Commit Changes
```bash
git add .
git commit -m "Configure for production deployment"
git push
```

---

### STEP 4: Deploy Frontend on Vercel

#### 4.1 Install Vercel CLI
```bash
npm install -g vercel
```

#### 4.2 Deploy Frontend
```bash
cd frontend
vercel
```

Follow the prompts:
- **Set up and deploy?** `Y`
- **Which scope?** Select your account
- **Link to existing project?** `N`
- **Project name?** `interntrack` (or your choice)
- **Directory?** `./` (current directory)
- **Override settings?** `N`

#### 4.3 Add Environment Variable in Vercel
After deployment:
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://interntrack-backend.onrender.com`
   - **Environment:** Production
5. Click **Save**

#### 4.4 Redeploy
```bash
vercel --prod
```

#### 4.5 Get Your Frontend URL
Vercel will give you a URL like:
```
https://interntrack.vercel.app
```

---

### STEP 5: Update Backend CORS

#### 5.1 Add Vercel URL to CORS
Edit `backend/server.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://interntrack.vercel.app'  // Your Vercel URL
  ],
  credentials: true
}));
```

#### 5.2 Push and Redeploy
```bash
git add .
git commit -m "Add Vercel URL to CORS"
git push
```

Render will auto-redeploy (takes ~2 minutes)

---

### STEP 6: Update MongoDB Atlas

#### 6.1 Whitelist Render IPs
1. Go to MongoDB Atlas
2. **Network Access** → **Add IP Address**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **Confirm**

---

### STEP 7: Update README with Live URLs

Edit `README.md`:
```markdown
**🚀 Hosted Application:** [https://interntrack.vercel.app](https://interntrack.vercel.app)
```

Commit and push:
```bash
git add README.md
git commit -m "Add hosted URL to README"
git push
```

---

## ✅ Verification Checklist

Test your deployed app:

1. **Frontend:** Visit `https://interntrack.vercel.app`
   - ✅ Page loads
   - ✅ No console errors

2. **Backend:** Visit `https://interntrack-backend.onrender.com/api/browse/categories`
   - ✅ Returns JSON data

3. **Full Flow:**
   - ✅ Signup works
   - ✅ Login works
   - ✅ Dashboard loads
   - ✅ Browse internships works
   - ✅ Add internship works
   - ✅ Edit internship works
   - ✅ Delete internship works

4. **Database:** Check MongoDB Atlas
   - ✅ New entries appear
   - ✅ Updates reflect
   - ✅ Deletes remove entries

---

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_URL` in Vercel environment variables
- Verify backend URL is correct
- Check browser console for CORS errors

### CORS errors
- Ensure Vercel URL is in backend CORS whitelist
- Redeploy backend after CORS changes

### Backend won't start on Render
- Check environment variables are set
- View logs in Render dashboard
- Verify MongoDB connection string

### MongoDB connection fails
- Ensure IP `0.0.0.0/0` is whitelisted
- Check connection string is correct
- Verify password has no special characters that need encoding

---

## 📊 Your Deployment URLs

After deployment, you'll have:

- **Frontend:** `https://interntrack.vercel.app`
- **Backend:** `https://interntrack-backend.onrender.com`
- **Database:** MongoDB Atlas (already configured)

---

## 💰 Cost

Everything is **FREE**:
- ✅ Vercel: Unlimited deployments
- ✅ Render: 750 hours/month free
- ✅ MongoDB Atlas: 512MB free forever

---

## 🎓 For Submission

Share these with your professor:
- **Live App:** `https://interntrack.vercel.app`
- **GitHub:** `https://github.com/YOUR_USERNAME/InternTrack`
- **API Endpoint:** `https://interntrack-backend.onrender.com`

**Total deployment time: ~20 minutes** ⏱️
