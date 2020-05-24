function Load_images() {
    virus_img = new Image;
    virus_img.src = "v1.png";
    player_img = new Image;
    player_img.src = "superhero.png";
    gem_img = new Image;
    gem_img.src = "gem.png";
};

function init() {
    //get the id from html
    canvas = document.getElementById("mycanvas");
    console.log(canvas);

    //set the height and width
    W = 700
    H = 400

    //by using the canvas  we can change the height and width
    canvas.width = W
    canvas.height = H

    //to draw the something on the document screen we have to get the pen means something to handle with 
    pen = canvas.getContext('2d');
    console.log(pen);

    //for updating the score initialize the score as the 0
    score = 0;

    //create the object that we get from the json
    e1 = {
        x: 150,
        y: 50,
        w: 60,
        h: 60,
        speed: 30
    };
    e2 = {
        x: 300,
        y: 100,
        w: 60,
        h: 60,
        speed: 40
    };
    e3 = {
        x: 450,
        y: 200,
        w: 80,
        h: 80,
        speed: 60
    };
    enemy = [e1, e2, e3];

    player = {
        x: 20,
        y: H / 2,
        w: 60,
        h: 60,
        speed: 20,
        moving: "false",
    };
    gem = {
        x: W - 100,
        y: H / 2,
        w: 60,
        h: 60,
    };
     document.addEventListener('mousedown', function() {
        console.log("mouse is click");
        player.moving = true;
    });
     document.addEventListener('mouseup', function() {
        console.log("mouse is release");
        player.moving = false;
    });
    document.addEventListener('touchstart', function() {
        console.log("mouse is click");
        player.moving = true;
    });
    document.removeEventListener('touchstart', function() {
        console.log("mouse is release");
        player.moving = false;
    });

    document.addEventListener('keydown', function(e) {
        console.log("you press the key");
        console.log(e);
        if (e.key == "d") {
            player.moving = true;

        } else if (e.key == "s") {
            player.moving = false;

        } else if (e.key == "a") {
            player.moving = -1;
        }

    })
    game_over = false;
};

function draw() {
    pen.clearRect(0, 0, W, H);
    //draw a enemy
    pen.fillStyle = "red";
    // pen.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
    // pen.drawImage(virus_img, enemy.x, enemy.y, enemy.w, enemy.h);
    pen.drawImage(player_img, player.x, player.y, player.w, player.h);
    pen.drawImage(gem_img, gem.x, gem.y, gem.w, gem.h);
    for (let i = 0; i < enemy.length; i++) {
        pen.drawImage(virus_img, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);

    }
    pen.font = "20px sans-serif"
    pen.fillStyle = "purple";
    pen.fillText("SCORE :- " + score, 10, 30);

}
//gem collision
function collision(b1, b2) {
    if (Math.abs(b1.x - b2.x) <= b1.w - 30 && Math.abs(b1.y - b2.y) <= b1.h - 30) {
        game_over = true;
        return true;

    }
    return false;
    /*if (Math.abs(b1.x - b2.x) <= b1.w && Math.abs(b1.y - b2.y) <= b1.h) {
        return true;
    }
    return false; */
 
}
//enemy collision

function enemy_collision(b1, b2) {
    if (Math.abs(b1.x - b2.x) <= b1.w - 30 && Math.abs(b1.y - b2.y) <= b1.h - 30) {
        // game_over = true;

        return true;

    }
    return false;
    /*if (Math.abs(b1.x - b2.x) <= b1.w && Math.abs(b1.y - b2.y) <= b1.h) {
        return true;
    }
    return false; */

}

function update() {
    //check for the player is moving
    if (player.moving == true) {
        player.x += player.speed;
        score += 20;
    } else if (player.moving == -1) {
        player.x -= player.speed;
    }

    for (let i = 0; i < enemy.length; i++) {
        enemy[i].y += enemy[i].speed;
        if (enemy[i].y > (H - enemy[i].h) || enemy[i].y < 0) {
            enemy[i].speed *= -1;
        }
    }
    //collision gem and player
    if (collision(gem, player)) {
        game_over = true;
        draw();
        alert("You score :" + score + "\nWIN THE GAME");
        //break the game loop -->
    }
    //collision enemy
    for (let i = 0; i < enemy.length; i++) {
         if (enemy_collision(player, enemy[i])) {
            score -= i * 100;
            game_over = true;
            window.alert("game_Over!!!");
            draw();
            // alert("You score" + score);
        }
    }

}

function game_loop() {

    //check for the gameover
    if (game_over == true) {
        clearInterval(f);
    }
    //call for drawing ..
    draw();
    update();
}
Load_images();
init();

//repeatedly call to the game loop y using the setinterval(func_name,timeinterval)
setInterval(game_loop, 100);
