import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { useContext } from "react";
import Breadcrumbs from "../../components/Navigation/Breadcrumbs";
import CategoryContext from "../../context/CategoryContext";
import { useDocsIndex } from "../../hooks/useDocumentation";
import { Index } from "../../pages/api/docs/index/index";
import { Documentation } from "../../types/IDocumentation";
import Article from "../Article/Article";
import ArticleNavigator from "../Article/ArticleNavigator";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

interface MainContentProps {
  docs: Documentation;
  matter: { [key: string]: any };
  mdxResult: MDXRemoteSerializeResult;
}

const MainContent = ({ docs, matter, mdxResult }: MainContentProps) => {
  const { category } = useContext(CategoryContext);
  const data = useDocsIndex();
  if (!data) {
    return <div></div>;
  }
  const currentDocumentIndex = matter["sort"];
  const categoryItems = flattenCategoryItems(data.list[category.id]);
  const documentPath = [
    category.name,
    ...getDocPath(data.list[category.id], docs.name),
  ];
  const [prev, next] = [
    categoryItems[currentDocumentIndex - 1],
    categoryItems[currentDocumentIndex + 1],
  ];
  const prevArticle = prev
    ? {
        label: prev,
        href: `${category.id}/${prev}`,
      }
    : undefined;
  const nextArticle = next
    ? {
        label: next,
        href: `${category.id}/${next}`,
      }
    : undefined;
  return (
    <div className="overflow-guard">
      <style jsx>{`
        .overflow-guard {
          position: relative;
          overflow: hidden;
          height: calc(100% - 50px);
        }
        .content {
          display: flex;
          min-height: 0;
          background: var(--background);
          height: 100%;
          overflow-y: hidden;
        }

        .content-container {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          overflow-y: scroll;
        }

        .content-layout {
          padding-top: 48px;
          padding-left: 30px;
          padding-right: 30px;
          margin: 0 auto;
          max-width: 1100px;
        }

        .navigator-container {
          padding: 48px 30px;
        }

        .layout--grow {
          flex-grow: 1;
        }
      `}</style>
      <div className="content">
        <Sidebar />
        <div className="content-container">
          <div className="content-layout">
            <div className="breadcrumbs-container">
              <Breadcrumbs>{documentPath.map((path) => path)}</Breadcrumbs>
            </div>
            <div className="layout--grow">
              <Article matter={matter} src={mdxResult} docs={docs} />
            </div>
          </div>
          <div className="navigator-container">
            <ArticleNavigator prev={prevArticle} next={nextArticle} />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

const flattenCategoryItems = (index: (string | Index)[]) => {
  const ret: string[] = [];
  index.forEach((iterIndex) => {
    if (typeof iterIndex === "string") {
      ret.push(iterIndex);
    } else {
      Object.keys(iterIndex).forEach((key) =>
        ret.push(...flattenCategoryItems(iterIndex[key]))
      );
    }
  });

  return ret;
};

const getDocPath = (index: (string | Index)[], target: string) => {
  let categories: string[] = [];

  index.forEach((iterIndex) => {
    if (typeof iterIndex === "string") {
      iterIndex === target && categories.push(iterIndex);
      return;
    } else {
      Object.keys(iterIndex).forEach((key) => {
        getDocPath(iterIndex[key], target).includes(target) &&
          categories.push(key, ...getDocPath(iterIndex[key], target));
      });
    }
  });

  return categories;
};

export default MainContent;
