function drawFeasibleSet(chart, cost1, cost2, demand, extraConstraints = []) {
  const feasiblePoints = [];
  for (let x = 0; x <= demand; x++) {
    let y = demand - x;
    if (y >= 0) {
      const satisfiesExtra = extraConstraints.every((fn) => fn(x, y));
      if (satisfiesExtra) feasiblePoints.push({ x, y });
    }
  }

  const isoLine = [];
  for (let x = 0; x <= demand; x++) {
    const y = demand - x;
    isoLine.push({ x, y });
  }

  const data = {
    datasets: [
      {
        label: "Feasible Set",
        data: feasiblePoints,
        borderColor: "blue",
        backgroundColor: "rgba(173, 216, 230, 0.5)",
        showLine: false,
        pointRadius: 3,
      },
    ],
  };

  if (chart) chart.destroy();
  return new Chart(document.getElementById("chart").getContext("2d"), {
    type: "scatter",
    data: data,
    options: {
      scales: {
        x: { beginAtZero: true, title: { display: true, text: "Tech 1 (x)" } },
        y: { beginAtZero: true, title: { display: true, text: "Tech 2 (y)" } },
      },
    },
  });
}
