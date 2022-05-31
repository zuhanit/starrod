import Link from "next/link";
import { SearchResult } from "../../lib/SearchAPI";

interface SearchItemProps {
  item: SearchResult;
}
export const SearchItem = ({ item }: SearchItemProps) => {
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
