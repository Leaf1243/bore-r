const canvas = document.getElementById('gameCanvas');  
const ctx = canvas.getContext('2d');  

let player = {  
    x: 50,  
    y: 300,  
    width: 30,  
    height: 30,  
    dy: 0,  
    jumpStrength: -10,  
    gravity: 0.5,  
    isJumping: false  
};  

let obstacles = [];  
let score = 0;  
let gameOver = false;  

function createObstacle() {  
    const size = Math.random() * 30 + 20; 
    obstacles.push({  
        x: canvas.width,  
        y: 300,  
        width: size,  
        height: size  
    });  
}  

function update() {  
    if (gameOver) return;  

    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    
    player.dy += player.gravity;   
    player.y += player.dy;  

    if (player.y > 300) {  
        player.y = 300;  
        player.isJumping = false;  
        player.dy = 0;  
    }  

    for (let i = obstacles.length - 1; i >= 0; i--) {  
        obstacles[i].x -= 5; // 障害物を左に移動  
        if (obstacles[i].x + obstacles[i].width < 0) {  
            obstacles.splice(i, 1); // 画面外に出た障害物を削除  
            score++;  
        }  

  
        if (  
            player.x < obstacles[i].x + obstacles[i].width &&  
            player.x + player.width > obstacles[i].x &&  
            player.y < obstacles[i].y + obstacles[i].height &&  
            player.y + player.height > obstacles[i].y  
        ) {  
            gameOver = true;  
        }  
    }  
 
    ctx.fillStyle = 'gold';  
    ctx.fillRect(player.x, player.y, player.width, player.height);  
  
    ctx.fillStyle = 'red';  
    obstacles.forEach(obstacle => {  
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);  
    });  

 
    ctx.fillStyle = 'black';  
    ctx.fillText(`Score: ${score}`, 10, 20);  

 
    if (gameOver) {  
        ctx.fillText('Game Over!', canvas.width / 2 - 30, canvas.height / 2);  
    }  

    requestAnimationFrame(update); // 更新の再呼び出し  
}  
  
document.addEventListener('keydown', (event) => {  
    if (event.code === 'Space' && !player.isJumping) {  
        player.dy = player.jumpStrength;  
        player.isJumping = true;  
    }  
});  

// 障害物の定期的生成  
setInterval(createObstacle, 2000); // 2秒ごとに障害物を生成  
update();
