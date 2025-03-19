import { useCallback, useEffect, useState } from 'react';
import { ITreeNode } from './types.ts';
import {
  getTree,
  createTreeNode,
  deleteTreeNode,
  renameTreeNode,
} from '../api/nodesTreeApi';

const UNKNOWN_ERROR = 'Unknown error';

const useNodesTree = () => {
  const [nodesTree, setNodesTree] = useState<ITreeNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTree = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTree();
      console.log(data);
      setNodesTree(data);
    } catch (error) {
      setError(error?.response?.data?.data?.message || UNKNOWN_ERROR);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTreeNode = useCallback(
    async (parentNodeId: number, nodeName: string, closeModal: () => void) => {
      setIsLoading(true);
      setError(null);
      try {
        await createTreeNode(parentNodeId, nodeName);
        const data = await getTree();
        setNodesTree(data);
        closeModal();
      } catch (error) {
        setError(error?.response?.data?.data?.message || UNKNOWN_ERROR);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const removeTreeNode = useCallback(async (nodeId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteTreeNode(nodeId);
      const data = await getTree();
      setNodesTree(data);
    } catch (error) {
      setError(error?.response?.data?.data?.message || UNKNOWN_ERROR);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renameNode = useCallback(
    async (nodeId: number, newNodeName: string, closeModal: () => void) => {
      setIsLoading(true);
      setError(null);
      try {
        await renameTreeNode(nodeId, newNodeName);
        const data = await getTree();
        setNodesTree(data);
        closeModal();
      } catch (error) {
        setError(error?.response?.data?.data?.message || UNKNOWN_ERROR);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    fetchTree();
  }, []);

  return {
    nodesTree,
    error,
    isLoading,
    setError,
    clearError,
    addTreeNode,
    removeTreeNode,
    renameNode,
  };
};

export default useNodesTree;
