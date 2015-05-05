var PIXI = require('pixi.js');
var pixiTiled = require('pixi-tiled');
var Rect = require('gm2-rect');
var Circle = require('gm2-circle');
var Collision = require('gm2-collision');
var Vector2 = require('gm2-vector2');

var Loop = require('./src/Loop');

var renderer = new PIXI.WebGLRenderer(800, 600);
var mount = document.getElementById('app-mount');
mount.appendChild(renderer.view);

PIXI.loader.add('assets/map.json', function(res) {

    var map = res.tiledMap;

    var solid = map.getTilesByGid([2,3]);

    walls = solid.map(function(tile) {
        return new Rect(tile.width, tile.height, tile.position);
    });

    var debugGFX = new PIXI.Graphics();
    debugGFX.lineStyle(1, 0xFF0000);
    walls.forEach(function(rect) {
        debugGFX.drawRect(rect.position.x, rect.position.y, rect.width, rect.height);
    });

    var debug = new PIXI.Sprite(debugGFX.generateTexture());
    // generating texture crops it
    debug.position.set(walls[0].position.x, walls[0].position.y);

    player.lineStyle(1, 0x00FF00);
    player.drawCircle(circle.position.x, circle.position.y, circle.radius);

    stage.addChild(map.layers.floor);
    stage.addChild(map.layers.shadows);
    stage.addChild(map.layers.walls);
    stage.addChild(player);
    stage.addChild(map.layers.tops);
    //stage.addChild(debug);
});

var input = require('./src/input');

input.attach();

var walls = [];
var circle = new Circle(8);

var player = new PIXI.Graphics();
var stage = new PIXI.Container();

PIXI.loader.load();

var loop = new Loop();

loop.update = function(dt) {

    input.update(dt);

    var speed = 1;

    if (input.commands.LEFT.active) {

        circle.position.x -= speed;

    } else if (input.commands.RIGHT.active) {

        circle.position.x += speed;

    }

    if (input.commands.UP.active) {

        circle.position.y -= speed;

    } else if (input.commands.DOWN.active) {

        circle.position.y += speed;

    }

    var response = new Collision.Response();

    for(var i = 0, len = walls.length; i < len; i++) {

        if (Collision.circleRect(circle, walls[i], response)) {
            circle.position.add(response.mtd);
        }

    }


};

loop.render = function(dt) {

    player.position.set(circle.position.x, circle.position.y);

    renderer.render(stage);

};

loop.start();