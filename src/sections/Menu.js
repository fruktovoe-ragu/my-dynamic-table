import React, { useState, useEffect, useRef } from 'react';
import Button from "../components/Button/Button";
import EditIcon from "../icons/edit";
import DeleteIcon from "../icons/delete";
import MenuIcon from "../icons/menu";

const Menu = ({ 
  order = '',
  hasEditItem = false,
  deleteItemContent = '',
  onEditClick,
  onDeleteClick,
  className,
}) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const dropdownRef = useRef(null);

  const handleClickOutside = e => {
    if (!dropdownRef.current.contains(e.target)) {
      setIsMenuOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpened(prevState => !prevState);
  };

  const handleEditClick = e => {
    e.stopPropagation();

    setIsMenuOpened(false);

    onEditClick?.();
  };

  const handleDeleteClick = () => {
    setIsMenuOpened(false);

    onDeleteClick?.();
  };

  const position = order === 0 ? 'left' : 'right';

  return (
    <div 
      className={`${className}`}
      ref={dropdownRef}
    >
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          isFloated
          theme="secondary"  
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </Button>
      </div>
      {isMenuOpened && 
        <div className={`
          ${position}-0
          absolute top-100 bg-white shadow-xl rounded-lg z-10 overflow-hidden
        `}>
          {hasEditItem && 
            <div
              className="flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-50"
              onClick={handleEditClick}
            >
              <div className="w-5">
                <EditIcon />
              </div>
              <p className="text-nowrap font-medium">Edit title</p>
            </div>
          }
          <div
            className="flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-50"
            onClick={handleDeleteClick}
          >
            <div className="w-5">
              <DeleteIcon />
            </div>
            <p className="text-nowrap text-red-700 font-medium">{deleteItemContent}</p>
          </div>
        </div>
      }
    </div>
  );
};

export default Menu;