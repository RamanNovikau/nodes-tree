import React, { useEffect, useRef, useState } from 'react';
import useNodesTree from '../../state/useNodesTree.tsx';
import { TreeNode } from '../TreeNode/TreeNode.tsx';
import { AddNodeModal } from '../Modals';
import { Icon } from '../Icons/Icons.tsx';

import Styles from './NodesTree.module.css';
import {useClickOutside} from "../../state/useClickOutside.ts";

export const NodesTree: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const {
    nodesTree,
    isLoading,
    error,
    addTreeNode,
    removeTreeNode,
    clearError,
    renameNode,
  } = useNodesTree();

  const ref = React.useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsSelected(false));

  const hasChildren = !!(nodesTree?.children && nodesTree.children.length);

  return (
    <>
      <div
        className={`${Styles.tree} ${isSelected ? Styles.selected : ''}`}
        ref={ref}
        onClick={() => {
          setIsExpanded(!isExpanded);
          setIsSelected(true);
        }}
      >
        {hasChildren && (
          <Icon icon={isExpanded ? 'caret-right' : 'caret-down'} />
        )}
        {'Root'}
        {nodesTree && (
          <>
            <AddNodeModal
              isOpen={isAddModalOpen}
              error={error}
              isLoading={isLoading}
              onClose={() => {
                setIsAddModalOpen(!isAddModalOpen);
                clearError();
              }}
              onAddNode={(nodeName) => {
                if (!nodesTree) return;
                addTreeNode(nodesTree.id, nodeName, () => {
                  setIsAddModalOpen(false);
                });
              }}
            />
            {isSelected && (
              <Icon
                icon={'square-plus'}
                onClick={(event) => {
                  event.stopPropagation();
                  setIsAddModalOpen(true);
                }}
              />
            )}
          </>
        )}
      </div>
      {hasChildren &&
        isExpanded &&
        nodesTree?.children?.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            error={error}
            isLoading={isLoading}
            addTreeNode={addTreeNode}
            removeTreeNode={removeTreeNode}
            renameNode={renameNode}
            clearError={clearError}
          />
        ))}
    </>
  );
};
