var PIXI = require('pixi.js');
var Circle = require('gm2-circle');

require('pixi-tiled');

var Physics = require('./src/Physics');
var Loop = require('./src/Loop');
var input = require('./src/input');
var Camera = require('./src/Camera');

var renderer = new PIXI.WebGLRenderer(800, 600);
var mount = document.getElementById('app-mount');
mount.appendChild(renderer.view);

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

PIXI.loader.add('assets/spritesheets/debug.json', function(res) {

    playerDebug.texture = res.textures[1];
    playerDebug.anchor.set(0.5, 0.5);
    debugLayer.addChild(playerDebug);

});

var map;

PIXI.loader.add('assets/map.json', function(res) {

    map = res.tiledMap;

    debugLayer.alpha = 0.6;
    debugLayer.visible = false;

    camera.world.addChild(map.layers.floor);
    camera.world.addChild(sortableLayer);
    camera.world.addChild(debugLayer);

    loop.start();
});


input.attach();

var walls = [];
var circle = new Circle(3);

var playerDebug = new PIXI.Sprite();
var sortableLayer = new PIXI.Container();
var debugLayer = new PIXI.Container();

var player = PIXI.Sprite.fromImage('assets/img/player.png');
player.anchor.set(0.5, 1);
circle.position.set(25,29);

sortableLayer.addChild(player);

var camera = new Camera();
camera.zoom = 3;

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

    if(input.commands.DEBUG.up) {
        debugLayer.visible = !debugLayer.visible;
    }

    Physics.seperateCircleRects(circle, walls);

};

/**
 * sync models and sprites
 */
loop.preRender = function(dt) {

    // update entity sub objects
    //@Todo move to entity update function
    player.position.set(circle.position.x, circle.position.y);
    playerDebug.position.set(circle.position.x, circle.position.y);
};

loop.render = function(dt) {

    renderer.render(camera);

};