export type CategoryGroup = "about" | "classic" | "eudplib" | "epscript";

export type Category = {
  id: CategoryGroup;
  name: string;
};

type ICategories = {
  [key in CategoryGroup]: Category;
};

export const Categories: ICategories = {
  about: {
    id: "about",
    name: "About Starrod",
  },
  classic: {
    id: "classic",
    name: "Classic EUD",
  },
  eudplib: {
    id: "eudplib",
    name: "eudplib",
  },
  epscript: {
    id: "epscript",
    name: "epScript",
  },
};
