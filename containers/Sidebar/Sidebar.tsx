import TreeView from "../../components/Navigation/Treeview";
import TreeViewItem from "../../components/Navigation/TreeviewItem";
import { Index } from "../../pages/api/docs/index/index";
import { ChangeEvent, useContext } from "react";
import CategoryContext from "../../context/CategoryContext";
import Search from "../../components/Inputs/Search";
import { useState } from "react";
import { useRouter } from "next/router";
import { getSearchResultInCategory, SearchResult } from "../../lib/SearchAPI";
import { useDocsIndex } from "../../hooks/useDocumentation";
import { SearchItem } from "../../components/Inputs/SearchItem";

const Sidebar = () => {
  const { category } = useContext(CategoryContext);
  const [searching, setSearching] = useState(false);
  const [searchDocs, setSearchdocs] = useState<SearchResult[]>([]);
  const router = useRouter();
  const data = useDocsIndex();

  const traverse = (index: (string | Index)[]): React.ReactElement[] => {
    return index.flatMap((iterIndex) => {
      if (typeof iterIndex === "string") {
        return (
          <TreeViewItem
            label={iterIndex}
            key={iterIndex}
            onClick={(e) => router.push(`/docs/${category.id}/${iterIndex}`)}
          />
        );
      } else {
        return Object.keys(iterIndex).flatMap((key) => (
          <TreeViewItem label={key} key={key}>
            {traverse(iterIndex[key])}
          </TreeViewItem>
        ));
      }
    });
  };

  if (!data) {
    return <div></div>;
  }

  const onChangeSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchdocs(
      await getSearchResultInCategory(category, event.target.value)
    );
    event.target.value.length === 0 ? setSearching(false) : setSearching(true);
  };
  return (
    <aside className="sidebar">
      <style jsx>{`
        aside {
          position: relative;
          overflow-y: scroll;
          border-right: 0.01rem solid var(--chassis);
          min-width: 300px;
          width: 10%;
          height: 100%;
          padding: 20px;
          flex: 0 0 0;
        }
        .search-container > search-result {
          opacity: 0;
          visibility: hidden;
        }

        input {
          height: 30px;
          border: 1px solid var(--chassis);
          border-radius: 5px;
        }
      `}</style>
      <nav className="sidebar-nav">
        <div className="search-container">
          <Search onChange={onChangeSearch} />
        </div>
        {searching ? (
          <div className="search-result">
            {searchDocs.map((doc) => (
              <SearchItem item={doc} key={doc.name} />
            ))}
          </div>
        ) : (
          <TreeView>{traverse(data!.list[category.id])}</TreeView>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
