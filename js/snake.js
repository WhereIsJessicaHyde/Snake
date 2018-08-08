//El constructor de la función definirá el cuerpo inicial de la serpiente
//y la dirección inicial que tomará

function Snake(options) {
  this.direction = 'right';
  this.body = [
    {row: 1, column: 5},
    {row: 1, column: 4},
    {row: 1, column: 3},
    {row: 1, column: 2},
    {row: 1, column: 1}
  ];
}
/*Vamos a definir las funciones de movimiento. La serpiente puede tomar cuatro
 direcciones diferentes: arriba, abajo, izquierda y derecha. Dependiendo de la
 dirección actual, tendremos que establecer la nueva dirección que tomará: */

 Snake.prototype.goLeft = function() {
   if (this.direction === 'up' || this.direction === 'down'){
     this.direction = 'left';
   }
 };

 Snake.prototype.goRight = function() {
   if (this.direction === 'up' || this.direction === 'down'){
     this.direction = 'right';
   }
 };

 Snake.prototype.goUp = function() {
   if (this.direction === 'left' || this.direction === 'right'){
     this.direction = 'up';
   }
 };

 Snake.prototype.goDown = function() {
   if (this.direction === 'left' || this.direction === 'right'){
     this.direction = 'down';
   }
 };

 /* Ahora tenemos que definir la función moveForward para poder mover la serpiente
  dependiendo de la dirección actual */

  Snake.prototype.moveForward = function(maxRows, maxColumns) {
    var head = this.body[0];

    switch(this.direction){
      case 'up':
        this.body.unshift({
          row: (head.row - 1 + maxRows ) % maxRows,
          column: head.column
        });
        break;
      case 'down':
        this.body.unshift({
          row: (head.row + 1) % maxRows,
          column: head.column
        });
        break;
      case 'left':
        this.body.unshift({
          row: head.row,
          column: (head.column - 1 + maxColumns) % maxColumns
        });
        break;
      case 'right':
        this.body.unshift({
          row: head.row,
          column: (head.column + 1) % maxColumns
        });
        break;
    }

// la primera version fue this.body.pop();
    this.previousTail = this.body.pop();
  };

/* Vamos a crear la función para hacer que la serpiente crezca.

Snake.prototype.moveForward = function(maxRows, maxColumns) {
// ...
this.previousTail = this.body.pop();
} */

    Snake.prototype.grow = function(){
      if (this.previousTail){
        this.body.push(this.previousTail);
        this.previousTail = undefined;
      }
    };

/* Ha comido comida: Solo tenemos que verificar si la cabeza de la serpiente está
 en contacto con la posición de la comida. */

 Snake.prototype.hasEatenFood = function(foodPosition){
  return this.body[0].row === foodPosition.row
         && this.body[0].column === foodPosition.column;
};

// La serpiente se ha comido a sí misma

Snake.prototype.hasEatenItself = function(){
  return this.body.some(function (element, index, array) {
    return (element.row === array[0].row
            && element.column === array[0].column
            && index != 0)
  });
};

//evitar que aparezca nueva comida en una posicion que ya ocupe el cuerpo de
//la serpiente

Snake.prototype.collidesWith = function(position){
  return this.body.some(function (element){
    return element.row === position.row
           && element.column === position.column;
  });
};
