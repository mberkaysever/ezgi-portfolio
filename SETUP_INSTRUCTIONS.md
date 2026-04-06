# Portfolio Website - Setup Instructions

## 📦 Project Overview
This is a minimalist portfolio website replicating the bazil.fr layout and design aesthetic.

## 🛠️ Technology Stack
- **Frontend**: React 19, Tailwind CSS, shadcn/ui components
- **Backend**: FastAPI, Python
- **Database**: MongoDB
- **Font**: Inter (Google Fonts)

## 📁 Project Structure
```
/app
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── PortfolioSection.jsx
│   │   │   ├── ServicesSection.jsx
│   │   │   └── ContactSection.jsx
│   │   ├── App.js
│   │   └── index.css
│   ├── package.json
│   └── .env
└── backend/          # FastAPI application
    ├── server.py
    ├── requirements.txt
    └── .env
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- MongoDB
- Yarn package manager

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
yarn install
```

3. Update the `.env` file with your backend URL:
```
REACT_APP_BACKEND_URL=http://localhost:8001
WDS_SOCKET_PORT=3000
ENABLE_HEALTH_CHECK=false
```

4. Start the development server:
```bash
yarn start
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Update the `.env` file with your MongoDB connection:
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio_db
```

5. Start the FastAPI server:
```bash
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

The backend API will be available at `http://localhost:8001`

## 🎨 Features

### Hero Section
- Fullscreen layout with overlapping typography
- Large bold "Webdesigner" text
- Outlined "& Photographer" text behind
- Portrait image integrated with typography
- Brand logos and CTA buttons

### Portfolio Section
- Two-column grid layout
- Grayscale images with color-on-hover effects
- Project cards with titles, categories, and years

### Services Section
- Black background with white text
- Four service offerings with icons
- Hover effects and animations

### Contact Section
- Large call-to-action headline
- Contact button and social media links
- Footer with legal links

## 🎨 Design Features
- **Black & white minimalist aesthetic** with pink accent
- **Large typography** for dramatic impact
- **Overlapping layers** for visual depth
- **Generous whitespace** throughout
- **Inter font** for modern look
- **Smooth transitions** and hover effects
- **lucide-react icons**

## 📝 Customization

### Updating Content
1. **Hero Section**: Edit `/frontend/src/components/HeroSection.jsx`
   - Update name, location, and brand logos
   - Replace portrait image URL

2. **Portfolio Projects**: Edit `/frontend/src/components/PortfolioSection.jsx`
   - Update project titles, categories, images

3. **Services**: Edit `/frontend/src/components/ServicesSection.jsx`
   - Modify service offerings and descriptions

4. **Contact Info**: Edit `/frontend/src/components/ContactSection.jsx`
   - Update social media links and contact details

### Styling
- Global styles: `/frontend/src/index.css`
- Component styles: Inline Tailwind classes
- Custom CSS: `/frontend/src/App.css`

## 🌐 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
yarn build
# Deploy the 'build' folder
```

### Backend (Railway/Heroku/AWS)
```bash
cd backend
# Set environment variables
# Deploy using your preferred platform
```

## 📄 License
This project is provided as-is for educational purposes.

## 🙏 Credits
- Design inspiration: bazil.fr
- UI Components: shadcn/ui
- Icons: lucide-react
- Images: Unsplash

## 💡 Notes
- All content is currently **MOCKED** for demonstration
- Replace placeholder images with your own
- Update brand logos with actual client logos
- Customize colors via Tailwind config
- The backend is basic - extend as needed for your use case

## 🐛 Troubleshooting

**Frontend not loading?**
- Check if Node.js and Yarn are installed
- Run `yarn install` again
- Clear browser cache

**Backend connection issues?**
- Verify MongoDB is running
- Check MONGO_URL in backend/.env
- Ensure port 8001 is not in use

**Styling issues?**
- Run `yarn add -D tailwindcss postcss autoprefixer`
- Check Tailwind config in tailwind.config.js

---

Enjoy your new portfolio website! 🎉
