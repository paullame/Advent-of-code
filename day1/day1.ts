function parseLine(line: string): [number, number] {
  const locationIDs = line.split("   ");
  return [parseInt(locationIDs[0], 10), parseInt(locationIDs[1], 10)];
}

function sortList (list: number[][]): number[][] {
  const leftList = list.map((locationIDs) => locationIDs[0]).sort();
  const rightList = list.map((locationIDs) => locationIDs[1]).sort();
  const combinedList: number[][] = [];
  for (let i = 0; i < leftList.length; i++) {
    combinedList.push([leftList[i], rightList[i]]);
  }
  return combinedList;
}

function locationDistance(leftLocation:number, rightLocation:number): number {
  const distance = Math.abs(rightLocation - leftLocation);
  console.log(`distance for ${leftLocation} and ${rightLocation} is ${distance}`);
  return distance
}

const input = await Deno.readTextFile("input.txt");

const locationList = input.split("\n").map(parseLine);
console.log(locationList);

const sortedList = sortList(locationList);

const totalDistance = sortedList
.map((locationIDs) => locationDistance(locationIDs[1], locationIDs[0]))
.reduce((acc, distance) => acc + distance, 0);

console.log(totalDistance);

// -------------------
function leftAndRightList(list: number[][]): [number[], number[]] {
  const leftList = list.map((locationIDs) => locationIDs[0]);
  const rightList = list.map((locationIDs) => locationIDs[1]);
  return [leftList, rightList];
}

function similarity(leftLocation:number, rightList:number[]): number {
  const matches = rightList.filter((rightLocation) => rightLocation === leftLocation);
  const similarityScore = leftLocation * matches.length;
  return similarityScore;
}

const combinedList = leftAndRightList(locationList);

console.log(combinedList);

const totalSimilarity = combinedList[0]
.map((leftLocation) => similarity(leftLocation, combinedList[1]))
.reduce((acc, similarityScore) => acc + similarityScore, 0);

console.log(totalSimilarity);
