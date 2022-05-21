import MenuButton from "../../components/Buttons/MenuButton";
import Menu from "../../components/Navigation/Menu";
import MenuItem from "../../components/Navigation/MenuItem";
import Logo from "../Logo/Logo";
import { AiFillCaretDown } from "react-icons/ai";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const MenuComponent = (category: string) => (
  <div className="menu-component">
    <style jsx>{`
      .menu-component {
        display: flex;
        align-items: center;
        gap: 4px;
        color: #8d8d8d;
      }
    `}</style>
    {category}
    <AiFillCaretDown />
  </div>
);

const Header = () => {
  const category = useContext(GlobalContext);

  return (
    <header>
      <style jsx>{`
        header {
          background: var(--background-darker);
        }
        .header-container {
          display: flex;
          align-items: center;
          height: 60px;
          padding: 0 20px;
          gap: 6px;
        }
      `}</style>
      <nav className="header-container">
        <Logo />
        <MenuButton component={MenuComponent(category.category)}>
          <Menu>
            <MenuItem title="Classic EUD" />
            <MenuItem title="epScript" />
          </Menu>
        </MenuButton>
      </nav>
    </header>
  );
};

export default Header;
