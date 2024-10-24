import React, { useState } from 'react';

// interface Category {
//   category: string;
//   subcategory: string;
// }



const Dropdown: React.FC = ({uniqueData}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
// console.log(uniqueData)
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };



  return (
    <div className="relative text-center">
      <div>
        <div
          className="inline-flex justify-center w-full px-4 py-2 bg-yellow-400 text-lg font-bold text-gray-700 hover:bg-yellow-500 focus:outline-none"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {selectedCategory || "Categories"}
          <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g data-name="Layer 2"> <g data-name="info"> <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"></rect> <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path> <circle cx="12" cy="8" r="1"></circle> <path d="M12 10a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0v-5a1 1 0 0 0-1-1z"></path> </g> </g> </g></svg>
          <svg
            className="-mr-1 ml-2 h-6 w-6 bg-gray-950 text-yellow-400 rounded-2xl"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div
          className="origin-top-right z-50 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {uniqueData.map((item, index) => (
              item.category && (
                <a
                  key={index}
                  href="#"
                  className="bg-yellow-400 text-lg font-bold text-gray-700 block px-4 py-2 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => handleCategoryClick(item.category)}
                >
                  {item.category} - {item.subcategory}
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
