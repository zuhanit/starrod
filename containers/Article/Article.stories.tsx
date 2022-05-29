import Article from "./Article";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import { Documentation } from "../../types/IDocumentation";

export default {
  title: "Containers/Article/Article",
} as ComponentMeta<typeof Article>;

const source = `---
title: Front Mater
---
This is content.
`;

const docs: Documentation = {
  name: "Hello",
  path: "",
  date: "Wed, 25 May 2022 05:15:54 GMT",
  src: source,
};

const { content, data } = matter(source);
export const Template: ComponentStory<typeof Article> = (
  args,
  { loaded: { src } }
) => {
  return <Article docs={docs} matter={data} src={src} />;
};

Template.loaders = [
  async () => ({
    src: await serialize(content),
  }),
];
