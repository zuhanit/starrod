import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import CategoryContext, { ICategoryContext } from "../context/CategoryContext";
import { Categories, Category } from "../types/Category";
import { Theme } from "../containers/ThemeButton";
import ThemeContext, { IThemeContxt } from "../context/ThemeContext";
import "prismjs/themes/prism.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [currentCategory, setCurrentCategory] = useState<Category>(
    Categories.about
  );
  const categoryValue: ICategoryContext = {
    category: currentCategory,
    setCategory: setCurrentCategory,
  };
  const [currentTheme, setCurrentTheme] = useState<Theme>("light");
  const themeValue: IThemeContxt = {
    theme: currentTheme,
    setTheme: setCurrentTheme,
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <CategoryContext.Provider value={categoryValue}>
        <Component {...pageProps} />
      </CategoryContext.Provider>
    </ThemeContext.Provider>
  );
}

export default MyApp;
