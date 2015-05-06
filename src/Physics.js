var Collision = require('gm2-collision');

var Physics = {

    _response: new Collision.Response(),

    seperateCircleRects: function(circle, rects) {

        for (var i = 0, len = rects.length; i < len; i++) {

            if (Collision.circleRect(circle, rects[i], this._response)) {

                circle.position.add(this._response.mtd);
            }
        }
    }

};

module.exports = Physics;