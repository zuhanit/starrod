import Article from "./Article";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";

export default {
  title: "Containers/Article/Article",
} as ComponentMeta<typeof Article>;

const source = `---
title: Front Mater
---
This is content.
`;

const { content, data } = matter(source);
export const Template: ComponentStory<typeof Article> = (
  args,
  { loaded: { src } }
) => {
  return (
    <Article
      contributors={["Zuhanit", "torvalds"]}
      title="Hello"
      lastModified="2022.05.19"
      src={src}
    />
  );
};

Template.loaders = [
  async () => ({
    src: await serialize(content),
  }),
];
