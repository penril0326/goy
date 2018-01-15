let path = require("path");
let phaserModule = path.join(__dirname, "node_modules/phaser-ce/");

module.exports = {
    resolve: {
        alias: {
            "phaser": path.join(phaserModule, "build/custom/phaser-split.js"),
            "pixi": path.join(phaserModule, "build/custom/pixi.js"),
            "p2": path.join(phaserModule, "build/custom/p2.js")
        }
    }
};
