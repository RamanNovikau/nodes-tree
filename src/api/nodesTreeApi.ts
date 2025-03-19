import axiosInstance from './axiosInstance';
import { ITreeNode } from '../state/types.ts';

const TREE_NAME = '63c6c16f-5083-4eef-9cf1-80f77b398cae';

export const getTree = async (): Promise<ITreeNode> => {
  const response = await axiosInstance.get('/api.user.tree.get', {
    params: {
      treeName: TREE_NAME,
    },
  });
  return response.data;
};

export const createTreeNode = async (
  parentNodeId: number,
  nodeName: string,
) => {
  return await axiosInstance.get('/api.user.tree.node.create', {
    params: {
      treeName: TREE_NAME,
      parentNodeId,
      nodeName,
    },
  });
};

export const deleteTreeNode = async (
    nodeId: number
) => {
    return await axiosInstance.get('/api.user.tree.node.delete', {
        params: {
            treeName: TREE_NAME,
            nodeId,
        },
    });
};

export const renameTreeNode = async (
    nodeId,
    newNodeName
) => {
    return await axiosInstance.get('/api.user.tree.node.rename', {
        params: {
            treeName: TREE_NAME,
            nodeId,
            newNodeName,
        },
    });
}
