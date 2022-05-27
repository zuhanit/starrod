import { PropsWithChildren } from "react";
import styled from "styled-components";

const CircleStyle = styled.div<CircleProps>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: ${(props) => props.color};
  box-shadow: 2px 2px 2px 2px #00000020;
`;

interface CircleProps {
  color: string;
}

const Palette = ({ color }: CircleProps) => (
  <span>
    <CircleStyle color={color}></CircleStyle>
    {color}
  </span>
);

export default Palette;
