
# NexusDev Portfolio - Frontend

A high-end, professional software developer portfolio built with **React 19**, **TypeScript**, and **Tailwind CSS**. This application is designed to function as the frontend layer of a two-tier architecture, fetching all content dynamically from a Spring Boot backend.

## 🚀 Features
- **Modern UI**: Dark-themed, minimal, and fully responsive.
- **Dynamic Content**: Fetches profile, skills, and projects from REST APIs.
- **AI Assistant**: Integrated chat interface connecting to a backend AI service.
- **Type Safety**: Fully typed with TypeScript interfaces matching the backend contract.
- **Performance**: Lightweight "No-Build" compatible architecture using ES modules.

## 🛠️ Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **Backend API**: The Spring Boot backend must be running at `http://localhost:8080`.

## 📦 Dependencies
The application uses the following core libraries:
- `react` & `react-dom` (v19)
- `react-router-dom` (v7) - For client-side navigation.
- `@google/genai` - For AI integration (if used directly, otherwise handled by backend).
- `tailwindcss` - For utility-first styling.

## 📥 Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd nexusdev-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🏃 Running the Application

### 1. Start the Frontend
To start the development server with hot-reloading:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### 2. Verify Backend Connectivity
Ensure your Spring Boot application is active. The frontend expects the following endpoints:
- `GET /api/profile/summary`
- `GET /api/profile/about`
- `GET /api/skills`
- `GET /api/projects`
- `POST /api/ai/chat`
- `POST /api/contact`

## 📂 Project Structure
```text
.
├── components/          # UI Components (Navbar, Home, AIAssistant, etc.)
├── services/            # API Service layer (Fetch calls)
├── types.ts             # TypeScript Interfaces (API Models)
├── App.tsx              # Main Router and Layout
├── index.html           # Entry HTML with Tailwind CDN & Import Map
├── index.tsx            # React Root Mounting
└── package.json         # Build scripts and metadata
```

## 🔧 Configuration
The API Base URL is defined in `services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:8080/api';
```
Change this constant if your backend is hosted on a different port or domain.

## 📝 License
MIT
