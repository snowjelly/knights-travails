const Board = (x, y) => {
  const xPos = x;
  const yPos = y;
  let prev = null;

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
      return Board(newX, newY);
    }
  };
};
