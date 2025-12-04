# Deployment Troubleshooting Guide

## Error: "Exited with status 254 while building your code"

This error typically occurs during the build process. Here are solutions based on which platform you're deploying to:

---

## 🔧 Backend Deployment on Render

### Issue
Render is trying to build the backend when it should only install dependencies.

### Solution

1. **In Render Dashboard:**
   - Go to your backend service
   - Click **"Settings"**
   - Find **"Build Command"**
   - Change to: `npm install`
   - **Start Command:** `node server.js`
   - Click **"Save Changes"**

2. **Ensure package.json has start script:**
   ```json
   {
     "scripts": {
       "start": "node server.js"
     }
   }
   ```
   ✅ Already correct in your backend/package.json

3. **Redeploy:**
   - Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## 🔧 Frontend Deployment on Vercel

### Issue
Build process failing during Vite build.

### Solution 1: Check Vercel Settings

1. **In Vercel Dashboard:**
   - Go to your project
   - Click **"Settings"** → **"General"**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

2. **Save and redeploy**

### Solution 2: Add vercel.json

Create `frontend/vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Solution 3: Check Node Version

Create `frontend/.nvmrc`:
```
18
```

Or add to `frontend/package.json`:
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## 🔧 Common Issues for Both Platforms

### 1. Missing Dependencies

**Check if all dependencies are in package.json:**
```bash
# In frontend or backend directory
npm install
```

If any packages are missing, add them:
```bash
npm install <package-name> --save
```

### 2. Environment Variables Not Set

**Render (Backend):**
- Ensure `MONGO_URI` and `JWT_SECRET` are set in Environment Variables

**Vercel (Frontend):**
- Ensure `VITE_API_URL` is set in Environment Variables

### 3. Build Logs

**View detailed logs:**
- **Render:** Click on the failed deployment → View logs
- **Vercel:** Click on the deployment → View build logs

Look for specific error messages like:
- `Module not found`
- `Cannot find package`
- `Syntax error`

---

## 🎯 Quick Fix Checklist

### For Backend on Render:
- [ ] Build Command: `npm install`
- [ ] Start Command: `node server.js`
- [ ] Environment variables set (MONGO_URI, JWT_SECRET)
- [ ] Root Directory: `backend`

### For Frontend on Vercel:
- [ ] Framework: Vite
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Root Directory: `frontend`
- [ ] Environment variable: `VITE_API_URL`

---

## 📝 Step-by-Step: Redeploy Backend on Render

1. Go to [render.com/dashboard](https://dashboard.render.com)
2. Click on your backend service
3. Click **"Settings"**
4. Update:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Scroll down and click **"Save Changes"**
6. Go to **"Events"** tab
7. Click **"Manual Deploy"** → **"Deploy latest commit"**
8. Wait 2-3 minutes
9. Check logs for "Server started on port 5000" and "MongoDB Connected"

---

## 📝 Step-by-Step: Redeploy Frontend on Vercel

### Option 1: Via Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Click **"Settings"**
4. **General:**
   - Framework Preset: Vite
   - Root Directory: `frontend`
5. **Build & Development Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click **"Deployments"**
7. Click **"..."** on latest deployment → **"Redeploy"**

### Option 2: Via CLI
```bash
cd frontend
vercel --prod
```

---

## 🆘 Still Having Issues?

### Get Detailed Error Information

1. **Copy the full error log** from Render/Vercel
2. Look for lines starting with:
   - `ERROR`
   - `Failed`
   - `Cannot find`
   - `Module not found`

3. **Common error patterns:**

**"Cannot find module 'xyz'"**
```bash
npm install xyz --save
git add package.json package-lock.json
git commit -m "Add missing dependency"
git push
```

**"Build failed"**
- Check if `npm run build` works locally:
```bash
cd frontend
npm run build
```

**"Port already in use"**
- This shouldn't happen on Render/Vercel
- If it does, check Start Command

---

## ✅ Verification After Fix

1. **Backend (Render):**
   - Visit: `https://your-backend.onrender.com/api/browse/categories`
   - Should return JSON

2. **Frontend (Vercel):**
   - Visit: `https://your-app.vercel.app`
   - Should load the app

3. **Full Integration:**
   - Login on frontend
   - Check browser Network tab
   - Verify API calls go to Render backend
   - Verify responses come back

---

## 💡 Pro Tips

1. **Test locally first:**
   ```bash
   # Frontend
   cd frontend
   npm run build
   npm run preview
   
   # Backend
   cd backend
   npm install
   node server.js
   ```

2. **Check logs immediately after deployment**
3. **Use environment variables, never hardcode URLs**
4. **Commit and push before deploying**

---

Need more help? Share the specific error message from the deployment logs!
