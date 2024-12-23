import { assertEquals } from "jsr:@std/assert";
import { example, isSafe } from "./day2.ts";

Deno.test("test analysis", () => {
  const expectedResult = [true, false, false, false, false, true];
  const reports = example.split("\n")
    .map((levels) => levels.split(" "))
    .map((levels) => levels.map((level) => parseInt(level, 10)));
  console.log(reports);
  const analysis = reports.map(isSafe);
  assertEquals(analysis, expectedResult);
});

Deno.test("test summary", () => {
  const expectedResult = 2;
  const analysis = [true, false, false, false, false, true];
  const result = analysis.reduce((acc, isSafe) => acc + (isSafe ? 1 : 0), 0);
});
