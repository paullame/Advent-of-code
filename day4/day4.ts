const TEXT_WIDTH = 140; // to account for the line return
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

// horizontal : 5
// vertical: 3
// diagonal :

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
  //console.log("matches", matches);
  //console.log("reverse_matches", reverse_matches);
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
  let total = 0;
  const charColumns = getColumns(input);
  const columns = charColumns.map((column) => column.join(""));
  for (const column of columns) {
    total += findPattern(column);
  }
  return total;
}

//TODO
function getdiagonals(input: string): string[][] {
  const diagonals: string[][] = [];
  const lines = input.split("\n");
  const size = lines.length;

  for (let k = 0; k < size * 2 - 1; k++) {
    const diagonal: string[] = [];
    for (let y = 0; y <= k; y++) {
      const x = k - y;
      if (x < size && y < size) {
        diagonal.push(lines[y][x]);
      }
    }
    diagonals.push(diagonal);
  }

  // Collect diagonals from top-right to bottom-left
  for (let k = 0; k < size * 2 - 1; k++) {
    const diagonal: string[] = [];
    for (let y = 0; y <= k; y++) {
      const x = size - 1 - k + y;
      if (x >= 0 && x < size && y < size) {
        diagonal.push(lines[y][x]);
      }
    }
    diagonals.push(diagonal);
  }
  //console.log("diagonals", diagonals);
  return diagonals;
}

function findDiagonalWords(input: string): number {
  let total = 0;
  const charDiagonals = getdiagonals(input);
  const diagonals = charDiagonals.map((diagonal) => diagonal.join(""));
  for (const diagonal of diagonals) {
    total += findPattern(diagonal);
  }
  return total;
}

function getTotal(input: string): number {
  return findPattern(input) + findVerticalWords(input) +
    findDiagonalWords(input);
}

const input = await Deno.readTextFile("input.txt");

const total = getTotal(input);
console.log("total", total);
