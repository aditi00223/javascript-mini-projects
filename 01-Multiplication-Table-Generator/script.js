function generateTable() {

    let number = document.getElementById("number").value;

    let result = document.getElementById("result");

    if (number === "") {

        result.innerHTML = "<p style='color:#f87171;'>Please enter a number.</p>";
        return;

    }

    let table = "";

    for (let i = 1; i <= 10; i++) {

        table += `${number} × ${i} = ${number * i}<br>`;

    }

    result.innerHTML = table;

}