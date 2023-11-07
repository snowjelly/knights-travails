const node = (x, y) => {
  function potentialMoves(x, y) {
    const arr = [];

    arr.push([x + 2, y + 1]);
    arr.push([x + 2, y - 1]);
    arr.push([x - 2, y - 1]);
    arr.push([x - 2, y + 1]);

    arr.push([x + 1, y + 2]);
    arr.push([x - 1, y + 2]);
    arr.push([x - 1, y - 2]);
    arr.push([x + 1, y - 2]);
    const legalMoves = arr.filter(
      (move) => move[0] > 0 && move[0] <= 7 && move[1] > 0 && move[1] <= 7
    );
    legalMoves.sort((a, b) => {
      if (a[0] - b[0] === 0) {
        return a[1] - b[1];
      }
      return a[0] - b[0];
    });

    function buildTree(
      l = 0,
      h = sortedArray.length - 1,
      sortedArr = sortedArray
    ) {
      if (l > h) return null;

      const mid = Math.floor((l + h) / 2);
      const nodeOb = node(sortedArr[mid]);

      nodeOb.left = buildTree(l, mid - 1, sortedArr);
      nodeOb.right = buildTree(mid + 1, h, sortedArr);
      return nodeOb;
    }

    return legalMoves;
  }
  return { data: [x, y], potentialMoves };
};
