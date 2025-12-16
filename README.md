# CodeHive — Real-Time Collaborative Code Editor

CodeHive is a web-based code editor that allows multiple users to write, edit, and run code together in real time.

## Features
- One-click code execution
- Multi-language support: Java, C++, Python, JavaScript
- AI-powered error analysis and suggestions
- Real-time collaborative editing with 2+ users
- Google OAuth authentication

## Tech Stack

### Frontend
- React.js
- ShadCN UI
- Monaco Editor (VS Code–like editing experience)

### Backend
- Node.js
- Express.js
- Socket.IO (real-time client communication)
- Piston API (code execution engine)
- Perplexity API (AI error analysis — valid till Aug 2026)

### Database
- MongoDB

### Real-Time Collaboration
- Yjs (CRDT-based collaboration engine)
- y-websocket (Yjs provider)

### Authentication
- Firebase Google OAuth
