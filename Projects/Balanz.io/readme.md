# Balanz.io

Balanz.io is more than just a task manager—it's a smart task management system designed to help you maintain a work-life balance. The app focuses on tracking, managing, and completing tasks in a minimalistic and engaging way.

## 🌐 Live Demo: https://balanz-io-01.onrender.com/
The backend is hosted on Render for free, so the app might load slower than expected at times.

## ✨ Features
- **Task Management**: Create, edit, and delete tasks.
- **Smart UI/UX**: Minimalistic and clean design.
- **Categories & Priority**: Organize tasks by category and set their priority.
- **Drag & Drop Functionality**: Easily move tasks around.
- **Cross-platform Syncing**: Sync your tasks across devices.
- **API for Developers**: Soon, I’ll provide API access for developers to use my backend in their projects.
- **Authentication**: Secure user login and sign-up functionality with token-based authentication.
  
## 🛠 Tech Stack
- **Frontend**: HTML, CSS, JavaScript, Axios
- **Backend**: Node.js, Express
- **Hosting**: Render (Backend), GitHub Pages (Frontend)
- **APIs**: Custom API for task management
- **Other**: State management
  
## 🚧 Problems I Solved
- **Frontend Authentication**: Removed backend authorization on the `/todos` page and implemented frontend-based redirection.
- **Optimistic UI**: Rendering frontend changes immediately while syncing with the backend.
- **Syncing Issues**: A sync bar informs users when there’s a mismatch between frontend and backend data.
- **CORS Configuration**: Added CORS settings to enable API access from specific domains.
- **Password Strength Check**: Improved security with a password checks.

## 💡 Learnings
- **Full-stack Development**: Gained hands-on experience integrating backend and frontend, handling CRUD operations, and syncing tasks between them.
- **State Management**: Learned how to optimize task rendering on the frontend while syncing with backend updates.
- **Security & Authentication**: Implemented token-based authentication for secure user sessions.

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rajveeerr/Balanz.io.git
   cd balanzio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the server (backend hosted on Render):**
   ```bash
   npm start
   ```

4. **Run the frontend:**
   Open `index.html` in your browser.

5. **Environment Variables:**
   Make sure to configure `.env` with the required variables for authentication, database, and API setup.

## 🔑 API for Developers (Coming Soon)
I will provide an API for developers who want to use my backend for their own task management projects. Developers will get their own keys to interact with the API, allowing them to create and manage todos seamlessly.

## 📈 Workflow
Whenever you add a task, the state is updated and rendered on the frontend, followed by a POST request to the server. A sync bar ensures that data is consistent across frontend and backend. If there's an error syncing, the user is notified, and the backend's data is displayed instead.

## 📝 Known Issues
- Some features are still under development (dark mode, tab functionality, etc.).
- Since the backend is hosted on Render for free, it may respond slowly at times.
