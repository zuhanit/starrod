interface ArticleIndexItemProps {
  depth: 1 | 2 | 3 | 4 | 5 | 6;
  src: string;
  href: string;
}

const ArticleIndexItem = ({ depth, src, href }: ArticleIndexItemProps) => {
  return (
    <li className="article-index-item-wrapper">
      <style jsx>{`
        .article-index-item-wrapper {
          list-style: none;
          padding: 4px;
        }

        .article-index-item {
          padding-left: ${8 * depth}px;
          color: var(--text);
          transition: 0.3s ease;
        }

        .article-index-item:hover {
          color: var(--link);
        }
      `}</style>
      <a href={decodeURI(href)} className="article-index-item">
        {src}
      </a>
    </li>
  );
};

export default ArticleIndexItem;
