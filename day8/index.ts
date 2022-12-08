import { parseLines } from '../utils/parse';
import { solve } from '../utils/solve';

function isEdge (grid: string[][], x: number, y: number) : boolean {
  // @ts-ignore
  const height = grid.length;
  // @ts-ignore
  const width = grid[0].length;
  return x === 0 || x === width - 1 || y === 0 || y === height - 1;
}

function scanLeft (grid: string[][], x: number, y: number) : {isTreeVisible: boolean, score: number} {
  let isTreeVisible = true;
  let score = 0;
  for(let i = x - 1 ; i >= 0; i--) {
    score++
    // @ts-ignore
    if(grid[y][i] >= grid[y][x]) {
      isTreeVisible =  false
      break;
    }
  }
  return {isTreeVisible, score};
}

function scanRight (grid: string[][], x: number, y: number) : {isTreeVisible: boolean, score: number} {
  let isTreeVisible = true;
  let score = 0;
  // @ts-ignore
  for(let i = x + 1 ; i < grid[y].length; i++) {
    score++
    // @ts-ignore
    if(grid[y][i] >= grid[y][x]) {
      isTreeVisible =  false
      break;
    }
  }
  return {isTreeVisible, score};
}

function scanUp (grid: string[][], x: number, y: number) : {isTreeVisible: boolean, score: number} {
  let isTreeVisible = true;
  let score = 0;
  for(let i = y - 1 ; i >= 0; i--) {
    score++
    // @ts-ignore
    if(grid[i][x] >= grid[y][x]) {
      isTreeVisible =  false
      break;
    }
  }
  return {isTreeVisible, score};
}

function scanDown (grid: string[][], x: number, y: number) : {isTreeVisible: boolean, score: number} {
  let isTreeVisible = true;
  let score = 0;
  // @ts-ignore
  for(let i = y + 1 ; i < grid.length; i++) {
    score++
    // @ts-ignore
    if(grid[i][x] >= grid[y][x]) {
      isTreeVisible =  false
      break;
    }
  }
  return {isTreeVisible, score};
}


function isTreeVisible(grid: string[][], x: number, y: number) : {isTreeVisible: boolean, score: number}{
    
  if(isEdge(grid, x, y)) {
      return {isTreeVisible: true, score: 0};
    }
    let left = scanLeft(grid, x, y);
    let right = scanRight(grid, x, y);
    let up = scanUp(grid, x, y);
    let down = scanDown(grid, x, y);

    return {isTreeVisible: left.isTreeVisible || right.isTreeVisible || up.isTreeVisible || down.isTreeVisible, score : left.score * right.score * up.score * down.score};
}

function part1(_input: string[]) {
  const grid = _input.map((line) => line.split(''));

  // @ts-ignore
  const height = grid.length;
  // @ts-ignore
  const width = grid[0].length;
  let treesVisible: number = 0;

  for(let y = 0; y < height; y++) {
    // @ts-ignore
    for(let x = 0; x < width; x++) {
      // @ts-ignore
      if(isTreeVisible(grid, x, y)) {
        treesVisible++;
      }
    }
  }

  console.log(treesVisible)

  return treesVisible.toString();
}

function part2(_input: string[]) {
  const grid = _input.map((line) => line.split(''));

  // @ts-ignore
  const height = grid.length;
  // @ts-ignore
  const width = grid[0].length;
  let highestScore = 0;

  for(let y = 0; y < height; y++) {
    // @ts-ignore
    for(let x = 0; x < width; x++) {
      // @ts-ignore
      highestScore = Math.max(isTreeVisible(grid, x, y).score, highestScore);
    }
  }


  return highestScore.toString();
}

solve({ part1, part2, parser: parseLines });
