import { parseLines } from '../utils/parse';
import { solve } from '../utils/solve';

function part1(_input: string[]) {

  let totalFullyContains = 0

  for(const pair of _input){
    const [range1, range2] = pair.split(',');

    console.log(range1, range2)

    // @ts-ignore
    let [min1, max1] = range1?.split('-');
    min1  = parseInt(min1);
    max1 = parseInt(max1);
    // @ts-ignore
    let [min2, max2] = range2?.split('-');
    min2 = parseInt(min2);
    max2 = parseInt(max2);

    if(min1 <= min2 && max1 >= max2){
      totalFullyContains++
    }else if(min2 <= min1 && max2 >= max1){
      totalFullyContains++
    }

  }

  return totalFullyContains.toString();
}

function part2(_input: string[]) {
  let totalOverlaps = 0

  for(const pair of _input){
    const [range1, range2] = pair.split(',');
    // @ts-ignore
    let [min1, max1] = range1?.split('-');
    min1  = parseInt(min1);
    max1 = parseInt(max1);
    // @ts-ignore
    let [min2, max2] = range2?.split('-');
    min2 = parseInt(min2);
    max2 = parseInt(max2);

    if(min1 <= min2 && max1 >= max2){
      totalOverlaps++
    }else if(min2 <= min1 && max2 >= max1){
      totalOverlaps++
    }else if(max1 >= min2 && min1 < max2){
      totalOverlaps++
    }else if(max2 >= min1 && min2 < max1){
      totalOverlaps++
    }
  }

  return totalOverlaps.toString();
}

solve({ part1, part2, parser: parseLines });
