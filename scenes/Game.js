// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/ 
export default class Game extends Phaser.Scene { 
  constructor() {
    super("main");
  }

  init() { 
    this.gameOver = false;
    this.timer = 30;
    this.score = 0;
    this.shapes = {
      roca: { points: 10, count: 0 },
      araña: { points: 20, count: 0 },
      meteoro: { points: 30, count: 0 },
      bomb: { points: -10, count: 0 },
    };
   
  }

  preload() {
    ///cargar assets
  
    //import cielo
    this.load.image("cielo","./public/assets/Cielo.webp");

    //import plataforma
    this.load.image("plataforma","./public/assets/platform.png");
   
    //import ninja
    this.load.image("ninja","./public/assets/Ninja.png");

    //recolectables
    this.load.image("roca","./public/assets/roca 2.1.png");
    this.load.image("araña","./public/assets/araña1.png");
    this.load.image("meteoro","./public/assets/meteoro 2.webp");
    this.load.image("bomb","./public/assets/bomba 3.3.png");
  }



    create() {
      // Create elements
      this.sky = this.add.image(400, 300, "cielo");
      this.sky.setScale(2);
      // Create platforms group
      this.platforms = this.physics.add.staticGroup();
      // Add a platform to the group
      this.platforms.create(400, 568,"plataforma").setScale(2).refreshBody();
      // Add another platform at a different position
      this.platforms.create(200, 400, "plataforma" );
      // Create character
      this.character = this.physics.add.sprite(400, 300, "ninja");
      this.character.setScale(0.1);
      this.character.setCollideWorldBounds(true);
      // Add collision between character and platform
      this.physics.add.collider(this.character, this.platforms);
      // Create cursor keys
      this.cursors = this.input.keyboard.createCursorKeys();
      // Create collectibles group
      this.collectibles = this.physics.add.group();
      // 1-second event
      this.time.addEvent({
        delay: 1000,
        callback: this.onSecond,
        callbackScope: this,
        loop: true,
      });
      // Add 'R' key
      this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      // 1-second event for timer
      this.time.addEvent({
        delay: 1000,
        callback: this.handleTimer,
        callbackScope: this,
        loop: true,
      });
      // Add timer text in the top-right corner
      this.timerText = this.add.text(10, 10, `Time left: ${this.timer}`, {
        fontSize: "32px",
        fill: "#fff",
      });
      this.scoreText = this.add.text(
        10,
        50,
        `Score: ${this.score}
          T: ${this.shapes["roca"].count}
          S: ${this.shapes["araña"].count}
          D: ${this.shapes["meteoro"].count}`
      );
      // Add collider between collectibles and character
      this.physics.add.collider(
        this.character,
        this.collectibles,
        this.onShapeCollect,
        null,
        this
      );
      // Add collider between collectibles and platforms
      this.physics.add.collider(
        this.collectibles,
        this.platforms,
        this.onCollectibleBounced,
        null,
        this
      );
    }
  
    update() {
      if (this.gameOver && this.rKey.isDown) {
        this.scene.restart();
      }
      if (this.gameOver) {
        this.physics.pause();
        this.timerText.setText("Game Over");
        return;
      }
      // Character movement
      if (this.cursors.left.isDown) {
        this.character.setVelocityX(-160);
      } else if (this.cursors.right.isDown) {
        this.character.setVelocityX(160);
      } else {
        this.character.setVelocityX(0);
      }
      if (this.cursors.up.isDown && this.character.body.touching.down) {
        this.character.setVelocityY(-330);
      }
    }
  
    onSecond() {
      if (this.gameOver) {
        return;
      }
      // Create collectible
      const types = ["roca", "araña", "meteoro", "bomb"];
      const type = Phaser.Math.RND.pick(types);
      let collectible = this.collectibles.create(
        Phaser.Math.Between(10, 790),
        0,
        type
      ).setScale (0.3)
      collectible.setVelocity(0, 100);
      // Set bounce: find a number between 0.4 and 0.8
      const bounce = Phaser.Math.FloatBetween(0.4, 0.8);
      collectible.setBounce(bounce);
      // Set data
      collectible.setData("points", this.shapes[type].points);
      collectible.setData("type", type);
    }
  
    onShapeCollect(character, collectible) {
      const typeName = collectible.getData("type");
      const points = collectible.getData("points");
      this.score += points;
      this.shapes[typeName].count += 1;
      console.table(this.shapes);
      console.log("Collected ", collectible.texture.key, points);
      console.log("Score ", this.score);
      collectible.destroy();
      this.scoreText.setText(
        `Score: ${this.score}
          T: ${this.shapes["roca"].count}
          S: ${this.shapes["araña"].count}
          D: ${this.shapes["meteoro"].count}`
      );
      this.checkWin();
    }
  
    checkWin() {
      const meetsPoints = this.score >= 100;
      const meetsShapes =
        this.shapes["roca"].count >= 2 &&
        this.shapes["araña"].count >= 2 &&
        this.shapes["meteoro"].count >= 2;
      if (meetsPoints && meetsShapes) {
        console.log("You won");
        this.scene.start("end", {
          score: this.score,
          gameOver: this.gameOver,
        });
      }
    }
  
    handleTimer() {
      this.timer -= 1;
      this.timerText.setText(`Time left: ${this.timer}`);
      if (this.timer === 0) {
        this.gameOver = true;
        this.scene.start("end", {
          score: this.score,
          gameOver: this.gameOver,
        });
      }
    }
  
    onCollectibleBounced(collectible, platform) {
      console.log("Collectible bounced");
      let points = collectible.getData("points");
      points -= 5;
      collectible.setData("points", points);
      if (points <= 0) {
        collectible.destroy();
      }
    }
  }
