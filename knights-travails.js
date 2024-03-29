const ChessSpace = (x, y) => {
  const xPos = x;
  const yPos = y;
  let prev = null;
  let distance = 0;
  const name = `${xPos}${yPos}`;
  const viewName = [xPos, yPos];

  const moveOffsets = [
    [1, 2],
    [-1, 2],
    [1, -2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];

  const knightMoves = ([xOffset, yOffset]) => {
    const newX = xPos + xOffset;
    const newY = yPos + yOffset;
    if (newX >= 0 && newY >= 0 && newX <= 7 && newY <= 7) {
      return ChessSpace(newX, newY);
    }
  };
  function knightMoveList() {
    const arr = [];
    for (let i = 0; i < moveOffsets.length; i++) {
      const knightMove = knightMoves([moveOffsets[i][0], moveOffsets[i][1]]);
      arr.push(knightMove);
    }
    return arr;
  }

  return {
    xPos,
    yPos,
    prev,
    knightMoves,
    name,
    viewName,
    knightMoveList,
    distance,
  };
};

function travelHelper(dest) {
  let counter = 0;
  const moveOrderInReverse = [];
  while (dest.prev !== null) {
    moveOrderInReverse.push(dest.prev.viewName);
    counter += 1;
    dest.prev = dest.prev.prev;
  }
  console.log(`You made it in ${counter} moves! Here's your path:`);
  for (let i = moveOrderInReverse.length - 1; i >= 0; i--) {
    console.log(moveOrderInReverse[i]);
  }
  console.log(dest.viewName);
}

function knightsTravails([startX, startY], [endX, endY]) {
  if (
    startX > 7 ||
    startY > 7 ||
    endX > 7 ||
    endY > 7 ||
    startX < 0 ||
    startY < 0 ||
    endX < 0 ||
    endY < 0
  ) {
    throw new Error("Values cannot be greater than 7 or less than 0");
  }

  const starting = ChessSpace(startX, startY);

  const queue = [starting];
  const storage = new Map();
  let distCounter = 0;
  queue[0].distance = 0;

  while (queue.length !== 0) {
    let shifted = queue.shift();

    const moveList = shifted.knightMoveList();
    distCounter++;

    if (queue.length === 1) {
      distCounter = 0;
    }

    for (let i = 0; i < moveList.length; i++) {
      if (moveList[i] === undefined) continue;
      moveList[i].distance = distCounter;
      moveList[i].prev = shifted;
      moveList[i].traveled = true;
      if (moveList[i].xPos === endX && moveList[i].yPos === endY) {
        return travelHelper(moveList[i]);
      }
      storage.set(moveList[i].name, moveList[i]);
      queue.push(moveList[i]);
    }
    if (storage.size === 64) break;
  }
}

knightsTravails([0, 0], [7, 7]);
