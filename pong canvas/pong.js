var upPressed;
var downPressed;
const canvas = document.getElementById("test");
const ctx = canvas.getContext('2d');
var ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    speed: 10,
    velocity_x: -10,
    velocity_y: 0,
    radius: 8
}

var comp_paddle = {
    x: canvas.width - 10 - (10),
    y: (canvas.height / 2) - (100 / 2),
    speed: 30,
    width: 10,
    height: 100,
    score: 0
}

var user_paddle = {
    x: 10,
    y: canvas.height / 2 - (100 / 2),
    speed: 30,
    width: 10,
    height: 100,
    score: 0
}

function keyDownHandler(e) {
    switch (e.keyCode) {
        case 87:
            upPressed = true;
            break;
        case 83:
            downPressed = true;
            break;
    }
}

function keyUpHandler(e) {
    switch (e.keyCode) {
        case 87:
            upPressed = false;
            break;
        case 83:
            downPressed = false;
            break;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function drawBall() {
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}
function drawCenterLine() {
    for (var i = -45; i < canvas.height; i += 60) {
        drawRect(canvas.width / 2 - 2, i, 4, 30, "#FFF")
    }
}
function isBallonScreen() {
    if (ball.x - 10 > canvas.width || ball.x + 10 < 0) {
        if (ball.x - 10 > canvas.width) {
            user_paddle.score++;
        }
        if (ball.x + 10 < 0) {
            comp_paddle.score++;
        }

        ball = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            speed: 10,
            velocity_x: ball.velocity_x,
            velocity_y: 0,
            radius: 8
        }


    }

}

function collision(paddle) {
    var b = {};
    var p = {};
    b.top_y = ball.y - ball.radius;
    b.bottom_y = ball.y + ball.radius
    b.left_x = ball.x - ball.radius
    b.right_x = ball.x + ball.radius

    p.top_y = paddle.y
    p.bottom_y = paddle.y + paddle.height
    p.left_x = paddle.x
    p.right_x = paddle.x + paddle.width

    if ((p.left_x <= b.right_x) && (p.right_x >= b.left_x) && (p.top_y <= b.bottom_y) && (p.bottom_y >= b.top_y)) {
        let point_of_collision = (ball.y - (paddle.y + paddle.height / 2));
        point_of_collision = point_of_collision / (paddle.height / 2);
        let angle = (Math.PI / 4) * point_of_collision;
        let direction = (ball.x + ball.radius < canvas.width / 2) ? 1 : -1;
        ball.velocity_x = direction * ball.speed * Math.cos(angle);
        ball.velocity_y = ball.speed * Math.sin(angle);
        // alert(1)
    }
}
function handle_controls() {
    if (upPressed) {
        user_paddle.y -= 5;
    }
    if (downPressed) {
        user_paddle.y += 5;
    }
}
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function draw_score() {

}
function game() {
    let paddle_to_check;
    window.requestAnimationFrame(game);
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    drawRect(comp_paddle.x, comp_paddle.y, comp_paddle.width, comp_paddle.height, "#FFF");
    drawRect(user_paddle.x, user_paddle.y, user_paddle.width, user_paddle.height, "#FFF");
    drawBall();
    drawCenterLine();
    ctx.font = "30px FR73PixelW00-Regular";
    ctx.fillText(user_paddle.score, canvas.width / 2 - 50, canvas.height - 15);
    ctx.fillText(comp_paddle.score, canvas.width / 2 + 31, canvas.height - 15);
    ball.x += ball.velocity_x;
    ball.y += ball.velocity_y;
    if (ball.x + ball.radius < canvas.width / 2) {
        paddle_to_check = user_paddle
    } else {
        paddle_to_check = comp_paddle
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocity_y = -ball.velocity_y;
    }
    comp_paddle.y = 0.9 * (ball.y - comp_paddle.height / 2)
    collision(paddle_to_check)
    isBallonScreen()
    handle_controls();

    if (user_paddle.x >= canvas.width) {
        user_paddle.x = -100;
    } else if (user_paddle.x <= -100) {
        user_paddle.x = canvas.width;
    }
    if (user_paddle.y >= canvas.height) {
        user_paddle.y = -100;
    } else if (user_paddle.y <= -100) {
        user_paddle.y = canvas.height;
    }


}
window.requestAnimationFrame(game);