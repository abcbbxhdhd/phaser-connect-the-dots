import { DotMatrix } from "../classes/DotMatrix"

class GameScene extends Phaser.Scene {
    constructor() {
       super("Game")
    }

    preload() {
        this.currentLine = this.add.line()
        this.selected = []
        this.lines = []
        this.dots = []
        this.score = 0
        this.scoreLabel = null
        this.dotMatrix = new DotMatrix(this)
        this.load.image("background", "images/background_md.jpg")
    }

    create() {
        this.createBackground()
        this.scoreLabel = this.add.text(this.scale.width - 100, 50, `POINTS: ${this.score}`)
        this.dots = this.dotMatrix.createDotMatrix()
    }

    update() {
        
    }

    createBackground() {
        this.add.image(0, 0, "background").setOrigin(0, 0)
    }
}

export default GameScene