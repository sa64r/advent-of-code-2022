import { parseLines } from '../utils/parse';
import { solve } from '../utils/solve';

function isTailClose (xHead: number, yHead: number, xTail: number, yTail: number) : boolean {
  if(xHead === xTail && yHead === yTail) {
    return true;
  }
  if(xHead === xTail && yHead === yTail + 1) {
    return true;
  }
  if(xHead === xTail && yHead === yTail - 1) {
    return true;
  }
  if(xHead === xTail + 1 && yHead === yTail) {
    return true;
  }
  if(xHead === xTail - 1 && yHead === yTail) {
    return true;
  }
  // diagonally close
  if(xHead === xTail + 1 && yHead === yTail + 1) {
    return true;
  }
  if(xHead === xTail - 1 && yHead === yTail + 1) {
    return true;
  }
  if(xHead === xTail + 1 && yHead === yTail - 1) {
    return true;
  }
  if(xHead === xTail - 1 && yHead === yTail - 1) {
    return true;
  }
  return false;
}

function moveUp (x: number, y: number) : [number, number] {
  return [x, y + 1];
}
function moveDown (x: number, y: number) : [number, number] {
  return [x, y - 1];
}
function moveLeft (x: number, y: number) : [number, number] {
  return [x - 1, y];
}
function moveRight (x: number, y: number) : [number, number] {
  return [x + 1, y];
}


function parseCommands (input: string[]) : {direction : string, steps: number}[] {
  // @ts-ignore
  return input.map((line) => {
    const [direction, steps] = line.split(' ');
    // @ts-ignore
    return {direction, steps: parseInt(steps)};
  });
}

function part1(_input: string[]) {
  const commands = parseCommands(_input);
  let [xHead, yHead] = [0, 0];
  let [xTail, yTail] = [0, 0];
  const tailVisited = new Set<string>();

  tailVisited.add(`${xTail},${yTail}`);

  for(let command of commands) {
    const {direction, steps} = command;
    for(let i = 0; i < steps; i++) {
      let headStart = [xHead, yHead];
      if(direction === 'U') {
        [xHead, yHead] = moveUp(xHead, yHead);
      } else if(direction === 'D') {
        [xHead, yHead] = moveDown(xHead, yHead);
      } else if(direction === 'L') {
        [xHead, yHead] = moveLeft(xHead, yHead);
      } else if(direction === 'R') {
        [xHead, yHead] = moveRight(xHead, yHead);
      }
      if(!isTailClose(xHead, yHead, xTail, yTail)) {
        // @ts-ignore
        [xTail, yTail] = headStart;
      }
      tailVisited.add(`${xTail},${yTail}`);
    }
  }

  return tailVisited.size.toString();
}

function moveHead (position: {x: number, y: number}, direction: string) : {x: number, y: number } {

    let {x, y} = position;

    if(direction === 'U') {
      y = y + 1;
    }
    if(direction === 'D') {
      y = y - 1;
    }
    if(direction === 'L') {
      x = x - 1;
    }
    if(direction === 'R') {
      x = x + 1;
    }
    return {x, y};

}

function moveKnot(currentKnot :{x: number, y: number}, nextKnot: {x: number, y: number}) {
  let newCoords = { ...nextKnot };
  let dx = nextKnot.x - currentKnot.x;
  let dy = nextKnot.y - currentKnot.y;

  if (dx > 0) newCoords.x--;
  else if (dx < 0) newCoords.x++;
  if (dy > 0) newCoords.y--;
  else if (dy < 0) newCoords.y++;

  return newCoords;
}

function part2(_input: string[]) {
  const numberOfKnots = 10;
  const rope = new Array(numberOfKnots).fill({x: 0, y: 0});
  const commands = parseCommands(_input);
  const tailVisited = new Set<string>();

  for(let command of commands) {
    const {direction, steps} = command;
    for(let i = 0; i < steps; i++) {
      rope[0] = moveHead(rope[0], direction);

      for(let j = 1; j < numberOfKnots; j++) {
        if(!isTailClose(rope[j-1].x, rope[j-1].y, rope[j].x, rope[j].y)) {
          rope[j] = moveKnot(rope[j-1], rope[j])
        }
      }

      tailVisited.add(`${rope[numberOfKnots - 1].x},${rope[numberOfKnots - 1].y}`);
    }
  }

  return tailVisited.size.toString();
}

solve({ part1, part2, parser: parseLines });
