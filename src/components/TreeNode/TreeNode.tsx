import React, { useState } from 'react';
import { Icon } from '../Icons/Icons.tsx';
import { AddNodeModal, DeleteNodeModal, RenameNodeModal } from '../Modals';
import { ITreeNode } from '../../state/types.ts';

import Styles from './TreeNode.module.css';
import { useClickOutside } from '../../state/useClickOutside.ts';

type TreeNodeProps = {
  node: ITreeNode;
  error: string | null;
  isLoading: boolean;
  addTreeNode: (
    parentNodeId: number,
    nodeName: string,
    closeModal: () => void,
  ) => void;
  removeTreeNode: (nodeId: number) => void;
  renameNode: (
    nodeId: number,
    newNodeName: string,
    closeModal: () => void,
  ) => void;
  clearError: () => void;
};
export const TreeNode: React.FC<TreeNodeProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const {
    node,
    error,
    isLoading,
    addTreeNode,
    removeTreeNode,
    renameNode,
    clearError,
  } = props;

  const ref = React.useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsSelected(false));

  const hasChildren = !!(props.node.children && props.node.children.length);
  return (
    <div className={Styles.nodeWrapper}>
      <div
        ref={ref}
        className={`${Styles.node} ${isSelected ? Styles.selected : ''}`}
        onClick={() => {
          setIsExpanded(!isExpanded);
          setIsSelected(true);
        }}
      >
        <AddNodeModal
          isOpen={isAddModalOpen}
          error={error}
          isLoading={isLoading}
          onClose={() => {
            setIsAddModalOpen(!isAddModalOpen);
            clearError();
          }}
          onAddNode={(nodeName) => {
            if (!node) return;
            addTreeNode(node.id, nodeName, () => {
              setIsAddModalOpen(false);
            });
          }}
        />
        <DeleteNodeModal
          isOpen={isDeleteModalOpen}
          nodeName={node.name}
          onClose={() => {
            setIsDeleteModalOpen(!isDeleteModalOpen);
            clearError();
          }}
          error={error}
          isLoading={isLoading}
          onDeleteNode={() => {
            if (!node) return;
            removeTreeNode(node.id);
          }}
        />
        <RenameNodeModal
          nodeName={node.name}
          isOpen={isRenameModalOpen}
          onClose={() => {
            setIsRenameModalOpen(!isRenameModalOpen);
            clearError();
          }}
          error={error}
          isLoading={isLoading}
          onRenameNode={(newName) => {
            if (!node) return;
            renameNode(node.id, newName, () => setIsRenameModalOpen(false));
          }}
        />
        {hasChildren && (
          <Icon icon={isExpanded ? 'caret-right' : 'caret-down'} />
        )}
        {props.node.name}
        {isSelected && (
          <>
            <Icon
              icon={'square-plus'}
              color={'lightBlue'}
              onClick={(event) => {
                event.stopPropagation();
                setIsAddModalOpen(true);
              }}
            />
            <Icon
              icon={'pen-to-square'}
              color={'lightBlue'}
              onClick={(event) => {
                event.stopPropagation();
                setIsRenameModalOpen(true);
              }}
            />
            <Icon
              icon={'trash'}
              color={'red'}
              onClick={(event) => {
                event.stopPropagation();
                setIsDeleteModalOpen(true);
              }}
            />
          </>
        )}
      </div>
      {hasChildren &&
        isExpanded &&
        props.node.children?.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            addTreeNode={addTreeNode}
            clearError={clearError}
            error={error}
            isLoading={isLoading}
            removeTreeNode={removeTreeNode}
            renameNode={renameNode}
          />
        ))}
    </div>
  );
};
