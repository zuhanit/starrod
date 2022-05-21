import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

export interface TreeviewProps {
  label: string;
  root?: boolean;
  children?:
    | React.ReactElement<TreeviewProps>
    | React.ReactElement<TreeviewProps>[];
}

const TreeViewItem = ({ label, children, root }: TreeviewProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const onClickContainer = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <style jsx>{`
        .treeview-item {
          display: flex;
          gap: 4px;
          align-items: center;
          cursor: pointer;
          padding: 4px 0;
        }

        .item-anchor {
          content: "";
          border-bottom: 0.01rem dashed var(--chassis);
          width: 8px;
        }

        .item-label {
          padding-left: 8px;
          transition: 0.2s ease-in;
        }

        .item-label:hover {
          color: var(--button-hover);
        }

        :global(.arrow) {
          transition: 0.3s;
        }

        :global(.arrow-collapsed) {
          transition: 0.3s;
          transform: rotate(90deg);
        }

        .treeview-item-container {
          display: none;
          margin-left: 8px;
          position: relative;
        }

        .treeview-item-container::before {
          content: "";
          height: 100%;
          position: absolute;
          bottom: 15px;
          border-left: 0.01rem dashed var(--chassis);
        }

        .collapsed {
          display: block;
        }
      `}</style>
      <div className="treeview-item" onClick={onClickContainer}>
        {!root && <span className="item-anchor"></span>}
        {children && (
          <IoIosArrowForward
            className={`arrow ${collapsed ? "arrow-collapsed" : ""}`}
          />
        )}
        <span className="item-label">{label}</span>
      </div>
      {children && (
        <div
          className={`treeview-item-container ${collapsed ? "collapsed" : ""}`}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default TreeViewItem;
