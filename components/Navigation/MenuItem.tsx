import styled from "styled-components";

export interface MenuItemProps {
  title: string;
}

const MenuStyle = styled.li`
  cursor: pointer;
  transition: 0.3s ease;
  padding: 5px 5px;
  border-radius: 3px;
  &:hover {
    background: var(--input-hover);
  }

  &:active {
    background: var(--input-click);
  }
`;

const MenuItem = ({ title }: MenuItemProps) => {
  return <MenuStyle>{title}</MenuStyle>;
};

export default MenuItem;
