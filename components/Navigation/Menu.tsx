import { MenuItemProps } from "./MenuItem";

export interface MenuProps {
  children:
    | React.ReactElement<MenuItemProps>
    | React.ReactElement<MenuItemProps>[];
}

const Menu: React.FC<MenuProps> = ({ children }) => {
  return (
    <ul className="menu-container">
      <style jsx>{`
        .menu-container {
          box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);
          width: 100px;
          padding: 10px 0px;
          border-radius: 5px;
          background: var(--background-darker);
          color: var(--input-color);
          margin: 0;
          list-style: none;
        }
      `}</style>
      {children}
    </ul>
  );
};

export default Menu;
