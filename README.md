# React + Vite


![image](https://github.com/user-attachments/assets/b87f2bff-3ec3-40b5-8513-59719818515f)

1. Login System
Frontend-only Login.jsx form with email + password fields.

Password visibility toggle using lucide-react icons.

Demo Credentials are hardcoded for Director and Trainers.

Authentication logic resides in AuthContext.jsx.

2. AuthContext
Mock login logic using hardcoded demoUsers.

login(email, password): Matches hardcoded users.

logout(): Clears user and localStorage.

updateUser(updates): Updates local user and mock array.

Future-proofed with commented code ready for backend (Express + SQLite).

3. User Session Management
AuthContext auto-loads saved user from localStorage.

Handles page refresh and maintains login session.

(Clear instructions added for switching to backend.)

4. Role-based Dashboard
Director and Trainer see different menus and sections.

Rendered dynamically based on user.role.

Components organized under:

components/Director/

components/Trainer/

components/Common/

5. Layout System
Sidebar, Header, and Main layout working as shell.

Section switching via useState(activeSection).

UI updates based on current route/section.


These all are for trainer-

![Dashboard UI](https://github.com/user-attachments/assets/e1caef91-2da9-4b49-9fde-4ad5951c0604)

##  Dashboard UI

A modern and responsive admin dashboard built -

- Sidebar navigation with icons
- Topbar with profile and page title
- Dashboard cards for key stats
- Clean layout for roles like Director and Trainer
- Icons via `lucide-react`

![View  Trainees](https://github.com/user-attachments/assets/bd764127-bfeb-4492-b57b-5d987473c648)

##  View Trainees

A dynamic and scrollable table view to display all trainee details.
- Lists trainee name, batch, course, progress, and status
- Search and filter-friendly layout
- Responsive design for various screen sizes
- Clean UI for easy data management by Director/Trainer

![Profile Update](https://github.com/user-attachments/assets/500b1f0b-9b74-4f36-9325-143a81510e79)

##  Profile Update

A user-friendly form interface for updating profile details.

- Editable fields: name, email, phone, and profile image
- Pre-filled user data from context/state
- Clean layout with responsive design
- Built with **React**, **Tailwind CSS**, and `lucide-react` icons


This template provi
des a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
