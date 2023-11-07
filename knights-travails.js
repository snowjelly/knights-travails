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

    return legalMoves;
  }

  return {
    data: [x, y],
    knight: false,
    potentialMoves: potentialMoves(x, y),
  };
};

function buildTree(l, h, arr) {
  if (l > h) return null;
  let mid = Math.floor((l + h) / 2);
  const x = arr[mid][0];
  const y = arr[mid][1];

  const nodeOb = node(x, y);
  nodeOb.left = buildTree(l, mid - 1, arr);
  nodeOb.right = buildTree(mid + 1, h, arr);
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
function find(value, rootNode) {
  const x = value[0];
  const y = value[1];
  while (x !== rootNode.data[0]) {
    if (x < rootNode.data[0] && rootNode.left !== null) {
      rootNode = rootNode.left;
    } else if (x > rootNode.data[0] && rootNode.right !== null) {
      rootNode = rootNode.right;
    } else {
      break;
    }
  }
  while (y !== rootNode.data[1]) {
    if (y < rootNode.data[1] && rootNode.left !== null) {
      rootNode = rootNode.left;
    } else if (y > rootNode.data[1] && rootNode.right !== null) {
      rootNode = rootNode.right;
    } else {
      break;
    }
  }
  if (rootNode.left === null && rootNode.right === null) {
    return { rootNode, done: true };
  }

  return rootNode;
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

  let rootNode = buildTree(
    0,
    startNode.potentialMoves.length - 1,
    startNode.potentialMoves
  );

  prettyPrint(rootNode);

  function move(rootNode) {
    rootNode = buildTree(
      0,
      rootNode.potentialMoves.length - 1,
      rootNode.potentialMoves
    );
    return rootNode;
  }

  //okay my idea is like
  // check kinght possible moves
  // go through each one
  // check destination possible moves
  // if they share a move. go there.
  // if not pick the one

  // nah maybe not ^

  // maybe what i do..
  // depth first search
  // increment or decrement values until close
  // then decrement

  function levelOrderRecursive(
    cb = null,
    queue = [rootNode],
    orderedArray = []
  ) {
    if (queue.length === 0 && cb === null) {
      return orderedArray;
    }
    if (queue.length === 0) {
      return;
    }

    const deQueue = queue.shift();
    if (cb !== null) {
      cb(deQueue);
    }

    if (deQueue.left !== null) {
      queue = [...queue, deQueue.left];
    }
    if (deQueue.right !== null) {
      queue = [...queue, deQueue.right];
    }

    if (cb !== null) {
      levelOrderRecursive(cb, queue);
    } else {
      orderedArray = levelOrderRecursive(cb, queue, [...orderedArray, deQueue]);
      return orderedArray;
    }
  }

  // cant backtrack

  function doStuff(rootN = rootNode) {
    levelOrderRecursive(
      (potentialMovesFromStart) => {
        const tree = move(potentialMovesFromStart);
        prettyPrint(tree);
        levelOrderRecursive(
          (potentialMoves) => {
            console.log({ potentialMoves });
            const searchForDestination = find(rootNode.data, potentialMoves);
            console.log(searchForDestination.rootNode);

            // if (
            //   searchForDestination.rootNode.data[0] === rootNode.data[0] &&
            //   searchForDestination.rootNode.data[1] === rootNode.data[1]
            // ) {
            //   console.log("found it!");
            // }

            // console.log({
            //   searchX: searchForDestination.rootNode.data[0],
            //   seachY: searchForDestination.rootNode.data[1],
            //   nodeX: rootNode.data[0],
            //   nodeY: rootNode.data[1],
            // });

            doStuff(move(potentialMoves));
          },
          [tree.right]
        );
      },
      [rootN]
    );
  }

  doStuff();
  //console.log(move(rootNode));

  // console.log(startNode.potentialMoves);
  // const testX = startNode.potentialMoves[1][0];
  // const testY = startNode.potentialMoves[1][1];
  // const testNode = node(testX, testY);
  // console.log(testNode.potentialMoves);
  // console.log(destinationNode.potentialMoves);

  // once u get to the correct x value. u can subtract 2 and then add back two
  //

  // check both possible move lists of both destination and start.
  // compare those. you search those. and if there isnt anything close then idk.

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

console.log(knightMoves([0, 0], [6, 6]));
