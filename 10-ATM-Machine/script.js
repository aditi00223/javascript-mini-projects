let balance = 5000;

const balanceText = document.getElementById("balance");
const message = document.getElementById("message");

function deposit(){

const amount = Number(document.getElementById("amount").value);

if(amount<=0){

message.innerHTML="Enter a valid amount";

message.style.color="red";

return;

}

balance += amount;

balanceText.innerHTML = balance;

message.innerHTML="₹"+amount+" deposited successfully";

message.style.color="lime";

document.getElementById("amount").value="";

}

function withdraw(){

const amount = Number(document.getElementById("amount").value);

if(amount<=0){

message.innerHTML="Enter a valid amount";

message.style.color="red";

return;

}

if(amount>balance){

message.innerHTML="Insufficient Balance";

message.style.color="red";

return;

}

balance -= amount;

balanceText.innerHTML=balance;

message.innerHTML="₹"+amount+" withdrawn successfully";

message.style.color="lime";

document.getElementById("amount").value="";

}