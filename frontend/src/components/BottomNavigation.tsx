import React from 'react';
import { Link } from 'react-router-dom';

const BottomNavigation: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="flex justify-around py-2">
        <Link to="/" className="text-center">
          <div>Home</div>
        </Link>
        <Link to="/favorites" className="text-center">
          <div>Favorites</div>
        </Link>
        <Link to="/settings" className="text-center">
          <div>Settings</div>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
