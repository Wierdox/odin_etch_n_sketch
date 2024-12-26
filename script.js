let grid_side_length = 32;
const button = document.getElementById("button");

document.addEventListener("DOMContentLoaded", createGrid);
button  .addEventListener("click", () => {
    while (1) {
        let message = prompt("Enter a grid size, options are:\n1, 2, 4, 8, 16, 32, 64, 128.");
        if (message == "" || message == null) return;

        if (+message <= 128 && is_power_of_2(+message)) {
            document.querySelector("span").innerText = message + "x" + message;
            grid_side_length = +message;
            createGrid();
            break;
        }
    }
});

function createGrid() {
    document.documentElement.style.setProperty("--percent_size", `${(100.0 / grid_side_length)}%`);
    let container = document.getElementById("container");

    { // Delete container and replace it instead of deleting all child blocks, way faster.
        document.body.removeChild(container);
        container = document.createElement("span");
        container.id = "container";
        document.body.appendChild(container);

        container.addEventListener("mouseover", enteredBlock);
    }

    for (let i = 0; i < grid_side_length; i++) {
        for (let j = 0; j < grid_side_length; j++) {
            let block = document.createElement("div");

            let g = map(i, 0, grid_side_length, 0, 256).toString(16);
            let b = map(j, 0, grid_side_length, 0, 256).toString(16);
            if (g.length == 1) g = "0" + g;
            if (b.length == 1) b = "0" + b;
            block.style.backgroundColor = `#44${g}${b}`;
            block.style.opacity = .85;

            container.appendChild(block);
        }
    }
}

function enteredBlock(event) {
    let target = event.target;

    let opacity = parseFloat(target.style.opacity);
    if (opacity == 1.0) return;
    opacity += .05;
    target.style.opacity = opacity;

    target.style.backgroundColor = "black";
}

function clamp(input, min, max) {
    return input < min ? min : input > max ? max : input;
}
  
function map(current, in_min, in_max, out_min, out_max) {
    let mapped = ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    return clamp(mapped, out_min, out_max);
}

function is_power_of_2(n) {
     return (n > 0 && Math.log2(n) % 1 === 0);
}