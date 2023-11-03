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
    const legalMoves = arr.filter((move) => move[0] > 0 && move[1] > 0);
    legalMoves.sort((a, b) => {
      if (a[0] - b[0] === 0) {
        return a[1] - b[1];
      }
      return a[0] - b[0];
    });

    return legalMoves;
  }

  return {
    data: [x, y],
    knight: false,
    potentialMoves: potentialMoves(x, y),
  };
};

function buildTree(l, h, arr, root) {
  if (l > h) return null;
  let mid = Math.floor((l + h) / 2);
  const x = arr[mid][0];
  const y = arr[mid][1];

  const nodeOb = node(x, y);
  nodeOb.left = buildTree(l, mid - 1, arr, root);
  nodeOb.right = buildTree(mid + 1, h, arr, root);
  return nodeOb;
}

function inorder(cb = null, queue = [root], orderedArray = []) {
  if (queue.length === 0) {
    return;
  }

  const deQueue = queue.shift();

  if (deQueue.left !== null) {
    queue = [...queue, deQueue.left];
    inorder(cb, queue, orderedArray);
  }
  if (cb !== null) {
    cb(deQueue);
  }
  orderedArray.push(deQueue);

  if (deQueue.right !== null) {
    queue = [...queue, deQueue.right];
    inorder(cb, queue, orderedArray);
  }

  if (queue.length === 0 && cb === null) {
    return orderedArray;
  }
}

function knightMoves(start, destination) {
  // knight can move 2 steps forward and one to the side
  // as long as x && y > 0
  const startX = start[0];
  const startY = start[1];
  const goalX = destination[0];
  const goalY = destination[1];

  // order potential moves
  // mid = destination
  // potentialMoveX < destinationX go to left
  // potentialMoveX > destinationX go to right
  // if potentialMoveX === destinationX,
  // check if <(left) or >(right) destinationY
  //
  const startNode = node(startX, startY);
  const destinationNode = node(goalX, goalY);

  const rootNode = buildTree(
    0,
    startNode.potentialMoves.length - 1,
    startNode.potentialMoves,
    destinationNode.data
  );

  prettyPrint(rootNode);
  inorder(
    (value) => {
      if (
        destinationNode.data[0] === value.data[0] &&
        destinationNode.data[1] === value.data[1]
      ) {
        const counter = 1;
        console.log(`You made it in ${counter} move!  Here's your path:`);
        console.log(value.data);
      }
    },
    [rootNode]
  );
  // console.log({ startNode: startNode.potentialMoves, destinationNode });
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

console.log(knightMoves([3, 3], [4, 5]));
