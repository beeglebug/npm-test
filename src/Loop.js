// inspired by https://github.com/kchapelier/migl-gameloop

var requestAnimationFrame = require('raf');
var cancelAnimationFrame = requestAnimationFrame.cancel;

var Loop = function (framerate) {

    this.frameRate = framerate || null;

    this.running = false;

    this.lastTime = null;

    this._run = this.run.bind(this);
};

/**
 * start the loop
 */
Loop.prototype.start = function () {

    if (this.running) { return; }

    this.running = requestAnimationFrame(this._run);
};

/**
 * stop the loop
 */
Loop.prototype.stop = function () {

    if (this.running === false) { return; }

    cancelAnimationFrame(this.running);

    this.running = false;
    this.lastTime = null;
};

/**
 * main loop
 * @param time
 */
Loop.prototype.run = function (time) {

    this.running = requestAnimationFrame(this._run);

    var elapsed;

    if (this.lastTime === null) {
        elapsed = 0;
    } else {
        elapsed = time - this.lastTime;
    }

    if (this.checkFrame(elapsed)) {

        this.lastTime = time;

        // pass delta as time in seconds
        this.update(elapsed / 1000);
        this.render(elapsed / 1000);
    }
};

/**
 * frame limit
 * @param deltaTime
 * @returns {boolean}
 */
Loop.prototype.checkFrame = function (deltaTime) {

    if (this.frameRate === null || this.lastTime === null) {
        return true;
    }

    var frameDuration = 1000 / this.frameRate;

    return deltaTime >= frameDuration;
};

/**
 * stub methods to be replaced
 */
Loop.prototype.update = function (deltaTime) {};
Loop.prototype.render = function (deltaTime) {};

module.exports = Loop;