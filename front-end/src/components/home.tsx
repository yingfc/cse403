import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div>
      <div>
        header picture
      </div>
      <div>
        profile
      </div>
      <div id="course_list"></div>
      <div id="reserve_list"></div>
    </div>
  </React.StrictMode>
);
