// canvas setup
var canvas = document.getElementById('hero-canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// register mouse move event
window.addEventListener('mousemove', mouseMoveEvent);

// mouse position vars
var xPos = 0;
var yPos = 0;
var xOffset = 0;
var yOffset = 0;

// constants
const particleCount = 150;
const points = [];
const particles = [];

/* POINT LOGIC */
function Point(x, y, velX, velY) {
    this.depth = random(100)+10;
    this.x = x-(xOffset*this.depth);
    this.y = y-(yOffset*this.depth);
    this.velX = velX;
    this.velY = velY;
}


Point.prototype = {
    render: function() {
        ctx.beginPath();
        ctx.arc(this.x+(xOffset*this.depth), this.y+(yOffset*this.depth), this.depth/80, 0, 2*Math.PI);
        ctx.fill();
    },
    update: function() {
        this.x += this.velX/10;
        this.y += this.velY/10;
        this.velX /= 1.01;
        this.velY /= 1.01;
        this.depth /= 1.01;
    }
};
/* END OF POINT LOGIC */

/* USEFUL FUNCTIONS */
function random(max) {
    return Math.floor(Math.random() * (max+1));
}

function randomNeg(max) {
    let a = Math.random();
    if (a > 0.5) return Math.floor(Math.random() * -(max+1))-1;
    return Math.floor(Math.random() * (max+1))+1;
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
}

function generatePoints() {
    for(let i=0; i<canvas.width*0.55; i++) {
        let ranX = (random(canvas.width*2)-canvas.width/2);
        let ranY = (random(canvas.height*2)-canvas.height/2);
        let point = new Point(ranX, ranY, 0, 0);
        points[i] = point;
    }
}

/* END OF USEFUL FUNCTIONS*/

// runs every "frame"
function draw() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = "#FFFFFF";
    for (let i=0; i < points.length; i++) {
        points[i].render(xOffset);
    }
    for (let i=0; i < particles.length; i++) {
        particles[i].update();
        particles[i].render(xOffset);
    }
}

// mouse move logic
let counter = 0;
let lastSpawn = new Date().getTime();
function mouseMoveEvent(event) {
    xPos = event.clientX;
    yPos = event.clientY;
    xOffset = ((window.innerWidth/2)-event.clientX)*2/window.innerWidth;
    yOffset = ((window.innerHeight/2)-event.clientY)*2/window.innerHeight;
    if (new Date().getTime() - lastSpawn > 20) {
        let point = new Point(xPos+document.documentElement.scrollLeft, yPos+document.documentElement.scrollTop, randomNeg(1), randomNeg(1));
        particles[(counter++)%particleCount] = point;
        lastSpawn = new Date().getTime();
    }
}

// handle blank space if resized to larger width
window.addEventListener("resize", generatePoints);

/* ON START */
generatePoints(0);
setInterval(draw, 10);

