import "../styles/globals.css";
import { StyleRegistry } from "styled-jsx";

export const decorators = [(Story) => themeDecorator(Story)];

const themeDecorator = (Story) => {
  return (
    <StyleRegistry>
      <Story />
    </StyleRegistry>
  );
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
