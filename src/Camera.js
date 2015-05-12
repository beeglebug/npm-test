var PIXI = require('pixi.js');

var Camera = function() {

    PIXI.Container.call(this);

    this.target = null;
    this.speed = 1;

    this.ui = new PIXI.Container();
    this.world = new PIXI.Container();

    this.addChild(this.world);
    this.addChild(this.ui);
};

Camera.prototype = Object.create(PIXI.Container.prototype);

Camera.prototype.update = function(dt) {

};


Object.defineProperty(Camera.prototype, 'zoom', {

    get: function () {

        return this._zoom;

    },

    set: function (level) {

        this.world.scale.set(level);

        return this._zoom = level;
    }

});

module.exports = Camera;

