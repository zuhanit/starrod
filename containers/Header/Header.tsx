import MenuButton from "../../components/Buttons/MenuButton";
import Menu from "../../components/Navigation/Menu";
import MenuItem, { MenuItemProps } from "../../components/Navigation/MenuItem";
import Logo from "../Logo/Logo";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import {
  ChangeEvent,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import CategoryContext from "../../context/CategoryContext";
import { Categories, CategoryGroup } from "../../types/Category";
import Search from "../../components/Inputs/Search";
import ThemeButton from "../ThemeButton";
import { getSearchReulst, SearchResult } from "../../lib/SearchAPI";
import { SearchItem } from "../../components/Inputs/SearchItem";
import { useMediaQuery } from "react-responsive";

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
  const [mounted, setMounted] = useState(false);
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
  useEffect(() => {
    setMounted(true);
  }, []);
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
          height: 65px;
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
          justify-content: end;
          gap: 14px;
          width: 100%;
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
          {mounted && <HeaderNavigatorContainer />}
        </div>
      </div>
    </header>
  );
};

const HeaderNavigatorContainer = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 1025px)",
  });

  return isMobile ? <HeaderNavigatorMobile /> : <HeaderNavigator />;
};

const HeaderNavigatorMobile = () => {
  const [searching, setSearching] = useState(false);
  const onClickSearch = () => setSearching(!searching);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target || !searching) return;
      if (ref.current && !ref.current.contains(event.target as Node))
        setSearching(false);
    };
    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, [searching]);
  return (
    <>
      {searching ? (
        <HeaderNavigator ref={ref} />
      ) : (
        <>
          <ThemeButton />
          <AiOutlineSearch fill="white" onClick={onClickSearch} />
        </>
      )}
    </>
  );
};

type HeaderNavigatorProps = {
  onClick?: () => void;
};

const HeaderNavigator = forwardRef<HTMLDivElement, HeaderNavigatorProps>(
  ({ onClick }, ref) => {
    const [searchDocs, setSearchdocs] = useState<SearchResult[]>([]);
    const onChangeSearch = async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length > 0) {
        const result = await getSearchReulst(event.target.value);
        setSearchdocs(result);
      } else {
        setSearchdocs([]);
      }
    };

    return (
      <div className="header-search-container" ref={ref} onClick={onClick}>
        <style jsx>{`
          .header-search-container {
            position: relative;
            max-width: 410px;
            flex-grow: 1;
          }

          .search-result {
            width: 100%;
            position: absolute;
            z-index: 1;
            top: 40px;
            background-color: var(--background);
            border: 1px solid var(--chassis);
            max-height: 200px;
            overflow: auto;
            color: var(--text-on-dark);
          }
        `}</style>
        <Search onChange={onChangeSearch} />
        {searchDocs.length > 0 && (
          <div className="search-result">
            {searchDocs.map((doc, index) => (
              <SearchItem item={doc} key={index}></SearchItem>
            ))}
          </div>
        )}
      </div>
    );
  }
);

HeaderNavigator.displayName = "HeaderNavigator";

export default Header;
