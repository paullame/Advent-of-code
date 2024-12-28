const examplePageOrderingRules = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13`;

const exampleUpdates = `75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

function parsePageOrderingRules(pageOrderingRules: string): number[][] {
  return pageOrderingRules.split("\n").map((line) => {
    return line.split("|").map((num) => parseInt(num));
  });
}

function parseUpdates(updates: string): number[][] {
  return updates.split("\n").map((line) => {
    return line.split(",").map((num) => parseInt(num));
  });
}

function computePageOrder(
  groupedDependencies: [number, number[]][],
): number[] {
  return groupedDependencies.sort((a, b) => a[1].length - b[1].length)
    .reverse().map(([key]) => key);
}

function groupDependencies(rules: number[][]): [number, number[]][] {
  const groupedDependencies = rules.map((orderingRule, _, rules) => {
    const filter = rules.filter((orderRule) =>
      orderRule[0] === orderingRule[0]
    );
    console.log("filter", filter);
    const reduce = filter.reduce((acc, [key, value]) => {
      if (acc[0] === 0) {
        acc[0] = key;
        acc[1] = [];
      }
      acc[1].push(value);
      return acc;
    }, [0, []] as [number, number[]]);
    console.log("reduce", reduce);
    return reduce;
  });
  // Remove duplicates by key
  const uniqueDependenciesMap = new Map<number, Set<number>>();
  for (const [key, values] of groupedDependencies) {
    if (!uniqueDependenciesMap.has(key)) {
      uniqueDependenciesMap.set(key, new Set(values));
    } else {
      const existingValues = uniqueDependenciesMap.get(key)!;
      values.forEach((value) => existingValues.add(value));
    }
  }

  // Convert Map to array
  const uniqueDependencies = Array.from(uniqueDependenciesMap.entries()).map(
    ([key, valuesSet]) => [key, Array.from(valuesSet)] as [number, number[]],
  );

  return uniqueDependencies;
}

function getValidUpdates(updates: number[][], pageOrder: number[]): number[][] {
  return updates.filter((update) => {
    return update.every((page) => pageOrder.includes(page));
  });
}

const pageOrderingRules = parsePageOrderingRules(examplePageOrderingRules);
console.log(pageOrderingRules);

const groupedDependencies = groupDependencies(pageOrderingRules);
console.log(groupedDependencies);

const pageOrder = computePageOrder(groupedDependencies);
console.log("pageOrder", pageOrder);

const updates = parseUpdates(exampleUpdates);
console.log(updates);
