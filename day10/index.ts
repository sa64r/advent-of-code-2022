import { parseLines } from '../utils/parse';
import { solve } from '../utils/solve';

function isKeyCycle(cycleCount: number) {
  const keyCycleCounts = [20, 60, 100, 140, 180, 220]
  return keyCycleCounts.includes(cycleCount);
}

function part1(_input: string[]) {

  let cycleCount = 1;
  let xRegister = 1;
  let buffer = [0];
  const instructions = _input.map((i) => i.split(' '));

  let sumOfSignals = 0;

  while (buffer.length) {
    const val: number = buffer.shift() as number;

    // @ts-ignore
    const instruction = instructions.shift();
    const op = instruction?.[0];
    const arg = instruction?.[1];

    if(_input.length) {
      switch (op) {
        case 'addx':{
          buffer.push(0, parseInt(arg as string));
          break;
        }
        case 'noop': buffer.push(0); break;
      }
    }
    xRegister += val;

    if(isKeyCycle(cycleCount)) {
      sumOfSignals += xRegister * cycleCount;
    }

    cycleCount++;
  }

  console.log('sumOfSignals', sumOfSignals);


return sumOfSignals.toString();

}

function part2(_input: string[]) {

  let cycleCount = 1;
  let xRegister = 1;
  const cols = 40;
  const rows = 6;
  const numOfPixels = cols * rows;
  const display = new Array(numOfPixels).fill('.');

  let buffer = [0];
  const instructions = _input.map((i) => i.split(' '));

  // let sumOfSignals = 0;

  while (buffer.length) {
    const val: number = buffer.shift() as number;

    // @ts-ignore
    const instruction = instructions.shift();
    const op = instruction?.[0];
    const arg = instruction?.[1];

    if(_input.length) {
      switch (op) {
        case 'addx':{
          buffer.push(0, parseInt(arg as string));
          break;
        }
        case 'noop': buffer.push(0); break;
      }
    }
    xRegister += val;

    if(isKeyCycle(cycleCount)) {
      // sumOfSignals += xRegister * cycleCount;
    }

    if(
      (cycleCount -1 ) % cols === xRegister - 1 ||
      (cycleCount -1 ) % cols === xRegister ||
      (cycleCount -1 ) % cols === xRegister + 1
    )
    {
      display[cycleCount -1 ] = '#';
    }

    cycleCount++;
  }

  const showDisplay = () =>
    // @ts-ignore
    Array.from({ length: cols }, (v, i) =>
    display.slice(i * cols, i * cols + cols).join("")
    );

  showDisplay().map((row) => console.log(row));


  return 'part2';
}

solve({ part1, part2, parser: parseLines });
