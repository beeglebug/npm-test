var Input = require('migl-input');

var controls = {

    UP: {
        triggers: ['<up>', 'W'],
        group: 'vertical'
    },

    DOWN: {
        triggers: ['<down>', 'S'],
        group: 'vertical'
    },

    LEFT: {
        triggers: ['<left>', 'A'],
        group: 'horizontal'
    },

    RIGHT: {
        triggers: ['<right>', 'D'],
        group: 'horizontal'
    }
};

module.exports = new Input(controls);