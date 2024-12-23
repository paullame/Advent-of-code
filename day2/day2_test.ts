import { assertEquals } from "jsr:@std/assert";
import { assessReport, example, isSafe, problemDampener } from "./day2.ts";

Deno.test("test analysis", () => {
  const expectedResult = [true, false, false, false, false, true];
  const reports = example.split("\n")
    .map((levels) => levels.split(" "))
    .map((levels) => levels.map((level) => parseInt(level, 10)));
  console.log(reports);
  const analysis = reports.map(isSafe);
  assertEquals(analysis, expectedResult);
});

Deno.test("test analysis with problem dampener", () => {
  const expectedResult = [true, false, false, true, true, true];
  const reports = example.split("\n")
    .map((levels) => levels.split(" "))
    .map((levels) => levels.map((level) => parseInt(level, 10)));
  console.log(reports);
  const analysis = reports.map(assessReport);
  assertEquals(analysis, expectedResult);
});

Deno.test("test summary", () => {
  const expectedResult = 2;
  const analysis = [true, false, false, false, false, true];
  const result = analysis.reduce((acc, isSafe) => acc + (isSafe ? 1 : 0), 0);
  assertEquals(result, expectedResult);
});

Deno.test("test problem dampener", () => {
  const expectedResult = true;
  const report = [1, 3, 2, 4, 5];
  const result = problemDampener(report);
  assertEquals(result, expectedResult);
});
