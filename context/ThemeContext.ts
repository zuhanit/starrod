import { createContext } from "react";
import { Theme } from "../containers/ThemeButton";

export interface IThemeContxt {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<IThemeContxt>({
  theme: "light",
  setTheme: () => {},
});

export default ThemeContext;
