import styled from "styled-components";
import { ClickableType } from "../Types/Clickable";

export interface MenuItemProps {
  title: string;
  onClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const MenuStyle = styled.li``;

const MenuItem = ({ title, onClick }: MenuItemProps) => {
  return (
    <li onClick={onClick}>
      <style jsx>{`
        li {
          cursor: pointer;
          transition: 0.3s ease;
          padding: 5px 5px;
          border-radius: 3px;
        }

        li:hover {
          background: var(--input-hover);
        }

        li:active {
          background: var(--input-click);
        }
      `}</style>
      {title}
    </li>
  );
};

export default MenuItem;
