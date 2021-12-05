class Game{
    constructor (){
      this.resetTitle = createElement("h2");
      this.resetButton = createButton("");
    }

    getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data) {
          gameState = data.val();
        });
      }
      update(state) {
        database.ref("/").update({
          gameState: state
        });
      }

      start() {
        player = new Player();
        playerCount = player.getCount();
    
        form = new Form();
        form.display();
    
        snowMan1Sprite = createSprite(width / 2 - 50, height - 100);
        snowMan1Sprite.addImage("snowMan1", snowMan1);
        snowMan1Sprite.scale = 0.2;
    
        
    
        snowMan2Sprite = createSprite(width / 2 + 100, height - 100);
        snowMan2Sprite.addImage("snowMan2", snowMan2);
        snowMan2Sprite.scale = 0.1;

    
        snowManarr = [snowMan1Sprite, snowMan2Sprite];
      }    

      handleElements() {
        form.hide();
        this.resetTitle.html("Reset Game");
        this.resetTitle.class("resetText");
        this.resetTitle.position(width / 2 + 200, 40);
    
        this.resetButton.class("resetButton");
        this.resetButton.position(width / 2 + 230, 100);
    
      }    


      play() {
        this.handleElements();
        this.handleResetButton();

        Player.getPlayersInfo();
        
        if (allPlayers !== undefined) {
          image(backgroundImg, 0, -height * 2, width, height * 2);
    
         
    
          //index of the array
          var index = 0;
          for (var plr in allPlayers) {
            //add 1 to the index for every loop
            index = index + 1;
    
            //use data form the database to display the cars in x and y direction
            var x = allPlayers[plr].positionX;
            var y = height - allPlayers[plr].positionY;

    
    
            snowManarr[index - 1].position.x = x;
            snowManarr[index - 1].position.y = y;
    
            if (index === player.index) {
              stroke(10);
              fill("red");
              ellipse(x, y, 60, 60);
    
    
              // Changing camera position in y direction
              camera.position.y = snowManarr[index - 1].position.y;
            }
          }
    
          this.handlePlayerControls();
    
          drawSprites();
        }

        
}

handleResetButton() {
  this.resetButton.mousePressed(() => {
    database.ref("/").set({
      playerCount: 0,
      gameState: 0,
      players: {},
    });
    window.location.reload();
  });
}

handlePlayerControls() {
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10;
        player.update();
      }
}
}

