import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('reserve_list') as HTMLElement
);

root.render(
  <React.StrictMode>
    <p>reservation list</p>
    <div>
      room
      building_abbr, capacity, time interval
      <button>Go to</button>
      <button>cancel reservation</button>
    </div>
  </React.StrictMode>
);