import { useEffect } from 'react';

function CheckDbStatus() {
  useEffect(() => {
    fetch('http://localhost:5000/state')
      .then(res => res.json())
      .then(data => {
        console.log('MongoDB connection status:', data.status);
      })
      .catch(err => {
        console.error('Failed to fetch DB status:', err);
      });
  }, []);

  return null; // This component only logs status to console
}

export default CheckDbStatus;
