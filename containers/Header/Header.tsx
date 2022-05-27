import MenuButton from "../../components/Buttons/MenuButton";
import Menu from "../../components/Navigation/Menu";
import MenuItem, { MenuItemProps } from "../../components/Navigation/MenuItem";
import Logo from "../Logo/Logo";
import { AiFillCaretDown } from "react-icons/ai";
import { useContext, useState } from "react";
import CategoryContext from "../../context/CategoryContext";
import { Categories, CategoryGroup } from "../../types/Category";
import Search from "../../components/Inputs/Search";
import ThemeButton from "../ThemeButton";

const MenuComponent = (category: string) => (
  <div className="menu-component">
    <style jsx>{`
      .menu-component {
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--text-darker);
      }

      span {
        width: 80px;
        transition: 0.3s ease;
      }
    `}</style>
    <span>{category}</span>
    <AiFillCaretDown />
  </div>
);

const Header = () => {
  const { category, setCategory } = useContext(CategoryContext);
  const getCategoryMenuItems = (): React.ReactElement<MenuItemProps>[] =>
    Object.keys(Categories).map((cat) => {
      const matchedCategory = Categories[cat as CategoryGroup];
      const onClickCategory = () => {
        setCategory(matchedCategory);
      };
      return (
        <MenuItem
          title={matchedCategory.name}
          onClick={onClickCategory}
          key={matchedCategory.id}
        />
      );
    });
  return (
    <header>
      <style jsx>{`
        header {
          background: var(--background-darker);
          width: 100%;
        }
        .header-container {
          display: flex;
          align-items: center;
          height: 50px;
          padding: 0 20px;
          gap: 6px;
        }

        .header-navigation-logo {
          display: flex;
          align-items: center;
          flex: 1;
          gap: 6px;
        }

        .header-navigation-main {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        :global(svg) {
          display: flex;
          align-items: center;
        }
      `}</style>
      <div className="header-container">
        <div className="header-navigation-logo">
          <Logo />
          <MenuButton component={MenuComponent(category.name)}>
            <Menu>{getCategoryMenuItems()}</Menu>
          </MenuButton>
        </div>
        <div className="header-navigation-main">
          <ThemeButton />
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
