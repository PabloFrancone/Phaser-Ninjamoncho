// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
  }

  init() {
   
  }

  preload() {
    //cargar assets
  
    //import cielo
    this.load.image("Cielo","../public/assets/Cielo.webp");
  }

  create() {
    // crear elementos
    const Cielo = this.add.image(400,300,"Cielo")

  }
 

  update() {

  }
}
