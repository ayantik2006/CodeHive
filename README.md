# CodeHive — Real-Time Collaborative Code Editor

CodeHive is a web-based code editor that allows multiple users to write, edit, and run code together in real time.

## Index
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)

## Features
- One-click code execution
- Multi-language support: Java, C++, Python, JavaScript
- AI-powered error analysis and suggestions
- Real-time collaborative editing with 2+ users
- Google OAuth authentication

## Tech Stack

### Frontend
- React.js
- ShadCN
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

## Screenshots
- ### Dashboard <img width="1919" height="901" alt="image" src="https://github.com/user-attachments/assets/a3a8be05-1811-4476-a073-dbac1fd228ff" />
- ### Code Editor <img width="1918" height="908" alt="image" src="https://github.com/user-attachments/assets/a3a53218-7fd5-4b0d-9e75-a295e36adb1f" />
- ### Code Execution Output <img width="1917" height="900" alt="image" src="https://github.com/user-attachments/assets/facaecdb-431b-4686-9062-f8fe3b2e607b" />
- ### AI Error Analysis <img width="1916" height="901" alt="image" src="https://github.com/user-attachments/assets/4c8b3942-0713-4cf1-b88e-aa7ad8cc0c7b" />





