import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './features/authSlice';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', background: '#333', color: 'white', display: 'flex', gap: '1rem' }}>
        <Link to="/events" style={{ color: 'white' }}>Events</Link>
        <Link to="/my-events" style={{ color: 'white' }}>My Events</Link>
        <div style={{ marginLeft: 'auto' }}>
          {user ? (
            <button onClick={() => dispatch(logout())}>Logout</button>
          ) : (
            <Link to="/login" style={{ color: 'white' }}>Login</Link>
          )}
        </div>
      </nav>
      
      <Routes>
        <Route path="/" element={<Navigate to="/events" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/my-events" element={
          <ProtectedRoute>
            <div style={{ padding: '2rem' }}><h2>My Events (Coming Next)</h2></div>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
