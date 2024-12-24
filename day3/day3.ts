export const example =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

export const example2 =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

export const input = await Deno.readTextFile("input.txt");

export const mulMatcher = new RegExp(
  /do\(\)|don't\(\)|mul\(([0-9]{1,3}),([0-9]{1,3})\)/g,
);
export const digitExtractor = new RegExp(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/);

// take a mul operation (ex: mul(5,5)) and returns the result of the operation
function evaluateInstruction(mulOperation: string): number {
  let result = 0;
  const [_, a, b] = digitExtractor.exec(mulOperation) || [];
  console.log("digits", a, b);
  if (a && b) {
    result = parseInt(a, 10) * parseInt(b, 10);
  }
  return result;
}
// sélectionner uniquement les opérations sur des plages valides d'index
// une plage valide commencen par un do() et se termine par un don't()
// pour chaque don't parcourir la liste des do pour trouver le prochain do qui suit.
// noter l'index du do et du don't et donc plage non valide
function findInvalidRanges(operationList: string[]): number[][] {
  const dontIndices: number[] = [];
  const doIndices: number[] = [];
  operationList.forEach((operation, index) => {
    if (operation === "don't()") {
      dontIndices.push(index);
    } else if (operation === "do()") {
      doIndices.push(index);
    }
  });
  console.log("don't indices", dontIndices);
  console.log("do indices", doIndices);

  const invalidRange: number[][] = [];
  dontIndices.forEach((dontIndex) => {
    const nextDo = doIndices.find((doIndex) => doIndex > dontIndex);
    if (nextDo) {
      invalidRange.push([dontIndex, nextDo]);
    }
  });
  console.log("invalid range", invalidRange);

  return invalidRange;
}

function invalidRangeToIndices(invalidRange: number[][]): number[] {
  const indices: number[] = [];
  invalidRange.forEach(([start, end]) => {
    for (let i = start; i < end; i++) {
      indices.push(i);
    }
  });
  return indices;
}

// filtrer les opérations qui sont dans des plages invalides
// convert ranges to list of valid indices
function filterOperations(operations: string[]): string[] {
  const invalidRanges = findInvalidRanges(operations);
  const invalidIndices = invalidRangeToIndices(invalidRanges);
  const doOperations = operations.filter((_, index) =>
    !invalidIndices.includes(index)
  );
  const validOperations = doOperations.filter((operation) =>
    operation !== "do()"
  );
  console.log(validOperations);
  return validOperations;
}

const operations = input.match(mulMatcher) || [];
console.log(operations);

const validOperations = filterOperations(operations);
console.log(validOperations);

const results = validOperations.map(evaluateInstruction);
console.log(results);

const result = results.reduce((acc, value) => acc + value, 0);
console.log(result);
