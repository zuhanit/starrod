import TreeView from "../../components/Navigation/Treeview";
import TreeViewItem from "../../components/Navigation/TreeviewItem";
import yaml from "js-yaml";
import useSWR from "swr";
import axios from "axios";
import {
  DocumentationIndexAPIResponse,
  Index,
} from "../../pages/api/docs/index/index";
import { ChangeEvent, useContext, useEffect } from "react";
import CategoryContext from "../../context/CategoryContext";
import Search from "../../components/Inputs/Search";
import { useState } from "react";
import { useRouter } from "next/router";
import fuzzysort from "fuzzysort";
import { DocumentationAPIResponse } from "../../pages/api/docs";
import { Documentation } from "../../types/IDocumentation";
import Link from "next/link";
import { Category } from "../../types/Category";
import path from "path";
import remarkMdx from "remark-mdx";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import {
  getHighlightedText,
  getSearchResultInCategory,
  SearchResult,
} from "../../lib/SearchAPI";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Sidebar = () => {
  const { category } = useContext(CategoryContext);
  const { data, error } = useSWR<DocumentationIndexAPIResponse>(
    "/api/docs/index",
    fetcher
  );
  const [searching, setSearching] = useState(false);
  const [searchDocs, setSearchdocs] = useState<SearchResult[]>([]);
  const router = useRouter();

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

interface SearchItemProps {
  item: SearchResult;
}

const SearchItem = ({ item }: SearchItemProps) => {
  return (
    <div className="search-item">
      <style jsx>{`
        .search-item {
          padding: 5px;
          border: 1px solid transparent;
        }

        .search-item:hover {
          border: 1px solid var(--chassis);
        }

        .title {
          margin-bottom: 5px;
        }

        .content {
          color: var(--text-darker);
          text-overflow: ellipsis;
        }
      `}</style>
      <Link href={`/${item.path}`}>
        <a>
          <div className="title">{item.name}</div>
          <div className="content">{item.plainSrc}</div>
        </a>
      </Link>
    </div>
  );
};

export default Sidebar;
