import Link from "next/link";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

interface asdf {
  label: string;
  href: string;
}

interface ArticleNavigatorProps {
  prev?: asdf;
  next?: asdf;
}

const ArticleNavigator = ({ prev, next }: ArticleNavigatorProps) => {
  return (
    <nav className="article-navigator">
      <style jsx>{`
        .article-navigator {
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 100%;
          min-height: 50px;
        }

        .article-navigator-wrapper {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .next {
          justify-content: end;
        }
      `}</style>
      <div className="article-navigator-wrapper">
        {prev && (
          <>
            <MdArrowBackIosNew />
            <Link className="prev-article" href={prev?.href}>
              {prev?.label}
            </Link>
          </>
        )}
      </div>
      <div className="article-navigator-wrapper next">
        {next && (
          <>
            <Link className="next-article" href={next?.href}>
              {next?.label}
            </Link>
            <MdArrowForwardIos />
          </>
        )}
      </div>
    </nav>
  );
};

export default ArticleNavigator;
