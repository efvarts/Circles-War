var c=document.getElementById("c");
var ctx=c.getContext("2d");

var w=ctx.canvas.width=window.innerWidth;
var h=ctx.canvas.height=window.innerHeight;

const r=(n)=>Math.floor(Math.random()*n);
const health=(x,y)=>{
  ctx.fillStyle="red";
  ctx.fillRect(x-15,y-40,30,20);
};

// health(800,200);

ctx.globalCompositeOperation = "difference";

var l=setInterval(function(){

    var arr = [];
    var iter = 100;

    for (let i = 0; i < iter; i++) {
        ctx.beginPath();

        let o = {
            x: i >= (iter / 2) ? r(w/4) + w * 3/4 : r(w/4),
            y: r(h),
            run: 0,
            rise: 0,
            color: i < iter/2 ? "red" : "blue"
        };

        arr.push(o);
        ctx.arc(arr[i].x, arr[i].y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = arr[i].color;
        ctx.fill();
    }

    for (let i = 0;i < iter/2; i++) {
      arr[i].run = arr[i+iter/2].x - arr[i].x;
      arr[i].rise = arr[i+iter/2].y - arr[i].y;
    }

    var co = 0;
    var divisor = 100;

    var z = setInterval(function() {
        ctx.clearRect(0,0,w,h);

        for (let b = 0; b < iter/2; b++) {
            var q = arr[b].run / divisor;
            var u = arr[b].rise / divisor;

            for (let i = 1; i <= 2; i++) {
                let bool = (i < 2) ? b : b+iter/2;

                arr[bool].x += i < 2 ? q : -q;
                arr[bool].y += i < 2 ? u : -u;

                ctx.beginPath();
                ctx.arc(arr[bool].x, arr[bool].y, 10, 0, 2 * Math.PI);
                ctx.fillStyle = arr[bool].color;
                ctx.fill();
            }

            co++;

            if(co==iter*(divisor/4)){
                clearInterval(z);
            } 
        } 
    },50);

},3000);


// Mke it so when circles meet they do a fight with health and delete losers