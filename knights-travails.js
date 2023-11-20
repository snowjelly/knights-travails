function levelOrderRecursive(cb = null, queue = [root], orderedArray = []) {
  if (queue.length === 0 && cb === null) {
    return orderedArray;
  }
  if (queue.length === 0) {
    return;
  }

  const deQueue = queue.shift();
  if (cb !== null) {
    if (cb(deQueue)) return true;
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

const prettyPrintAlt = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrintAlt(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}[${node.data[0]}]`);
  if (node.left !== null) {
    prettyPrintAlt(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function buildTree(l, h, sortedArr, rootSpace) {
  if (l > h) return null;

  const mid = Math.floor((l + h) / 2);
  const nodeOb = node(sortedArr[mid], rootSpace);

  nodeOb.left = buildTree(l, mid - 1, sortedArr, rootSpace);
  nodeOb.right = buildTree(mid + 1, h, sortedArr, rootSpace);
  return nodeOb;
}

const movesFr = [];

const node = (arr, endArr) => {
  function getPotentialMoves(x = arr[0], y = arr[1]) {
    const arr = [];

    arr.push({ currentSpace: [x, y], potentialMoves: [x + 2, y + 1] });
    arr.push({ currentSpace: [x, y], potentialMoves: [x + 2, y - 1] });
    arr.push({ currentSpace: [x, y], potentialMoves: [x - 2, y - 1] });
    arr.push({ currentSpace: [x, y], potentialMoves: [x - 2, y + 1] });

    arr.push({ currentSpace: [x, y], potentialMoves: [x + 1, y + 2] });
    arr.push({ currentSpace: [x, y], potentialMoves: [x - 1, y + 2] });
    arr.push({ currentSpace: [x, y], potentialMoves: [x - 1, y - 2] });
    arr.push({ currentSpace: [x, y], potentialMoves: [x + 1, y - 2] });
    const legalMoves = arr.filter(
      (move) =>
        move.potentialMoves[0] > 0 &&
        move.potentialMoves[0] <= 7 &&
        move.potentialMoves[1] > 0 &&
        move.potentialMoves[1] <= 7
    );
    legalMoves.sort((a, b) => {
      if (a.potentialMoves[0] - b.potentialMoves[0] === 0) {
        return a.potentialMoves[1] - b.potentialMoves[1];
      }
      return a.potentialMoves[0] - b.potentialMoves[0];
    });
    return legalMoves;
  }

  const potentialMoves = getPotentialMoves();

  return {
    potentialMoves,
  };
};

function gameBoard() {
  function create(n = 7) {
    const arr = [];
    for (let i = 0; i <= n; i++) {
      for (let z = 0; z <= n; z++) {
        arr.push([i, z]);
      }
    }
    return arr;
  }

  const board = create();

  function createPotentialMoves() {
    const boardsPotentialMoves = [];
    board.forEach((space) => {
      boardsPotentialMoves.push(node(space));
    });

    return boardsPotentialMoves;
  }

  return {
    board,
    potentialMoves: createPotentialMoves(),
  };
}

function find(node, arrToSearch) {
  if (!arrToSearch[0].currentSpace)
    return arrToSearch.find(
      (space) => space[0] === node[0] && space[1] === node[1]
    );

  return arrToSearch.find(
    (space) =>
      space.currentSpace[0] === node[0] && space.currentSpace[1] === node[1]
  );
}

function findAnswer(node, answerToFind) {
  const a = find([node[0], node[1]], board);

  const result = find([answerToFind[0], answerToFind[1]], a.potentialMoves);

  if (result !== undefined) return { found: true, result, answerToFind, node };
  return { found: false, nextNodeArr: a.potentialMoves, answerToFind, node };
}

function driver() {
  let found = findAnswer([0, 3], [2, 5]);
  let copy = found;
  const startArr = found.nextNodeArr;
  console.log(found);

  if (!found.found) {
    for (let i = 0; i < startArr.length; i++) {
      found = findAnswer(startArr[i], found.answerToFind);
      console.log(found);
      if (found.found) return found;
    }
  }
}

const moves = [];

function knightMoves(startArr, endArr) {
  return node(startArr, endArr);
}

// can also filter out potential moves that have already been made ? (potentialy overcomplicating this)

console.log(knightMoves([5, 5], [3, 3]).potentialMoves);
