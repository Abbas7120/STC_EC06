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

These all UI for Director -

![Add trannie  UI ](https://github.com/user-attachments/assets/cae115a1-44fa-41bf-b4e1-e1282ad38081)

1. Add Trainee Form
- Frontend form to collect trainee details like name, email, department, and training dates.
- Uses React `useState` for form data management.
- Basic validation added for required fields.
- On form submission, data is displayed in console or stored in local state (for mock setup).
- Designed for easy integration with backend APIs (future-ready).

![Marksheet Ui](https://github.com/user-attachments/assets/258837e1-e6b2-43fb-a21f-38314804917f)

1. Marksheet Generation
- Displays trainee marks and exam results in a structured table format.
- Data fetched or managed via state/local mock array.
- Provides clean and readable layout for quick evaluation.
- Ready for backend integration to fetch real-time marks and feedback.


![Dashboard ](https://github.com/user-attachments/assets/9db078bb-1324-4fe4-9163-abdc167b39cf)

1.Dashboard Overview
- Displays key trainee metrics like total trainees, sessions, and feedback stats.
- Clean layout with cards and icon-based highlights.
- Dynamically updates based on current user role (Director/Trainer).
- Built for scalability with future charts and analytics integration.


![View trannie](https://github.com/user-attachments/assets/808179b3-596a-40b9-8d83-430f9021a9ce)

1.View Trainee Records
- Displays a list of all registered trainees with their details.
- Structured table format with scroll and responsive layout.
- Includes search or filter logic for quick access (if implemented).
- Easy to expand with Edit/Delete actions and backend data fetching.

![id card generator ](https://github.com/user-attachments/assets/4d104c9b-d2e5-4152-b10b-6dbd8120aa3e)

1. ID Card Generator
- Generates digital ID cards for each trainee with name, photo, and unique ID.
- Clean, printable layout suitable for downloading or sharing.
- Automatically fetches trainee data and formats it into card style.
- Built to extend with QR code or barcode integration in future.
- 
![update profile section](https://github.com/user-attachments/assets/77434154-1a39-4af0-ab17-362d81bef14a)

1. Update Profile Section
- Allows users to update their personal details like name, email, role, and profile image.
- Fields pre-filled using current user data from context/localStorage.
- Includes basic validation and live preview of changes.
- Future-ready for backend update integration via API.




  
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
