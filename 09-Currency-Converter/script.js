const result = document.getElementById("result");

async function convertCurrency(){

const amount = document.getElementById("amount").value;

const from = document.getElementById("fromCurrency").value;

const to = document.getElementById("toCurrency").value;

if(amount==""){

alert("Enter amount");

return;

}

const url=`https://open.er-api.com/v6/latest/${from}`;

const response=await fetch(url);

const data=await response.json();

const rate=data.rates[to];

const converted=(amount*rate).toFixed(2);

result.innerHTML=`${amount} ${from} = ${converted} ${to}`;

}