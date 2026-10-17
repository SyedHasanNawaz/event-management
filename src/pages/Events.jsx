import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../features/eventsSlice';

export default function Events() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents(''));
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchEvents(search));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Explore Events</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="Search events..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', marginLeft: '1rem' }}>Search</button>
      </form>

      {status === 'loading' && <p>Loading events...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
        {list.map((event) => (
          <div key={event.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <img 
              src={event.images?.[0]?.url || 'https://via.placeholder.com/200'} 
              alt={event.name} 
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} 
            />
            <h3 style={{ fontSize: '1.1rem', margin: '1rem 0 0.5rem 0' }}>{event.name}</h3>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              {event.dates?.start?.localDate} at {event.dates?.start?.localTime}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
              {event._embedded?.venues?.[0]?.name}
            </p>
            <Link to={`/event/${event.id}`} state={{ event }} style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#333', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}