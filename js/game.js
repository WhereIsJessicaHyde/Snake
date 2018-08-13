/* El constructor recibirá un argumento option para indicar las diferentes
propiedades que vamos a configurar.*/

function Game(options) {
  this.rows    = options.rows;
  this.columns = options.columns;
  this.snake   = options.snake;
  this.food    = undefined;

  for (var rowIndex = 0; rowIndex < options.rows; rowIndex++){
    for (var columnIndex = 0; columnIndex < options.columns; columnIndex++){
      $('.container').append($('<div>')
        .addClass('cell board')
        .attr('data-row', rowIndex)
        .attr('data-col', columnIndex)
      );
    }
  }

// vamos a crear this.drawSnake(), para llamar a la funcion
// dentro del constructor
this.drawSnake();

//llamamos a las funciones de generar y pintar comida
this.generateFood();
this.drawFood();

//llamamos a la funcion que controla el movimiento de las teclas
 this.assignControlsToKeys();


};

//Funcion que controla el movimiento de la serpiente con las teclas de direcciones
Game.prototype.assignControlsToKeys = function(){
  $('body').on('keydown', function(e) {
    switch (e.keyCode) {
      case 38: // arrow up
        this.snake.goUp();
        break;
      case 40: // arrow down
        this.snake.goDown();
        break;
      case 37: // arrow left
        this.snake.goLeft();
        break;
      case 39: // arrow right
        this.snake.goRight();
        break;
  //Agregamos una tecla p, para asignarle la funcion stop
  case 80: // p
    if (this.intervalId) {
      this.stop();
    } else {
      this.start();
    }
    break;

    }
  }.bind(this));
}
// generamos un alimento en una posicion aleatoria vacia

Game.prototype.generateFood = function() {
  do {
    this.food = {
      row: Math.floor(Math.random() * this.rows),
      column: Math.floor(Math.random() * this.columns)
    };
  } while (this.snake.collidesWith(this.food));
};

// funcion que dibuja la serpiente
Game.prototype.drawSnake = function() {
  this.snake.body.forEach( function(position, index) {
    var selector = '[data-row=' + position.row + '][data-col=' + position.column + ']';
    $(selector).addClass('snake');
  });
};

//Necesitamos declarar una función para borrar la serpiente actual antes de
//dibujar la nueva.
Game.prototype.clearSnake = function() {
  $('.snake').removeClass('snake');
};

// mostrar comida

Game.prototype.drawFood = function(){
  var selector = '[data-row=' + this.food.row + '][data-col=' + this.food.column + ']';
  $(selector).addClass('food');
};

//funcion que elimina la comida existente
Game.prototype.clearFood = function(){
  $(".food").removeClass('food');
  this.food = undefined;
};

//vamos a generar una funcion para comenzar el juego
Game.prototype.start = function(){
  //le vamos a añadir if(!this.intervalID){this.intervalId = ...} para la funcion
  //stop
  if(!this.intervalId) {
    this.intervalId = setInterval(this.update.bind(this), 100);
  }

};

//funcion stop
Game.prototype.stop = function(){
  if (this.intervalId){
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
};

Game.prototype.update = function(){
  this.snake.moveForward(this.rows, this.columns);
  //funciones que controlan el comportamiento de la comida
  if (this.snake.hasEatenFood(this.food)){
    this.snake.grow();
    this.clearFood();
    this.generateFood();
    this.drawFood();
  }
  //funcion que controla el final del juego
  if (this.snake.hasEatenItself()){
  alert('Game Over');
  this.stop();
}
  //aqui vamos a meter una funcion que elimine una serpiente dibujada existente
  //para poder pintar una nueva
  this.clearSnake();
  //pintamos la serpiente
  this.drawSnake();
};
