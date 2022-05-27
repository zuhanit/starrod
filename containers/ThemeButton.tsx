import { useContext, useEffect, useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import ThemeContext from "../context/ThemeContext";

export type Theme = "light" | "dark";

const ThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const onClickThemeButton = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  useEffect(() => {
    document.body.dataset.theme = theme;
    console.log(document.body.dataset.theme);
  }, [theme]);

  return (
    <button className="theme-button" onClick={onClickThemeButton}>
      <style jsx>{`
        .theme-button {
          background: none;
          border: none;
          cursor: pointer;
        }

        :global(svg) {
          display: flex;
          align-items: center;
          transition: 0.3s ease;
        }

        .theme-button > :global(svg):hover {
          fill: var(--secondary);
        }
      `}</style>
      {theme === "light" ? (
        <BsSun size={16} fill="white" />
      ) : (
        <BsMoon size={16} fill="white" />
      )}
    </button>
  );
};

export default ThemeButton;
