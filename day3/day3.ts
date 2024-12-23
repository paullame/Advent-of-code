export const example =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

export const input = await Deno.readTextFile("input.txt");

export const mulMatcher = new RegExp(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/g);
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

const validOperations = input.match(mulMatcher) || [];
console.log(validOperations);

const results = validOperations.map(evaluateInstruction);
console.log(results);

const result = results.reduce((acc, value) => acc + value, 0);
console.log(result);
