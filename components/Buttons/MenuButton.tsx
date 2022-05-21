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
          display: none;
          position: absolute;
          margin-top: 0.5rem;
          left: 50%;
          transform: translate(-50%);
        }

        .collapsed {
          display: block;
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
