var Entity = require('./Entity');
var Vector2 = require('gm2-vector2');

var MobileEntity = function() {

    Entity.call(this);

    this.velocity = new Vector2();
};

MobileEntity.prototype.update = function(dt) {

    Entity.update.call(this, dt);
};

module.exports = MobileEntity;