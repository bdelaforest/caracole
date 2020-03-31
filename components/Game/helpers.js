const getNodesOffset = (selfNode, targetNode) => {
  const fromRect = selfNode ? selfNode.getBoundingClientRect() : null;
  const toRect = targetNode ? targetNode.getBoundingClientRect() : null;

  return fromRect && toRect
    ? { x: toRect.x - fromRect.x, y: toRect.y - fromRect.y }
    : { x: 0, y: 0 };
};

export const getCardTransitionProps = (selfNode, { fromNode, toNode }) => {
  const fromOffset = getNodesOffset(selfNode, fromNode);
  const toOffset = getNodesOffset(selfNode, toNode);

  return {
    from: fromOffset && { transform: `translate3d(${fromOffset.x}px, ${fromOffset.y}px, 0)` },
    enter: { transform: 'translate3d(0, 0, 0)' },
    leave: toOffset && { transform: `translate3d(${toOffset.x}px, ${toOffset.y}px, 0)` }
  };
};
