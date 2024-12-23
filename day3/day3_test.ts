import { assertEquals } from "jsr:@std/assert";
import { example, mulMatcher } from "./day3.ts";

Deno.test("test example", () => {
  const expectedResult = ["mul(2,4)", "mul(5,5)", "mul(11,8)", "mul(8,5)"];
  const validOperations = example.match(mulMatcher);
  assertEquals(validOperations, expectedResult);
});
