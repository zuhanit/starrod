import "../styles/globals.css";
import "prismjs/themes/prism.css";
import * as nextImage from "next/image";
import CategoryContext from "../context/CategoryContext";

Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: (props) => {
    return <img {...props} />;
  },
});

export const decorators = [
  (Story) => {
    <CategoryContext.Provider value={{ category: "welcome" }}>
      <Story />
    </CategoryContext.Provider>;
  },
];
