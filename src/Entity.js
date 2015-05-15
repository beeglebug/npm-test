var Vector2 = require('gm2-vector2');

var Entity = function() {

    this.position = new Vector2();
};

Entity.prototype.update = function(delta) {

    // update collision body
    if(this.body) {
        this.body.position.x = this.position.x;
        this.body.position.y = this.position.y;
    }

    // update sprite
    if(this.sprite) {
        this.sprite.position.x = this.position.x;
        this.sprite.position.y = this.position.y;
    }

};

module.exports = Entity;