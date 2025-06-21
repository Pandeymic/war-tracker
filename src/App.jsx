import React, { useEffect, useState } from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';

export default function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/.netlify/functions/getNews');
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error('Error fetching news:', err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar events={events} />
      <Map events={events} />
    </div>
  );
}
