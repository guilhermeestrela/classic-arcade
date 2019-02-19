const BLOCK_WIDTH = 101;
const BLOCK_HEIGHT = 83;

/**
 * Class: Enemy
 *
 * Enemies we should avoid
 */
class Enemy {
    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.x = 1;
        this.y = (Math.floor(Math.random() * 3) + 1) * BLOCK_HEIGHT;
        this.speed = (Math.floor((Math.random() * 5) + 1)  / 2);
    }

    /**
     * Update enemy position
     *
     * @param dt
     * @returns {*}
     */
    update(dt) {
        this.x += ((this.x + BLOCK_WIDTH) * dt) + this.speed;

        if (this.x > ctx.canvas.width) {
            this.x = 1;
            this.y = (Math.floor(Math.random() * 3) + 1) * BLOCK_HEIGHT;
        };

        return this.handleCollision();
    }

    /**
     * Render enemy on the screen
     */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * Handle enemy collision with player.
     */
    handleCollision() {
        if (this.x < player.x + BLOCK_WIDTH  && this.x + BLOCK_WIDTH  > player.x &&
            this.y < player.y + BLOCK_HEIGHT && this.y + BLOCK_HEIGHT > player.y) {

            return player.reset();
        }
    }
}

/**
 * Class Player
 *
 * Our Hero
 */
class Player {
    constructor(x = 202, y = 332) {
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
    }

    /**
     * @method update
     * @param x
     * @param y
     *
     * Update Player position and check the limits
     */
    update(x, y) {
        if (typeof x !== 'undefined' && typeof y !== 'undefined') {
            if (x < 0 || x === ctx.canvas.width) return;

            if (this.y === 0 || this.y >= (ctx.canvas.height - BLOCK_HEIGHT)) return this.reset();

            this.x = x;
            this.y = y;
        }
    }

    /**
     * Render our player on the screen
     */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * Move our player on the screen
     * @param key
     */

    handleInput(key) {
        let xAxis = this.x;
        let yAxis = this.y;

        switch (key) {
            case 'left':
                xAxis -= BLOCK_WIDTH;

                break;
            case 'right':
                xAxis += BLOCK_WIDTH;

                break;
            case 'up':
                yAxis -= BLOCK_HEIGHT;

                break;
            case 'down':
                yAxis += BLOCK_HEIGHT;

                break;
        }

        this.update(xAxis, yAxis);
    }

    /**
     * Change our player style
     * @param sprite
     */
    updateChar(sprite) {
        this.sprite = sprite;

        return this.reset();
    }

    /**
     * Reset player to initial position
     */
    reset() {
        this.x = 202;
        this.y = 332;
    }
}

var allEnemies = [
    new Enemy(),
    new Enemy(),
    new Enemy()
]

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

document.querySelectorAll('.character-types li').forEach((type) => {
    type.addEventListener('click', function (event) {
        event.preventDefault();

        player.updateChar(this.querySelector('img').attributes.src.value);
    });
})
