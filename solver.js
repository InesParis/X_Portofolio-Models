function solveMinCost(cost1, cost2, demand, xMax, yMax, constraints = []) {
  let best = { cost: Infinity, x: 0, y: 0 };

  for (let x = 0; x <= xMax; x++) {
    for (let y = 0; y <= yMax; y++) {
      if (x + y >= demand) {
        let feasible = constraints.every((fn) => fn(x, y));
        if (feasible) {
          let totalCost = cost1 * x + cost2 * y;
          if (totalCost < best.cost) {
            best = { cost: totalCost, x, y };
          }
        }
      }
    }
  }

  return best;
}
