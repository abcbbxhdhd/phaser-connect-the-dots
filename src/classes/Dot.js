import { DotMatrix } from "./DotMatrix"
import dotBuildConfig from "../config/dot-build-config"

class Dot extends Phaser.GameObjects.Arc {
    constructor(scene, x, y, radius, fillColor, id) {
        super(scene, x, y, radius, 0, 360, false, fillColor, 1)
        this.id = id
        this.dotMatrix = new DotMatrix(scene)
        scene.add.existing(this)
        this.setInteractive({draggable: true})

        // this.on("pointerdown", (pointerdown) => {
        //     console.log(`dot${id} ${x}:${y}`)
            
        //     if (scene.selected.length === 0) {
        //         scene.selected.push(this)
        //     } else {
        //         let lastDot = scene.selected[scene.selected.length - 1]
        //         if (this.fillColor === lastDot.fillColor && this !== lastDot && !scene.selected.some(dot => this.id === dot.id) && this.isAdjacent(lastDot)) {
        //             scene.selected.push(this)
        //             let newLine = scene.add.line(0, 0, lastDot.getCenter().x, lastDot.getCenter().y, this.getCenter().x, this.getCenter().y, this.fillColor).setOrigin(0, 0)
        //             scene.lines.push(newLine)
        //         } else if (this.id === lastDot.id && scene.selected.length >= 2) {
        //             scene.score = scene.score + scene.selected.length
        //             scene.scoreLabel.setText(`SCORE: ${scene.score}`)
        //             scene.selected.forEach(dot => {
        //                 scene.dots[dot.id].destroy()
        //                 scene.dots[dot.id] = this.dotMatrix.spawnNewDot(dot.x, dot.y, dot.id)
        //             })
        //             scene.selected = []
        //             scene.lines.forEach(line => line.destroy())
        //             scene.lines = []
        //         } else if (scene.selected.length >= 2 && this.id === scene.selected[scene.selected.length - 2].id) {
        //             scene.selected = scene.selected.slice(0, -1)
        //             scene.lines[scene.lines.length - 1].destroy()
        //             scene.lines = scene.lines.slice(0, -1)
        //         } else if (scene.selected.length === 1 && (this.fillColor !== lastDot.fillColor || !this.isAdjacent(lastDot))) {
        //             scene.selected = []
        //             scene.selected.push(this)
        //         }   
        //     }
        // })

        this.on("dragstart", (p, dragX, dragY) => {
            scene.selected.push(this)
        })

        this.on("drag", (pointer) => {
            let lastDot = scene.selected[scene.selected.length - 1]
            scene.currentLine.destroy()
            scene.currentLine = scene.add.line(0, 0, lastDot.getCenter().x, lastDot.getCenter().y, pointer.worldX, pointer.worldY, lastDot.fillColor).setOrigin(0, 0)
        })

        this.on("dragend", (pointer, dragX, dragY) => {
            if (scene.selected.length >= 2) {
                scene.score = scene.score + scene.selected.length
                    scene.scoreLabel.setText(`SCORE: ${scene.score}`)
                    scene.selected.forEach(dot => {
                        scene.dots[dot.id].destroy()
                        scene.dots[dot.id] = this.dotMatrix.spawnNewDot(dot.x, dot.y, dot.id)
                    })
                    scene.selected = []
                    scene.lines.forEach(line => line.destroy())
                    scene.lines = []
                    scene.currentLine.destroy()
            } else {
                scene.currentLine.destroy()
                scene.selected = []
            }

        })

        this.on("pointerover", (pointer) => {
            if (scene.selected.length !== 0) {
                let lastDot = scene.selected[scene.selected.length - 1]
                if (this.fillColor === lastDot.fillColor && this !== lastDot && !scene.selected.some(dot => this.id === dot.id) && this.isAdjacent(lastDot)) {
                    scene.selected.push(this)
                    let newLine = scene.add.line(0, 0, lastDot.getCenter().x, lastDot.getCenter().y, this.getCenter().x, this.getCenter().y, this.fillColor).setOrigin(0, 0)
                    scene.lines.push(newLine)
                } else if (scene.selected.length >= 2 && this.id === scene.selected[scene.selected.length - 2].id) {
                        scene.selected = scene.selected.slice(0, -1)
                        scene.lines[scene.lines.length - 1].destroy()
                        scene.lines = scene.lines.slice(0, -1)
                        scene.currentLine.destroy()
                }
            }
        })

    }

    isAdjacent(dot) {
        let { radius, gap } = dotBuildConfig
        let centerThis = {
            x: this.getCenter().x,
            y: this.getCenter().y
        }
        let centerTarget = {
            x: dot.getCenter().x,
            y: dot.getCenter().y
        }
        let correctdDistanceBetweenNeighbours = 2 * radius + gap
        let distanceX = Math.abs(centerTarget.x - centerThis.x)
        let distanceY = Math.abs(centerTarget.y - centerThis.y)  
        if ((centerTarget.x === centerThis.x && distanceY === correctdDistanceBetweenNeighbours) 
            || (centerTarget.y === centerThis.y && distanceX === correctdDistanceBetweenNeighbours)) {
            return true
        }
        return false
    }
}

export default Dot