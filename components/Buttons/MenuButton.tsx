import { useEffect, useRef, useState } from "react";
import { MenuProps } from "../Navigation/Menu";

interface MenuButtonProps {
  children: React.ReactElement<MenuProps>;
  component: React.ReactElement;
}

const MenuButton: React.FC<MenuButtonProps> = ({ children, component }) => {
  const [collapsed, setCollapsed] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const onClickMenuButton = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target) return;
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setCollapsed(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [collapsed]);

  return (
    <div ref={menuRef} className="menubutton-container">
      <style jsx>{`
        .menubutton-container {
          position: relative;
        }
        .menu-button {
          border: none;
          background: none;
          cursor: pointer;
          padding: 0;
          margin: 0;
        }
        .menu-wrapper {
          opacity: 0;
          visibility: hidden;
          position: absolute;
          margin-top: 0.5rem;
          left: 50%;
          transform: translate(-50%);
          transition: 0.3s ease-in-out;
          z-index: 1;
        }

        .collapsed {
          opacity: 1;
          visibility: visible;
        }
      `}</style>
      <button className="menu-button" onClick={onClickMenuButton}>
        {component}
      </button>
      <div className={`menu-wrapper ${collapsed ? "collapsed" : ""}`}>
        {children}
      </div>
    </div>
  );
};
export default MenuButton;
