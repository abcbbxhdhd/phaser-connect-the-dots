import Phaser from 'phaser'
import GameScene from './scenes/GameScene'

const config = {
	type: Phaser.AUTO,
	width: 600,
	height: 960,
	scene: [GameScene]
}

export default new Phaser.Game(config)
