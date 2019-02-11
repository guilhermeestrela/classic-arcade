const BLOCK_WIDTH = 101;
const BLOCK_HEIGHT = 83;

// Enemies our player must avoid
class Enemy {
    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.x = 1;
        this.y = (Math.floor(Math.random() * 3) + 1) * BLOCK_HEIGHT;
        this.speed = (Math.floor((Math.random() * 5) + 1)  / 2);
    }

    update(dt) {
        this.x += ((this.x + BLOCK_WIDTH) * dt) + this.speed;

        if (this.x > ctx.canvas.width) {
            this.x = 1;
            this.y = (Math.floor(Math.random() * 3) + 1) * BLOCK_HEIGHT;
        };
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

/**
 * Class Player
 *
 */
class Player {
    constructor(x = 202, y = 332) {
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
    }


    update(x, y) {
        if (typeof x !== 'undefined' && typeof y !== 'undefined') {
            if (x < 0 || x === ctx.canvas.width) return;

            if (this.y === 0 || this.y >= (ctx.canvas.height - BLOCK_HEIGHT)) return this.reset();

            this.x = x;
            this.y = y;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        var xAsis = this.x;
        var yAsis = this.y;

        switch (key) {
            case 'left':
                xAsis -= BLOCK_WIDTH;

                break;
            case 'right':
                xAsis += BLOCK_WIDTH;

                break;
            case 'up':
                yAsis -= BLOCK_HEIGHT;

                break;
            case 'down':
                yAsis += BLOCK_HEIGHT;

                break;
        }

        this.update(xAsis, yAsis);
    }

    reset() {
        this.x = 202;
        this.y = 332;
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemy = new Enemy();
allEnemies.push(enemy);
var enemy = new Enemy();
allEnemies.push(enemy);
var enemy = new Enemy();
allEnemies.push(enemy);
var enemy = new Enemy();
allEnemies.push(enemy);

var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
