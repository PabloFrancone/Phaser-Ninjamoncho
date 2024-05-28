// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/ ... https://phaser.io/tutorials/making-your-first-phaser-3-game-spanish/part9
export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
  }

  init() { 
    this.score = 0;  
    this.shapes = {
   "triangulo": {points: 10, count: 0},
   "cuadrado": {points: 20, count: 0}, 
   "rombo": {points: 30, count: 0}, 

  this:checWin(),
  };
   
  }

  preload() {
    ///cargar assets
  
    //import cielo
    this.load.image("cielo","../public/assets/Cielo.webp");

    //import plataforma
    this.load.image("plataforma","../public/assets/platform.png");
   
    //import ninja
    this.load.image("ninja","../public/assets/Ninja.png");

    //recolectables
    this.load.image("roca","../public/assets/roca1.webp");
    this.load.image("araña","../public/assets/araña1.png");
    this.load.image("omni","../public/assets/platoVolador.png");


  }

  create() {
    checwin
  this.scoreText = setText(16, 60, 
  `puntaje: ${this .score} 
   T: ${tis.shapes["roca"]}.count}  
   C: ${tis.shapes["araña"]}.count}  
   H: ${tis.shapes["omni"]}.count}`
   );
   
   const cumplepuntos = this.score >= 100;
   const cumplefiguras =
      this.shapes["roca"].count >= 2 &&
      this.shapes["araña"].count >= 2 &&
      this.shapes["omni"].count >= 2 &&
   
   if (cumplepuntos && cumplefiguras) {
       console.log("ganaste");
   }
   
    // crear elementos

    this.cielo = this.add.image(400,300,"cielo");
    this.cielo.setScale(2);

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

     //
     this.recolectables = this.physics.add.group();
     this.physics.add.collider(this.ninja, this.recolectables);

     //evento 1 segundo
     this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
     });

     stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
  });
  
  stars.children.iterate(function (child) {
  
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  
  });
  }
 


 }

  update() ;
//movimiento personaje
    if(this.cursor.left.isDown){
      this.ninja.setVelocityX(-160);
    }else if(this.cursor.right.isDown){
      this.ninja.setVelocityX(160);
    }else{
      this.ninja.setVelocityX(0);
    }
    if (this.cursor.up.isDown && this.ninja.body.touching.down){
      this.ninja.setVelocityY(-330);
    }
  

 onSecond();
  //creo recolectable
  const tipos = ["araña", "roca", "omni"];
  const tipo = Phaser.Math.RND.pick(tipos); 
  console.log(tipo)
  let recolectable = this.recolectables.create(
    Phaser.Math.Between(10, 790),
    0,
    tipo
  ).setScale(0.2 )
  


  onshapecollect(personaje, recolectoable) ;
    console.log("recolectado", recolectable.texture.key);
    const nobreFig = recolectable.texture.key;
    
    this.score += this.shapes[nombreFig].points;
    this.shapes[nomberFig].count += 1;
    
    console.table(this.shapes);
    console.log("score", this.score);
    recolectable.destroy();

    
    
      
