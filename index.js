var PIXI = require('pixi.js');
var Circle = require('gm2-circle');
var pixiTiled = require('pixi-tiled');
var Camera = require('pixi-camera');
var Physics = require('./src/Physics');
var Loop = require('./src/Loop');
var input = require('./src/input');
var Mob = require('./src/MobileEntity');

var renderer = new PIXI.WebGLRenderer(320,240);
var mount = document.getElementById('app-mount');
mount.appendChild(renderer.view);

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

var map;
var world = new PIXI.Container();
var walls = [];
var sortableLayer = new PIXI.Container();


var player = new Mob();
player.sprite = PIXI.Sprite.fromImage('assets/img/player.png');
player.body = new Circle(3);
player.sprite.anchor.set(0.5, 1);
player.position.set(16,16);

sortableLayer.addChild(player.sprite);

var camera = new Camera(world);
camera.zoom = 2;
camera.width = 320;
camera.height = 240;
camera.target = player.position;
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

    var speed = 60;

    //@todo set velocity

    player.velocity.zero();

    if (input.commands.LEFT.active) {

        player.velocity.x = -speed;

    } else if (input.commands.RIGHT.active) {

        player.velocity.x = speed;

    }

    if (input.commands.UP.active) {

        player.velocity.y = -speed;

    } else if (input.commands.DOWN.active) {

        player.velocity.y = speed;

    }

    //@todo entity.update (add velocity to position);

    player.update(dt);

    camera.update(dt);

    Physics.seperateCircleRects(player.body, walls);
};

loop.render = function(dt) {

    renderer.render(camera);

};