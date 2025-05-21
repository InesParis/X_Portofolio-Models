function drawFeasibleSet(
  chart,
  cost1,
  cost2,
  demand,
  extraConstraints = [],
  solution = null
) {
  const feasiblePoints = [];

  for (let x = 0; x <= demand; x++) {
    let y = demand - x;
    if (y >= 0 && extraConstraints.every((fn) => fn(x, y))) {
      feasiblePoints.push({ x, y });
    }
  }

  // Iso-cost lines: pick arbitrary cost levels based on the solution cost
  const isoLines = [];
  const levels = [solution.cost - 20, solution.cost, solution.cost + 20];
  for (const C of levels) {
    const line = [];
    for (let x = 0; x <= demand; x++) {
      const y = (C - cost1 * x) / cost2;
      if (y >= 0 && y <= demand) {
        line.push({ x, y });
      }
    }
    isoLines.push({
      label: `Cost = ${C.toFixed(2)}`,
      data: line,
      borderColor: C === solution.cost ? "red" : "gray",
      borderDash: C === solution.cost ? [] : [5, 5],
      fill: false,
      showLine: true,
      pointRadius: 0,
    });
  }

  // Optimal point
  const optimalPoint = {
    label: "Optimal Solution",
    data: [{ x: solution.x, y: solution.y }],
    backgroundColor: "green",
    pointRadius: 6,
    pointStyle: "rectRot",
    showLine: false,
  };

  const datasets = [
    {
      label: "Feasible Set",
      data: feasiblePoints,
      backgroundColor: "rgba(173, 216, 230, 0.5)",
      pointRadius: 3,
      showLine: false,
    },
    ...isoLines,
    optimalPoint,
  ];

  if (chart) chart.destroy();
  return new Chart(document.getElementById("chart").getContext("2d"), {
    type: "scatter",
    data: { datasets },
    options: {
      scales: {
        x: { beginAtZero: true, title: { display: true, text: "Tech 1 (x)" } },
        y: { beginAtZero: true, title: { display: true, text: "Tech 2 (y)" } },
      },
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true },
      },
    },
  });
}
