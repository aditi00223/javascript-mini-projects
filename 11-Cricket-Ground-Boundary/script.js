const ball = document.getElementById("ball");
const result = document.getElementById("result");

const shots = [
    {x:50,y:40,run:"🏏 1 Run"},
    {x:420,y:80,run:"🏏 2 Runs"},
    {x:80,y:120,run:"🏏 3 Runs"},
    {x:460,y:20,run:"🎉 FOUR!"},
    {x:250,y:10,run:"🔥 SIX!!"}
];

function hitBall(){

const shot = shots[Math.floor(Math.random()*shots.length)];

ball.style.left = shot.x+"px";

ball.style.top = shot.y+"px";

result.innerHTML = shot.run;

setTimeout(()=>{

ball.style.left="50%";
ball.style.bottom="120px";
ball.style.top="";

},1200);

}