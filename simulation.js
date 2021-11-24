const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

function get_random(min, max){
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

class ball {
    constructor(x, y, vx, vy, color, r) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.r = r;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
    update(){
        if ((this.x + this.r) >= width){
            this.vx = -(this.vx* 0.99);
        }
        if ((this.x - this.r) <= 0){
            this.vx = -(this.vx* 0.99);
        }
        if ((this.y + this.r) >= height){
            this.vy = -(this.vy* 0.99);
        }
        if ((this.y - this.r) <= 0){
            this.vy = -(this.vy* 0.99);
        }
        
        this.x += this.vx;
        this.y += this.vy;
    }
    colision(){
        for (let j = 0; j < ball_list.length; j++){
            if (!(this === ball_list[j])){
                const dx = this.x - ball_list[j].x;
                const dy = this.y - ball_list[j].y;
                const ds = Math.sqrt(dx * dx + dy * dy);
                if (ds < this.r + ball_list[j].r){
                    [ball_list[j].vx, this.vx] = [this.vx * 0.99, ball_list[j].vx * 0.99];
                    [ball_list[j].vy, this.vy] = [this.vy * 0.99, ball_list[j].vy * 0.99];
                }
            }
        }
    }
}

function create_ball(num){
    for (let i = 1; i <= num; i++){
        const size = 1.1;
        let b = new ball(
            get_random(0+size, width-size),
            get_random(0+size, height-size),
            get_random(-4, 4), get_random(-4, 4), 
            'rgb(' + get_random(0,255) + ',' + get_random(0,255) + ',' + get_random(0,255) +')',
            size
        );
        ball_list.push(b);
    }
}
    
function loop(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < ball_list.length; i++){
        ball_list[i].draw();
        ball_list[i].update();
        ball_list[i].colision();
    }
    requestAnimationFrame(loop);
    setInterval(1000);
}
var ball_list = [];
function main(){
    var part = document.getElementById('par').value;
    document.getElementById("button").setAttribute("value", "Reload");
    document.getElementById("button").setAttribute( "onClick", "javascript: location.reload();");
    create_ball(part);
    loop();
}
