import React from 'react';
import { FaHome, FaUser, FaReceipt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-primary border-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        <ul className="flex justify-between">
          <li className="p-4">
            <FaHome size={24} onClick={()=> navigate("/")}/>
          </li>
          <li className="p-4">
            <FaReceipt size={24} />
          </li>
          <li className="p-4">
            <FaUser size={24} />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
