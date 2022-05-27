import { createContext } from "react";
import { Categories, Category } from "../types/Category";

export interface ICategoryContext {
  category: Category;
  setCategory: (category: Category) => void;
}

const CategoryContext = createContext<ICategoryContext>({
  category: Categories.about,
  setCategory: (category) => {},
});

export default CategoryContext;
