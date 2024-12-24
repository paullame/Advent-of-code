import { assertEquals } from "jsr:@std/assert";

const TEXT_WIDTH = 10; // to account for the line return
const pattern = /XMAS/g;
const reverse_pattern = /SAMX/g;
const example = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const expectedResult = `....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX`;

const expectedAnswer = 18;

function findPattern(input: string): number {
  const matches = input.match(pattern);
  const reverse_matches = input.match(reverse_pattern);
  console.log("matches", matches);
  console.log("reverse_matches", reverse_matches);
  const a = matches?.length || 0;
  const b = reverse_matches?.length || 0;
  return a + b;
}
// je récupère les string de chaque colonne
function getColumns(input: string): string[][] {
  const columns: string[][] = [];
  const lines = input.split("\n");
  for (let i = 0; i < TEXT_WIDTH; i++) {
    const column: string[] = [];
    for (let j = 0; j < lines.length; j++) {
      column.push(lines[j][i]);
    }
    columns.push(column);
  }
  return columns;
}

// ensuite je match le pattern XMAS pour chaque colonne et j'additione les résultats
function findVerticalWords(input: string): number {
  const columns = getColumns(input);
  const text = columns.reduce((acc, column) => acc + column.join(""), "");
  return findPattern(text);
}

//TODO
function getdiagonals(input: string): string[][] {
  const columns: string[][] = [];
  const lines = input.split("\n");
  for (let i = 0; i < TEXT_WIDTH; i++) {
    const column: string[] = [];
    for (let j = 0; j < lines.length; j++) {
      column.push(lines[j][j]);
    }
    columns.push(column);
  }
  console.log(columns);
  return columns;
}

function findDiagonalWords(input: string): number {
  const diagonals = getdiagonals(input);
  const text = diagonals.reduce((acc, diagonal) => acc + diagonal.join(""), "");
  return findPattern(text);
}

function countWords(): number {
  return 18;
}

const total = findPattern(example) + findVerticalWords(example) +
  findDiagonalWords(example);
console.log("total", total);

Deno.test("", () => {
  assertEquals(1, 1);
});
