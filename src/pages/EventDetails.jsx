import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerEvent } from '../features/eventsSlice';

export default function EventDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { event } = location.state || {};

  if (!event) return <p>Event not found.</p>;

  const handleRegister = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(registerEvent(event));
    alert('Successfully registered!');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>Back</button>
      <img 
        src={event.images?.[0]?.url} 
        alt={event.name} 
        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }} 
      />
      <h1>{event.name}</h1>
      <p><strong>Date:</strong> {event.dates?.start?.localDate} at {event.dates?.start?.localTime}</p>
      <p><strong>Venue:</strong> {event._embedded?.venues?.[0]?.name}</p>
      <p><strong>Location:</strong> {event._embedded?.venues?.[0]?.city?.name}, {event._embedded?.venues?.[0]?.country?.name}</p>
      <p><strong>Category:</strong> {event.classifications?.[0]?.segment?.name}</p>
      <button onClick={handleRegister} style={{ padding: '1rem 2rem', background: 'green', color: 'white', border: 'none', borderRadius: '4px', marginTop: '1rem', cursor: 'pointer' }}>
        Register for this Event
      </button>
    </div>
  );
}