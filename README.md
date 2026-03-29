Trello-like Board (React + JSON Server)
Trello app built  with React, Redux, react-beautiful-dnd, and a mock API using json-server. Create boards, columns, and cards; drag-and-drop cards; simple auth; light/dark theme.

Quick Start
1) Backend (mock API):

```bash
cd myapp
npm install
npm run server   # http://localhost:3001
```

2) Frontend (React dev server):

```bash
npm start        # http://localhost:3000
```

Scripts (in myapp)
- npm start: start React (port 3000)
- npm run server: start json-server (port 3001) using db.json
- npm run build: production build

Tech
- React 18, Redux + Thunk, React Router v6
- react-beautiful-dnd (drag-and-drop), Axios

Structure (high-level)
- myapp/
  - db.json (mock users, boards)
  - src/pages (Login, Signup, Home, BoardDetails)
  - src/components (BoardList, ColumnList, Column, Card, etc.)
  - src/context (AuthContext, ThemeContext)
  - src/redux (actions, reducers, store)
  - src/services/api.js (Axios + endpoints)

Notes
- Keep both servers running while developing.
- Demo credentials in db.json or sign up via UI.
- For learning only; passwords are plain text in db.json.
