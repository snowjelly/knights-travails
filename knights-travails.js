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

const node = (space, endArr = null) => {
  if (endArr !== null) {
    if (arr[0] === endArr[0] && arr[1] === endArr[1]) return;
  }

  function setPotentialMoves(x = space[0], y = space[1]) {
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

    const potMoves = legalMoves.map((move) => (move = move.potentialMoves));

    return { bundledArray: { currentSpace: [x, y], potMoves } };
  }

  return setPotentialMoves();
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
      boardsPotentialMoves.push(node(space).bundledArray);
    });

    return boardsPotentialMoves;
  }

  const potentialMoves = createPotentialMoves();

  return {
    board,
    potentialMoves: potentialMoves,
  };
}

const ball = gameBoard().potentialMoves;

// can also filter out potential moves that have already been made ? (potentialy overcomplicating this)

/*
what if i had an index of every possible move and just appended the
possible moves to each move
mid ^
i still dont know when to stop generating moves.
because
hm

i need a structure that allows my search algo to come across every space
before it starts fuccin looping
like it cant just start looping
i wish it could go fucking in order dawg

like

check this array for the answer
isnt there?
go one over and keep doing that
like only go one level deep to find potential moves there
then go to the next level.
and so on until u find it

gameboard
children of each move has potential moves



consider generating the dataset before traversing/reading from it.
generate gameboard with potential moves
edit each space and traverse to generate more potential moves.

*/
