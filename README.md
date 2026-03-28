# iamSK – Portfolio (V3)

A dynamic, full-stack portfolio built with **React + Vite**, powered by **Firebase Firestore** for data and **Firebase Auth** for the admin panel. Images are hosted on **Cloudinary**.

## 🚀 Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Tailwind CSS v4, Framer Motion |
| Backend / DB | Firebase Firestore |
| Auth | Firebase Authentication |
| Images | Cloudinary (unsigned upload) |
| Email | EmailJS |
| Routing | React Router DOM v7 |
| Build | Vite 7 |

## 📦 Setup

```bash
git clone https://github.com/SkAltmash/iamSK
cd iamSK
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_EMAILJS_SERVICE=""
VITE_EMAILJS_TEMPLATE=""
VITE_EMAILJS_PUBLIC_KEY=""
VITE_CLOUDINARY_CLOUD_NAME=""
VITE_CLOUDINARY_UPLOAD_PRESET=""
```

> ⚠️ Never commit `.env` to git. It is already in `.gitignore`.

## 🖥️ Development

```bash
npm run dev      # Start dev server at localhost:5173
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔐 Admin Panel

Visit `/admin/login` to access the admin panel. You must be registered in **Firebase Console → Authentication → Users**.

From the admin panel you can:
- **Add / Edit / Delete** Client Projects (with Cloudinary image upload)
- **Add / Edit / Delete** Personal Projects
- **Add / Edit / Delete** Achievements / Certificates
- **Add / Edit / Delete** Tech Stack entries

## 🏗️ Project Structure

```
src/
├── components/
│   ├── about/          # About page components
│   ├── admin/          # ProtectedRoute
│   ├── hero/           # Hero section components
│   ├── projects/       # ClientProjects, PersonalProjects, Certificates, TechStack
│   └── ui/             # Shared UI (SkeletonCard)
├── contexts/           # AuthContext
├── pages/
│   └── admin/          # AdminLoginPage, AdminDashboard, all CRUD pages
├── utils/              # uploadToCloudinary.js
├── firebase.js         # Firebase app, db, auth exports
├── App.jsx             # Routes (public + admin)
└── main.jsx
```

## 🌐 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Enable **Firestore Database** (start in test mode, then update rules)
3. Enable **Authentication → Email/Password**
4. Add at least one user under **Authentication → Users**

### Firestore Rules (recommended)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## ☁️ Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Create an **Upload Preset** set to *Unsigned*
3. Set `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET` in `.env`

## 🚀 Deployment (Vercel)

1. Connect your GitHub repo to Vercel
2. Add all `VITE_*` environment variables in **Project Settings → Environment Variables**
3. Vercel auto-detects Vite — no build config needed

The `vercel.json` already includes SPA rewrites so all routes resolve correctly.
