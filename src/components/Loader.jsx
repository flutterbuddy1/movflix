import React, { useEffect, useState } from 'react';
import '../css/loader.css'; // custom styles here

const Loader = ({ loading }) => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setHide(true), 600); // wait for animation to complete
    }
  }, [loading]);

  if (hide) return null;

  return (
    <div className={`loader-screen ${!loading ? 'slide-left' : ''}`}>
      <div className="spinner-border text-light loader-spinner" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
