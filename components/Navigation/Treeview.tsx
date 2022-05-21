import TreeViewItem from "./TreeviewItem";

interface TreeviewProps {
  children:
    | React.ReactElement<TreeviewProps>
    | React.ReactElement<TreeviewProps>[];
}

const TreeView: React.FC<TreeviewProps> = ({ children }) => {
  return <div className="treeview-container">{children}</div>;
};

export default TreeView;

<TreeView>
  <TreeViewItem label="James"></TreeViewItem>
</TreeView>;
