import dotBuildConfig from "../config/dot-build-config"
import Dot from "./Dot"

export class DotMatrix {
    constructor(scene) {
        this.scene = scene
    }

    getDotsPositions() {
        const {radius, cols, rows, gap} = dotBuildConfig
        console.log()
        let offsetX = (this.scene.scale.width - radius * 2 * cols - gap * (cols - 1)) / 2
        let offsetY = (this.scene.scale.height - radius * 2 * rows - gap * (rows - 1)) / 2
        let positions = []
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                positions.push({
                    x: offsetX + j * (radius * 2 + gap),
                    y: offsetY + i * (radius * 2 + gap)
                })
            }
        }
        return positions
    }

    createDotMatrix() {
            let dots = []
            let positions = this.getDotsPositions()
            const { radius, dotColors } = dotBuildConfig 
            positions.forEach((pos, idx) => {
                let dot = new Dot(this.scene, pos.x, -500, radius, this.getRandomColor(dotColors), idx).setOrigin(0, 0)
                dots.push(dot)
            })
            this.fallDots(dots, positions)
            return dots
    }
    
    getRandomColor(colors) {
        return colors.sort(() => Math.random() - 0.5)[0]
    }

    spawnNewDot(targetX, targetY, idx) {
        const { radius, dotColors } = dotBuildConfig
        let newDot = new Dot(this.scene, targetX, -500, radius, this.getRandomColor(dotColors), idx).setOrigin(0, 0)
        this.scene.tweens.add({
            targets: newDot,
                x: targetX,
                y: targetY,
                ease: "Linear",
                duration: 400,  
        })
        return newDot
    }

    fallDots(dots, positions) {
        dots.forEach(dot => {
            this.scene.tweens.add({
                targets: dot,
                x: positions[dot.id].x,
                y: positions[dot.id].y,
                ease: "Linear",
                duration: 400,
            })
        })
    }

    shiftAfterRemove() {
        // [0, 1, 2, 3, 4, 5]
        // [6, 7, 8, 9, 10, 11]
        // [12, 13, 14, 15, 16, 17]
        // [18, 19, 20, 21, 22, 23]
        // [24, 25, 26, 27, 28, 29]
        // [30, 31, 32, 33, 34, 35] 
        let { radius, gap } = dotBuildConfig

        let dotsDistance = 2 * radius + gap
        let positions = this.getDotsPositions()

        // if (dotRow === 0) {
        //     let newDot = this.spawnNewDot(dot.getCenter().x, dot.getCenter().y, dot.id)
        //     dot.destroy()
        //     return newDot
        // } else {
        //     for (let i = dotRow; i > 0; i--) {
        //         let upperAdjacentX = currentDotToProcess.getCenter().x
        //         let upperAdjacentY = currentDotToProcess.getCenter().y - dotsDistance
        //         let upperAdjacentDot = this.scene.dots
        //                                 .find(dot => dot.getCenter().x === upperAdjacentX &&
        //                                              dot.getCenter().y === upperAdjacentY) 
        //         this.scene.tweens.add({
        //             targets: upperAdjacentDot,
        //             x: currentDotToProcess.getCenter().x,
        //             y: currentDotToProcess.getCenter().y,
        //             ease: "Linear",
        //             duration: 400
        //         })

        //         prevDotStorage = {x: upperAdjacentX, y: upperAdjacentY, id: upperAdjacentDot.id}

        //         this.scene.dots[currentDotToProcess.id] = this.scene.dots[upperAdjacentDot.id]
        //         this.scene[currentDotToProcess.id].id = currentDotToProcess.id
        //         dot.destroy()
        //         currentDotToProcess = upperAdjacentDot
                
        //     }
        // }
        


        
    }

}