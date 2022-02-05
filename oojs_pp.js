
// //problem one
// console.log("Hello".constructor.name); //string
// console.log([1,2,3].constructor.name); //array
// console.log({name: 'Srdjan'}.constructor.name); //object 

//problem 2 - 6

// class Cat {
//   constructor(name) {
//     this.name = name;  
//   }

//   greet() {
//     console.log(`Hello! My name is ${this.name}`)

//   }
// }

// let kitty = new Cat('Sophie');
// kitty.greet();
// console.log(kitty instanceof Cat)

//problem 7

// class Person {
//   constructor (name = 'John Doe') {
//     this.name = name;
//   }
// }

// let person1 = new Person();
// let person2 = new Person('Pepe');

// console.log(person1.name); // John Doe
// console.log(person2.name) // Pepe

//problem 7 - 10

// class Cat {
//   constructor(name) {
//     this.name = name;
//   }

//   rename(newName) {
//     this.name = newName;
//   }

//   static genericGreeting() {
//     console.log('Hello, I am a cat!');
//   }

//   personalGreeting() {
//     console.log(`Hello, my name is ${this.name}`)
//   }
// }

// let kitty = new Cat('Sophie');
// console.log(kitty.name); // Sophie
// // kitty.rename('Chloe');
// console.log(kitty.name); // Chloe

// Cat.genericGreeting(); // 'Hello, I'm a Cat'
// kitty.personalGreeting();

//inheritance and mixins
//problem 

// class Vehicle {
//   constructor(year) {
//     this.year = year;
//   }

//   startEngine() {
//     console.log('Ready to go!')
//   }
// }

// class Truck extends Vehicle {
//   constructor(year, bedType) {
//     super(year);
//     this.bedType = bedType;
//   }
// }

// class Car extends Vehicle {}

// let truck = new Truck(2003, 'Short');
// console.log(truck.bedType)
// console.log(truck.year); // 2003

// // let car = new Car(2015);
// // console.log(car.year); // 2015

//Modify the `truck` class so that the code shown below displays the indicated output. Code should make use of the `startEngine` method in the `Vehicle` class.

// class Vehicle {
//   startEngine() {
//     return 'Ready to go!';
//   }
// }

// class Truck extends Vehicle {
//   startEngine(speed) {
//     return super.startEngine() + ` Drive ${speed}, please!`
//   }
// }

// let truck1 = new Truck();
// console.log(truck1.startEngine('fast'));

// let truck2 = new Truck();
// console.log(truck2.startEngine('slow'));

//create a mixin named WalkMixin that contains a method named `walk`. This method should return 'Let's go for a walk!' when invoked. Include WalkMixin in `Cat` and invoke walk on kitty

// let WalkMixin = {
//   walk() {
//     return "Let's go for a walk!";
//   }
// }
// class Cat {
//   constructor(name) {
//     this.name = name;
//   }

//   greet() {
//     return `Hello! My name is ${this.name}!`;
//   }
// }
// Object.assign(Cat.prototype, WalkMixin);
// let kitty = new Cat("Sophie");

// console.log(kitty.greet()); //Hello! My name is Sophie!
// console.log(kitty.walk()); //Let's go for a walk

/// Correct the following program so it works propertly, just makethe smallest possible change to ensure thatobjects of `Maltese` and `Fish` class have access to the `swim` method.

// const swimMixin = {
//   swim() {
//     return `${this.name} is swimming.`;
//   }
// }

// class Fish {
//   constructor(name) {
//     this.name = name;
//     Object.assign(this, swimMixin);
//   }
// }

// class Dog {
//   constructor(name) {
//     this.name = name;
//   }
// }

// class Maltese extends Dog {
//   constructor(dogName) {
//     super(dogName);
//     Object.assign(this, swimMixin)
//   }
// }

// let dog1 = new Maltese("Buddy");
// let fish1 = new Fish("Nemo");

// console.log(dog1.swim());
// console.log(fish1.swim());

//Create a `toMixin` mix-in that contains a method named `tow` that returns 'I can tow a trailer!' when invoked. include in the `Truck` class

// const toMixin = {
//   tow() {
//     return 'I can tow a trailer!';
//   }
// }

// class Vehicle {
//   constructor(year) {
//     this.year = year;
//     // return this.year;
//   }
// }
// class Truck extends Vehicle {
//   constructor(year) {
//     super(year);
//   }
// }

// class Car extends Vehicle {
//   constructor(year) {
//     super(year);
//   }
// }

// Object.assign(Truck.prototype, toMixin)

// let truck = new Truck(2002);
// console.log(truck.year);
// console.log(truck.tow());

// let car = new Car(2015);
// console.log(car.year);

///Easy
//Rectangles Prob 1 - 2
//create a class Rectangle= constructor should take two arguments which represents width and length respectively

// class Rectangle {
//   constructor (width, length) {
//     this.width = width;
//     this.length = length;
//   }

//   getWidth() {
//     return this.width;
//   }

//   getLength() {
//     return this.length;
//   }

//   getArea() {
//     return this.length * this.width;
//   }
// }
// // let rect = new Rectangle(4 ,5);

// // console.log(rect.getWidth()); //4
// // console.log(rect.getLength()); // 5
// // console.log(rect.getArea()); //20
// //write a class called `Square` that inherits from `Rectangle` and is used like this.

// class Square extends Rectangle{
//   constructor(lengthOfSide) {
//     super(lengthOfSide, lengthOfSide);
//   }
// }

// let square = new Square(5);
// console.log(`area of square is ${square.getArea()}`)

///without calling the `Cat` constructor, create an objet that looks and acts like `Cat` instance that doesn't have a defined name.

// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//   speaks() {
//     return `${this.name} says meowwww.`;
//   }
// }

// let fakeCat = Object.create(Cat.prototype);
// console.log(fakeCat instanceof Cat); // logs true
// console.log(fakeCat.name);           // logs undefined
// console.log(fakeCat.speaks());       // logs undefined says meowwww.

//Update this code so when you run it you see the following output:

// class Pet {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// class Cat extends Pet {
//   constructor(name, age, furType) {
//     super(name, age);
//     this.furType = furType;
//   }

//   info() {
//     return `My cat ${this.name} is ${this.age} years old and has ${this.furType} fur.`
//   }
// }

// let pudding = new Cat('Pudding', 7, 'black and white');
// let butterscotch = new Cat('Butterscotch', 10, 'tan and white');

// console.log(pudding.info()); //My cat Pudding is 7 years old and has black and white fur.
// console.log(butterscotch.info()) // My cat Butterscotch is 10 years old and has tan and white fur.

