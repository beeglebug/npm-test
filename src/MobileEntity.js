var Entity = require('./Entity');
var Vector2 = require('gm2-vector2');

var MobileEntity = function() {

    Entity.call(this);

    this.velocity = new Vector2();
};

MobileEntity.prototype.update = function(delta) {

    // add velocity
    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;

    Entity.prototype.update.call(this, delta);
};

module.exports = MobileEntity;