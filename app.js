
"use strict";

function addNumbers() {
    const firstRaw = document.getElementById("firstNumber").value.trim();
    const secondRaw = document.getElementById("secondNumber").value.trim();
    const totalLine = document.getElementById("totalLine");

    // Check empty field
    if(firstRaw == "" || secondRaw == "") {
        totalLine.textContent = "Enter a number in both fields.";
        totalLine.className = "error";
        return;
    }

    const first = Number(firstRaw);
    const second = Number(secondRaw);

    // Check not number
    if(isNaN(first) || isNaN(second)) {
        totalLine.textContent = "Both entries must be numbers.";
        totalLine.className = "error";
        return;
    }

    totalLine.textContent = "Total = " + (first + second);
    totalLine.className = "";
    return;
}

document.getElementById("addButton").addEventListener("click", addNumbers);