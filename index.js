var PIXI = require('pixi.js');
var Circle = require('gm2-circle');

require('pixi-tiled');

var Physics = require('./src/Physics');
var Loop = require('./src/Loop');
var input = require('./src/input');
var Camera = require('./src/Camera');

var renderer = new PIXI.WebGLRenderer(320,240);
var mount = document.getElementById('app-mount');
mount.appendChild(renderer.view);

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

PIXI.loader.add('assets/spritesheets/debug.json', function(res) {

    playerDebug.texture = res.textures[1];
    playerDebug.anchor.set(0.5, 0.5);
    debugLayer.addChild(playerDebug);

});

var map;
var circle = new Circle(3);

var stage = new PIXI.Container();
var world = new PIXI.Container();
var camera = new Camera(renderer);
camera.zoom = 4;
camera.width = 320;
camera.height = 240;
camera.bounds = new PIXI.Rectangle(0,0,200,200);
camera.follow(circle.position);

stage.addChild(camera);

PIXI.loader.add('assets/map.json', function(res) {

    map = res.tiledMap;

    debugLayer.alpha = 0.6;
    debugLayer.visible = false;

    world.addChild(map.layers.floor);
    world.addChild(sortableLayer);
    world.addChild(debugLayer);

    loop.start();
});

input.attach();

var walls = [];

var playerDebug = new PIXI.Sprite();
var sortableLayer = new PIXI.Container();
var debugLayer = new PIXI.Container();

var player = PIXI.Sprite.fromImage('assets/img/player.png');
player.anchor.set(0.5, 1);
//circle.position.set(8,8);

sortableLayer.addChild(player);


PIXI.loader.load();

window.camera = camera;

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

    camera.update(dt);
};

loop.render = function(dt) {

    camera.render(world);

};