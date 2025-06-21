import React from 'react';

export default function Sidebar({ events }) {
  return (
    <div className="w-1/3 max-w-sm bg-gray-900 p-4 overflow-y-auto text-sm">
      <h2 className="text-xl font-bold mb-4">📜 Iran–Israel Timeline</h2>
      {events.map(event => (
        <div key={event.id} className="mb-3 border-b border-gray-700 pb-2">
          <div className="text-red-400 font-semibold">{event.date}</div>
          <div className="text-white">{event.title}</div>
        </div>
      ))}
    </div>
  );
}
