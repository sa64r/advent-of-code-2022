import { parseLines } from '../utils/parse';
import { solve } from '../utils/solve';

function part1(_input: string[]) {
  const input = _input[0];
  // @ts-ignore
  const inputArr = input.split('');

  // return index+1 of first letter that doesn't repeat in last 4 elements
  // @ts-ignore
  let answer = 0;
  for(let i = 0; i < inputArr.length -4; i++) {
    const code = inputArr.slice(i, i+4);
    // check if code has all unique elements
    const unique = new Set(code);
    if(unique.size !== code.length) {
      continue;
    }else{
      answer = i+4;
      break
    }
  }

  console.log(answer);


  return answer.toString(); 
}

function part2(_input: string[]) {
  const input = _input[0];
  // @ts-ignore
  const inputArr = input.split('');

  // return index+1 of first letter that doesn't repeat in last 4 elements
  // @ts-ignore
  let answer = 0;
  for(let i = 0; i < inputArr.length -14; i++) {
    const code = inputArr.slice(i, i+14);
    // check if code has all unique elements
    const unique = new Set(code);
    if(unique.size !== code.length) {
      continue;
    }else{
      answer = i+14;
      break
    }
  }

  console.log(answer);


  return answer.toString(); 
}

solve({ part1, part2, parser: parseLines });
