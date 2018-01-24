import Container from "../../../block/container";
import Ledge from "../element/ledge";
import * as Config from "../config";
import * as MathUtil from "../../../util/math";
import * as ArrayUtil from "../../../util/array";
import * as GameUtil from "../../../util/game";


class LedgesRunner extends Container {
    constructor(game, speed, ledgeNumber, normalWeight, sandWeight, thornWeight, jumpWeight, leftWeight, rightWeight) {
        super(game);

        if (ledgeNumber === undefined) {
            ledgeNumber = Config.MaxLedgesNumber;
        }
        if (normalWeight === undefined) {
            normalWeight = Config.DefaultNormalLedgeWeight;
        }
        if (sandWeight === undefined) {
            sandWeight = Config.DefaultSandLedgeWeight;
        }
        if (thornWeight === undefined) {
            thornWeight = Config.DefaultThornLedgeWeight;
        }
        if (jumpWeight === undefined) {
            jumpWeight = Config.DefaultJumpLedgeWeight;
        }
        if (leftWeight === undefined) {
            leftWeight = Config.DefaultLeftLedgeWeight;
        }
        if (rightWeight === undefined) {
            rightWeight = Config.DefaultRightLedgeWeight;
        }
        this.prevLedge = null;

        this.normalWeight = normalWeight;
        this.sandWeight = sandWeight;
        this.thornWeight = thornWeight;
        this.jumpWeight = jumpWeight;
        this.leftWeight = leftWeight;
        this.rightWeight = rightWeight;
        this.ledgesRate = this.reCalculateRate();

        if (speed === undefined) {
            speed = Config.LedgeBasicSpeed;
        }
        this.speed = speed;

        // 建立 ledge 物件
        for (let i = 0; i < ledgeNumber; i++) {
            let ledge = new Ledge(game, 0, 0);
            game.physics.arcade.enable(ledge);
            ledge.body.immovable = true;
            ledge.initAnimation();
            ledge.anchor.setTo(Config.LedgePos.Anchor.X, Config.LedgePos.Anchor.Y);
            this.addAsset(i, ledge);
        }

        // 初始化所有 ledge 位置與類型
        let ledgeSet = this.getAll();
        ledgeSet.forEach((ledge, index) => {
            ledge.x = MathUtil.getRandomInt(Config.LedgePos.MinX, Config.LedgePos.MaxX);
            ledge.y = Config.LedgePos.BaseY + (Config.LedgePos.MarginY * index);
        });
    }

    reCalculateRate() {
        // 計算每種階梯比重的最大公因數
        let gcd = MathUtil.getArrayGCD([
            this.normalWeight,
            this.sandWeight,
            this.thornWeight,
            this.jumpWeight,
            this.leftWeight,
            this.rightWeight
        ]);
        if (gcd < 0) {
            gcd = 1;
        }

        // 將比重除以最大公因數
        this.normalWeight = this.normalWeight / gcd;
        this.sandWeight = this.sandWeight / gcd;
        this.thornWeight = this.thornWeight / gcd;
        this.jumpWeight = this.jumpWeight / gcd;
        this.leftWeight = this.leftWeight / gcd;
        this.rightWeight = this.rightWeight / gcd;

        let rate = [];
        ArrayUtil.pushElementToArray(rate, Config.LedgeTypes.Normal, this.normalWeight);
        ArrayUtil.pushElementToArray(rate, Config.LedgeTypes.Sand, this.sandWeight);
        ArrayUtil.pushElementToArray(rate, Config.LedgeTypes.Thorn, this.thornWeight);
        ArrayUtil.pushElementToArray(rate, Config.LedgeTypes.Jump, this.jumpWeight);
        ArrayUtil.pushElementToArray(rate, Config.LedgeTypes.Left, this.leftWeight);
        ArrayUtil.pushElementToArray(rate, Config.LedgeTypes.Right, this.rightWeight);
        this.ledgesRate = rate;
        return this.ledgesRate;
    }

    randAllLedges() {
        let ledgeSet = this.getAll();
        ledgeSet.forEach((ledge) => {
            ledge.randLedgeType(this.ledgesRate);
        });
    }

    setLedgePos(index, x, y) {
        let ledgeSet = this.getAll();
        if (index in ledgeSet) {
            if (x !== undefined) {
                ledgeSet[index].x = x;
            }
            if (y !== undefined) {
                ledgeSet[index].y = y;
            }
        }
    }

    setLedgeToNormalType(index) {
        let ledgeSet = this.getAll();
        if (index in ledgeSet) {
            ledgeSet[index].setToNormalType();
        }
    }

    addLedgeWeight(type, weight) {
        if (Config.DefaultLedgeNameSet.indexOf(type) === -1) {
            return;
        }
        switch (type) {
        case Config.LedgeTypes.Normal:
            this.normalWeight += weight;
            break;
        case Config.LedgeTypes.Sand:
            this.sandWeight += weight;
            break;
        case Config.LedgeTypes.Thorn:
            this.thornWeight += weight;
            break;
        case Config.LedgeTypes.Jump:
            this.jumpWeight += weight;
            break;
        case Config.LedgeTypes.Left:
            this.leftWeight += weight;
            break;
        case Config.LedgeTypes.Right:
            this.rightWeight += weight;
            break;
        }
        this.reCalculateRate();
    }

    addLedgeSpeed(speed) {
        this.speed += speed;
        this.run();
    }

    setLedgeWeight(normal, sand, jump, thorn, left, right) {
        this.normalWeight = normal;
        this.sandWeight = sand;
        this.jumpWeight = jump;
        this.thornWeight = thorn;
        this.leftWeight = left;
        this.rightWeight = right;
        this.reCalculateRate();
    }

    printAllLedgesPos() {
        let ledgesSet = this.getAll();
        ledgesSet.forEach((ledge, index) => {
            if (index === ledgesSet.length -1) {
                console.log("index: "+ index.toString() + ": " + (ledge.y - ledgesSet[0].y).toString() );
                return;
            }
            console.log("index: "+ index.toString() + ": " + (ledge.y - ledgesSet[index + 1].y).toString() );
        });
    }

    setLedgeSpeed(speed) {
        this.speed = speed;
        this.run();
    }

    run() {
        let ledgesSet = this.getAll();
        ledgesSet.forEach((ledge) => {
            GameUtil.moveToXY(
                this.game,
                ledge,
                ledge.x,
                Config.LedgePos.MinY,
                this.speed,
                0,
                this.resetLedgePos.bind(this),
                this
            );
        });
    }

    resetLedgePos(ledge) {
        ledge.x = MathUtil.getRandomInt(
            Config.LedgePos.MinX,
            Config.LedgePos.MaxX
        );
        ledge.randLedgeType(this.ledgesRate);
        if (this.prevLedge == null) {
            ledge.y = Config.LedgePos.MaxY;
        } else {
            ledge.y = this.prevLedge.y + Config.LedgePos.MarginY;
        }
        this.prevLedge = ledge;
        GameUtil.moveToXY(
            this.game,
            ledge,
            ledge.x,
            Config.LedgePos.MinY,
            this.speed,
            0,
            this.resetLedgePos.bind(this),
            this
        );
    }
}

export default LedgesRunner;
