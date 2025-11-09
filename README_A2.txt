WEB322 Assignment 2 — Ready-to-run Notes

1) Install deps:
   npm install

2) Build Tailwind:
   npm run tw:build

3) Run locally:
   npm start
   # open http://localhost:8080

4) Deploy to Vercel:
   - Push to GitHub
   - Make sure server.js includes: app.set('views', __dirname + '/views');
   - Set build output accordingly; Vercel will run `npm install` then `npm start` (Serverless/Node).

Structure highlights:
- views/ (EJS templates) with partials/navbar.ejs
- public/css/main.css (compiled Tailwind output)
- routes implemented per A2, including sector filter and dynamic :id
- 404.ejs receives a {message} for contextual errors
