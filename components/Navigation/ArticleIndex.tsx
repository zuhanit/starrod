interface ArticleIndexProps {
  children: React.ReactElement | React.ReactElement[];
}

const ArticleIndex = ({ children }: ArticleIndexProps) => {
  return (
    <ul className="article-index">
      <style jsx>{`
        .article-index {
          position: absolute;
          margin: 0;
          padding: 0;
          border-left: 1px solid var(--chassis);
        }
      `}</style>
      {children}
    </ul>
  );
};

export default ArticleIndex;
