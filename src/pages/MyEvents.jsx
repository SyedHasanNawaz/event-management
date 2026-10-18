import { useSelector, useDispatch } from 'react-redux';
import { cancelRegistration } from '../features/eventsSlice';
import { Link } from 'react-router-dom';

export default function MyEvents() {
  const registered = useSelector((state) => state.events.registered);
  const dispatch = useDispatch();

  const now = new Date().getTime();

  const upcoming = registered.filter((e) => {
    const eventDate = new Date(e.dates?.start?.dateTime || e.dates?.start?.localDate).getTime();
    return eventDate >= now;
  });

  const completed = registered.filter((e) => {
    const eventDate = new Date(e.dates?.start?.dateTime || e.dates?.start?.localDate).getTime();
    return eventDate < now;
  });

  const EventCard = ({ event, isPast }) => (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>{event.name}</h3>
        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
          {event.dates?.start?.localDate} | {event._embedded?.venues?.[0]?.name}
        </p>
      </div>
      {!isPast && (
        <button 
          onClick={() => dispatch(cancelRegistration(event.id))}
          style={{ background: 'red', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
        >
          Cancel
        </button>
      )}
    </div>
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>My Events</h2>
      
      {registered.length === 0 ? (
        <p>You haven't registered for any events yet. <Link to="/events">Explore events</Link></p>
      ) : (
        <>
          <h3 style={{ marginTop: '2rem', borderBottom: '2px solid #333', paddingBottom: '0.5rem' }}>Upcoming Events</h3>
          {upcoming.length === 0 ? <p>No upcoming events.</p> : upcoming.map(e => <EventCard key={e.id} event={e} isPast={false} />)}

          <h3 style={{ marginTop: '3rem', borderBottom: '2px solid #999', paddingBottom: '0.5rem', color: '#666' }}>Past Events</h3>
          {completed.length === 0 ? <p>No past events.</p> : completed.map(e => <EventCard key={e.id} event={e} isPast={true} />)}
        </>
      )}
    </div>
  );
}