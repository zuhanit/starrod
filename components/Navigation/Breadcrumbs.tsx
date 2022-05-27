import { MdArrowForwardIos } from "react-icons/md";
import { BsSlashLg } from "react-icons/bs";
import { BiChevronRight } from "react-icons/bi";

interface BreadcrumbsProps {
  children: React.ReactNode | React.ReactNode[];
}

const Breadcrumbs = ({ children }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb">
      <style jsx>{`
        ol {
          display: flex;
          gap: 4px;
          color: var(--text-darker);
          margin: 0;
          padding: 0;
        }

        li {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 4px;
        }
      `}</style>
      <ol>
        {Array.isArray(children)
          ? children.map((child, index) => (
              <li key={`breadcrumbs-item-${index}`}>
                {child}
                <BiChevronRight />
              </li>
            ))
          : children}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
