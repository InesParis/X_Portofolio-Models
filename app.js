let currentChart = null;

function updateSimulation() {
  const cost1 = parseFloat(document.getElementById("cost1").value);
  const cost2 = parseFloat(document.getElementById("cost2").value);
  let demand = parseFloat(document.getElementById("demand").value);

  // Ensure demand is at least 100
  if (demand < 100) {
    demand = 100;
    document.getElementById("demand").value = 100; // Update the input field
  }

  const exercise = document.getElementById("exercise").value;

  let constraints = [];

  if (exercise === "2") {
    const cap = parseFloat(document.getElementById("capacity").value);
    constraints.push((x, y) => x + y <= cap);
  }

  if (exercise === "3") {
    const cap = parseFloat(document.getElementById("emissions").value);
    constraints.push((x, y) => 2 * x + 5 * y <= cap);
  }

  const solution = solveMinCost(
    cost1,
    cost2,
    demand,
    demand,
    demand,
    constraints
  );

  currentChart = drawFeasibleSet(
    currentChart,
    cost1,
    cost2,
    demand,
    constraints,
    solution
  );

  const output = document.getElementById("output");
  output.innerHTML = `Optimal Solution: x = ${solution.x}, y = ${solution.y}, Cost = ${solution.cost}`;
}

function switchExercise() {
  const ex = document.getElementById("exercise").value;
  const extra = document.getElementById("extraInputs");
  extra.innerHTML = "";

  if (ex === "2") {
    extra.innerHTML = `<label>Capacity: <input type="number" id="capacity" value="150" /></label>`;
  } else if (ex === "3") {
    extra.innerHTML = `<label>Emissions Cap: <input type="number" id="emissions" value="300" /></label>`;
  }

  updateSimulation();
}

// Initialize default
document.addEventListener("DOMContentLoaded", updateSimulation);
