import { parseLines } from '../utils/parse';
import { solve } from '../utils/solve';

function part1(_input: string[]) {

 let stackInput = [];

 const index = 0
 while (_input[index] !== '') {
    stackInput.push(_input.shift());
 }

 // remove empty line
  _input.shift();

  const instructions = _input;

  // CBA to parse this lol
  let stack1 = ['G', 'P', 'R', 'N']
  let stack2 = ['H', 'V', 'S', 'C','L','B','J','T']
  let stack3 = ['L', 'N', 'M', 'B','D','T']
  let stack4 = ['B','S','P','V','R']
  let stack5 = ['H', 'V', 'M', 'W', 'S', 'Q','C', 'G' ]
  let stack6 = ['J', 'B', 'D', 'C','S','Q','W']
  let stack7 = ['L', 'Q', 'F']
  let stack8 = ['V', 'F', 'L', 'D', 'T', 'H', 'M', 'W']
  let stack9 = ['F', 'J', 'M', 'V', 'B', 'P', 'L']

  // @ts-ignore
const dock = [
  stack1,
  stack2,
  stack3,
  stack4,
  stack5,
  stack6,
  stack7,
  stack8,
  stack9
]

const parsedInstructions = instructions.map(instruction => {
  const instructionArr = instruction.split(' ');
  return {
    numberToMove: instructionArr[1],
    from: instructionArr[3],
    to: instructionArr[5]
  }
})

console.log(dock)

for(const move of parsedInstructions) {
  // @ts-ignore
  const to = move.to - 1;
  // @ts-ignore
  const from = move.from - 1;
  // @ts-ignore
  for(let i = 0; i < move.numberToMove; i++) {
    // @ts-ignore
    const item = dock[from][0];
    // @ts-ignore
    dock[to].unshift(item);
    // @ts-ignore
    dock[from].shift();
  }
}

console.log(JSON.stringify(dock))





  return 'HBTMTBSDC';
}

function part2(_input: string[]) {

  let stackInput = [];

  const index = 0
  while (_input[index] !== '') {
     stackInput.push(_input.shift());
  }
 
  // remove empty line
   _input.shift();
 
   const instructions = _input;

  //  const instructions = ['move 1 from 2 to 1', 'move 3 from 1 to 3', 'move 2 from 2 to 1', 'move 1 from 1 to 2']
 
   // CBA to parse this lol
   let stack1 = ['G', 'P', 'N', 'R']
   let stack2 = ['H', 'V', 'S', 'C','L','B','J','T']
   let stack3 = ['L', 'N', 'M', 'B','D','T']
   let stack4 = ['B','S','P','V','R']
   let stack5 = ['H', 'V', 'M', 'W', 'S', 'Q','C', 'G' ]
   let stack6 = ['J', 'B', 'D', 'C','S','Q','W']
   let stack7 = ['L', 'Q', 'F']
   let stack8 = ['V', 'F', 'L', 'D', 'T', 'H', 'M', 'W']
   let stack9 = ['F', 'J', 'M', 'V', 'B', 'P', 'L']
 
  //  @ts-ignore
 const dock = [
   stack1,
   stack2,
   stack3,
   stack4,
   stack5,
   stack6,
   stack7,
   stack8,
   stack9
 ]

//  const dock = [
//   ['N', 'Z'],
//   ['D', 'C', 'M'],
//   ['P']
//  ]
 
 const parsedInstructions = instructions.map(instruction => {
   const instructionArr = instruction.split(' ');
   return {
     numberToMove: instructionArr[1],
     from: instructionArr[3],
     to: instructionArr[5]
   }
 })
 
 for(const move of parsedInstructions) {
   // @ts-ignore
   const to = move.to - 1;
   // @ts-ignore
   const from = move.from - 1;

   // @ts-ignore
   const cratesBeingMoved = dock[from].splice(0, move.numberToMove);

    // @ts-ignore
   dock[to] = [...cratesBeingMoved, ...dock[to]];

 }

 console.log(JSON.stringify(dock))

 const answer = dock.map(stack => stack[0]).join('');

  return answer;
}

solve({ part1, part2, parser: parseLines });
