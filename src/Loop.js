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

    var deltaTime;

    if (this.lastTime === null) {
        deltaTime = 0;
    } else {
        deltaTime = time - this.lastTime;
    }

    if (this.checkFrame(deltaTime)) {

        this.lastTime = time;

        this.update(deltaTime);
        this.preRender(deltaTime);
        this.render(deltaTime);
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
Loop.prototype.preRender = function (deltaTime) {};

module.exports = Loop;