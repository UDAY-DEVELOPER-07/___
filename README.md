# React User Management App - Reqres API Integration

This is a React application that integrates with the [Reqres API](https://reqres.in/) to perform basic user management functionalities such as login, view users, edit user details, and delete users.

---

## ✨ Features

- ✅ User Authentication (Login)
- ✅ View paginated list of users
- ✅ Edit user details (First Name, Last Name, Email)
- ✅ Delete users from the list
- ✅ Responsive UI using Tailwind CSS
- ✅ API error handling and form validation
- ✅ Token-based protected routes
- ✅ Token persistence with Local Storage

---

## 🛠️ Installation and Running the Project

1. **Clone the repository**

```bash
git https://github.com/UDAY-DEVELOPER-07/___.git
```
2️⃣ Install Dependencies
```bash
npm install
```
3️⃣ Run the Application
```bash
npm run dev
```
4️⃣ Access the App
```bash
http://localhost:5173
```
---

## 🔗 Reqres API Endpoints Used

| Functionality | Method | Endpoint |
|---------------|--------|----------|
| Login | POST | `/api/login` |
| Get Users | GET | `/api/users?page=1` |
| Update User | PUT | `/api/users/{id}` |
| Delete User | DELETE | `/api/users/{id}` |


---
## 🔐 Login Credentials (provided by Reqres API)
Use the following credentials to log in:
```
Email    : eve.holt@reqres.in
Password : cityslicka
```

## 💡 **Project Structure**
```bash
src/
├── assets/         
│   └── bg.jpg
├── components/
│   ├── Login/
│   │   └── page.jsx
│   └── UserList/
│       └── page.jsx      
├── App.jsx 
├── index.css 
├── main.jsx
   
```
---
## 📝 **Assumptions**

- The token returned on login is stored in Local Storage.

- Protected pages will automatically redirect to login if token is missing.

- Reqres API is a mock API, so:

    - Edit & Delete operations only simulate success (no real database changes).

- Basic validation is applied on forms (login and edit).

- API errors are displayed to users appropriately.
---
## 🧩 Tech Stack Used
- React

- React Router

- Axios

- Tailwind CSS
---
## ✅ Recommended Node & NPM versions

- Node.js >= 18.x.x

- npm >= 9.x.x