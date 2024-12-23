function parseReports(input: string): number[][] {
  const reports = input.split("\n")
    .map((levels) => levels.split(" "))
    .map((levels) => levels.map((level) => parseInt(level, 10)));
  console.log(reports);
  return reports;
}

function createTuple(report: number[]): number[][] {
  const reportTuples: number[][] = [];
  for (let i = 0; i < report.length - 1; i++) {
    const tuple = [report[i], report[i + 1]];
    reportTuples.push(tuple);
  }
  console.log(reportTuples);
  return reportTuples;
}

// je check que chaque tuple est en valeur absolu compris entre 1 et 3 inclus
// ensuite, je vérifie que chaque tuple est du même signe
export function isSafe(report: number[]): boolean {
  const reportTuples = createTuple(report);
  const diffs = reportTuples.map((tuple) => tuple[1] - tuple[0]);
  console.log(diffs);

  const adjacent = diffs
    .map((diff) => Math.abs(diff))
    .filter((diff) => diff > 3 || diff < 1)
    .length === 0;
  const continuous = diffs
        .filter((diff) => diff > 0)
        .length === diffs.length ||
    diffs.filter((diff) => diff < 0).length === diffs.length;
  console.log(
    `report is adjacent:${adjacent} & continuous:${continuous} so it is ${
      adjacent && continuous ? "safe" : "unsafe"
    }`,
  );

  return adjacent && continuous;
}

export const example = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const input = await Deno.readTextFile("input.txt");

const reports = parseReports(input);

const analysis = reports.map(isSafe);
console.log(analysis);

const result = analysis.reduce((acc, isSafe) => acc + (isSafe ? 1 : 0), 0);
console.log(result);
