const qrText = document.getElementById("qrText");

const qrImage = document.getElementById("qrImage");

const imgBox = document.getElementById("imgBox");

function generateQR(){

if(qrText.value===""){

alert("Please enter text or URL");

return;

}

const url =
`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrText.value)}`;

qrImage.src = url;

imgBox.style.display="block";

}

function downloadQR(){

if(qrImage.src===""){

alert("Generate QR first");

return;

}

const link=document.createElement("a");

link.href=qrImage.src;

link.download="QRCode.png";

link.click();

}