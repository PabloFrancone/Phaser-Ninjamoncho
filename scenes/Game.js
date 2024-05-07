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
    this.load.image("cielo","../public/assets/Cielo.webp");

    //import plataforma
    this.load.image("plataforma","../public/assets/platform.png");
   
    //import ninja
    this.load.image("ninja","../public/assets/Ninja.png");
  }

  create() {
    // crear elementos

    this.Cielo = this.add.image(400,300,"cielo");
    this.Cielo.setScale(2);

    this.plataformas = this.physics.add.staticGroup();
    this.plataformas.create(400, 568, "plataforma").setScale(2).refreshBody();
    this.plataformas.create(200, 200, "plataforma")


    this.ninja = this.physics.add.sprite(400,300,"ninja");
    this.ninja.setScale(0.1);
    this.ninja.setCollideWorldBounds(true);

    //agrupar colision entre personaje y plataforma

     this.physics.add.collider(this.ninja, this.plataformas);

     //crear teclas 
     this.cursor = this.input.keyboard.createCursorKeys();

     //letra por letra
     //this.cursor = this.input.keyboard.addkey()


  }
 

  update() {
//movimiento personaje
    if(this.cursor.left.isDown){
      this.ninja.setVelocityX(-160);
    }else if(this.cursor.right.isDown){
      this.ninja.setVelocityX(160);
    }else{
      this.ninja.setVelocityX(0);
    }
    if (this.cursor.up.isDown && this.ninja.body.tounching.down){
      this.ninja.setVelocityY(-330);
    }
  }
}
