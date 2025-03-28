import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/page.jsx'
import UsersList from './components/UserList/page.jsx'
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/users" element={<UsersList />} />
            </Routes>
        </Router>
    );
}

export default App;
