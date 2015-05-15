var PIXI = require('pixi.js');
var Circle = require('gm2-circle');
var pixiTiled = require('pixi-tiled');
var Camera = require('pixi-camera');
var Physics = require('./src/Physics');
var Loop = require('./src/Loop');
var input = require('./src/input');

var renderer = new PIXI.WebGLRenderer(320,240);
var mount = document.getElementById('app-mount');
mount.appendChild(renderer.view);

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

var map;
var circle = new Circle(3);
var world = new PIXI.Container();
var walls = [];
var sortableLayer = new PIXI.Container();

var player = PIXI.Sprite.fromImage('assets/img/player.png');
player.anchor.set(0.5, 1);
circle.position.set(16,16);
sortableLayer.addChild(player);

var camera = new Camera(world);
camera.zoom = 2;
camera.width = 320;
camera.height = 240;
camera.target = circle.position;
camera._bounds.width = 384;
camera._bounds.height = 384;
camera.bounded = true;
window.camera = camera;

PIXI.loader.add('assets/map.json', function(res) {

    map = res.tiledMap;

    world.addChild(map.layers.floor);
    world.addChild(sortableLayer);

    loop.start();
});

input.attach();

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

    camera.update(dt);
};

loop.render = function(dt) {

    renderer.render(camera);

};