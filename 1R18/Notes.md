📘 Notes.md
Fixing Node / Vite / Nodemon Setup Issues & Best Practices for MERN Projects

This document explains the exact problem faced when running a MERN project on Windows, why it happened, how it was fixed, and what to keep in mind when setting up Node.js projects on a new machine.

✅ 1. What Problem Occurred?
Error examples:
Cannot find module 'D:\Desktop\vite\bin\vite.js'
code: MODULE_NOT_FOUND

Cannot find module 'D:\Desktop\nodemon\bin\nodemon.js'

'node_modules\.bin\' is not recognized as an internal or external command

These errors prevented both frontend (Vite) and backend (Nodemon) from running.

❗ 2. Root Causes
Cause A — Broken Global Install of Vite / Nodemon

Vite and Nodemon were installed globally earlier in a directory like:

D:\Desktop\vite
D:\Desktop\nodemon

That folder was deleted later.

But the PATH still pointed to it, so npm kept trying to run:

D:\Desktop\vite\bin\vite.js
D:\Desktop\nodemon\bin\nodemon.js

Since the path didn’t exist → MODULE_NOT_FOUND.

Cause B — Folder Name Contained & (PowerShell reserved operator)

Original project folder:

D:\Desktop\Revision&Development\

& is a special operator in PowerShell.

It breaks npm script execution.

PowerShell was splitting the folder into "Revision" and "Development" causing errors like:

node_modules\.bin\ not recognized

This will break ANY Node.js project located in a folder with &.

🛠️ 3. How the Problems Were Fixed
Fix 1 — Remove Broken Global Install
npm uninstall -g vite nodemon
where vite
where nodemon

Then removed any lingering PATH entries pointing to D:\Desktop\vite or D:\Desktop\nodemon.

Fix 2 — Renamed Project Folder

Changed:

Revision&Development

to:

Revision and Development

After removing &, PowerShell stopped breaking npm commands.

Fix 3 — Reinstalled Local Dependencies (Correct Way)
Frontend
cd frontend
rd /s /q node_modules
del package-lock.json
npm cache clean --force
npm install
npm run dev

Backend
cd backend
rd /s /q node_modules
del package-lock.json
npm cache clean --force
npm install
npm run dev

Both frontend (Vite) and backend (Nodemon) started working perfectly.

🚀 4. Important Lessons for Future Node/MERN Setups
✔ A. Avoid Special Characters in Folder Names

NEVER use:

&

#

%

@

!

spaces at the beginning

parentheses ()

Safe folder examples:

D:\Projects\inventory-app
D:\Code\mern-app

✔ B. Prefer Local Dev Tools Instead of Global

These should be installed locally inside the project:

Vite

Nodemon

ESLint

Tailwind

Webpack / Babel

Local tools run with:

npm run dev
npm run build

This avoids version conflicts and broken global paths.

✔ C. Node.js Must Be Installed Globally (Once Per Machine)

Only Node.js itself should always be global.

Check versions:

node -v
npm -v

✔ D. After Cloning a MERN Project, Always Run:
Backend:
cd backend
npm install
npm run dev

Frontend:
cd frontend
npm install
npm run dev

✔ E. Common Future Issues & Fixes
Issue Cause Fix
Cannot find module Missing node_modules npm install
Vite/Nodemon not recognized Global install broken reinstall or use local devDeps
CORS errors Frontend calling backend Enable CORS properly
Port already in use Old process running Kill process or change port
PATH conflicts Wrong global PATH entries Clean user/system PATH
🎯 5. Final Summary

The project failed due to:

Broken global installs (Vite/Nodemon)

Invalid folder name containing &

It was fixed by:

Cleaning PATH

Uninstalling bad globals

Renaming folder

Reinstalling dependencies properly

Now the MERN project runs perfectly on D: and will work on any new machine if these rules are followed.
