
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
///
//Given a class `Animal` create two classes `Cat` and `Dog` that inherits from it.
//the `Cat` constructor should take 3 arguments, `name`, `age`, and `status`. Cats should always have a leg count of 4 and a species of `cat`. 
//the `introduce` method should be identical to the original except, after the phrase there should be a single space and the words `Meow meow!`.

/*The `Dog` constructor should take 4 arguments, `name`, `age`, `status` and `master`. Dogs should always have a leg count of 4 and a species of `dog`. 
For the `introduce` method, they should have their own method called `greetMaster()`, which accepts no arguments and returns `Hello (master's name)! Woof, woof!' */

// class Animal {
//   constructor(name, age, legs, species, status) {
//     this.name = name;
//     this.age = age;
//     this.legs = legs;
//     this.species = species;
//     this.status = status;
//   }

//   introduce() {
//     return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
//   }
// }

// class Cat extends Animal {
//   constructor(name, age, status) {
//     super(name, age, 4, 'cat', status);
//   }

//   introduce() {
//     return super.introduce() + ' Meow meow!'
//   }
// }

// class Dog extends Animal {
//   constructor(name, age, status, master) {
//     super(name, age, 4, 'dog', status);
//     this.master = master;
//   }

//   introduce() {
//     return `${this.greetMaster()}`
//   }

//   greetMaster() {
//     return `Hello ${this.master}! Woof woof!`
//   }
// }

// let peppermint = new Dog('Peppermint', 8, 'alive', 'Doffy')
// let sugar = new Cat('Sugar', 8, 'alive');
// console.log(peppermint.introduce());
// console.log(sugar.introduce());

//refactor these classes so they have the same super class.
// class Vehicle {
//   constructor(make, model) {
//     this.make = make;
//     this.model = model;
//   }

//   info() {
//     return `${this.make} ${this.model}`;
//   }
// }
// class Car extends Vehicle {
//   wheels() {
//     return 4;
//   }
// }

// class Motorcycle extends Vehicle {
//   getWheels() {
//     return 2;
//   }
// }

// class Truck extends Vehicle {
//   constructor(make, model, payload) {
//     super(make, model)
//     this.payload = payload;
//   }

//   getWheels() {
//     return 6;
//   }
// }

///shouter: rewrite these two object types to use `class` keyword, instead of direct prorotype manipulation. `Person exposes method `greeting` which when called logs the provided greeting text. `Shouter is a subtype of `perosn ` is a bit loud whatever he says is uppercased.

// class Person {
//   greeting(text) {
//     console.log(`${text}`);
//   }
// }

// class Shouter extends Person {
//   greeting(text) {
//     return super.greeting(text.toUpperCase());
//   }
// }

// let person = new Person();
// let shouter = new Shouter();

// person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
// shouter.greeting("Hello my friend."); // HELLO MY FRIEND.

// let walker = {
//   walk() {
//     return `${this.name} ${this.gait()} forwards`
//   }
// }
// class Person {
//   constructor(name) {
//     this.name = name;
//   }

//   gait() {
//     return "strolls";
//   }
// }

// class Cat {
//   constructor(name) {
//     this.name = name;
//   }

//   gait() {
//     return "saunters";
//   }
// }

// class Cheetah {
//   constructor(name) {
//     this.name = name;
//   }

//   gait() {
//     return "runs";
//   }
// }

// Object.assign(Person.prototype, walker);
// Object.assign(Cat.prototype, walker);
// Object.assign(Cheetah.prototype, walker)

// let mike = new Person("Mike");
// console.log(mike.walk());
// // "Mike strolls forward"

// let kitty = new Cat("Kitty");
// console.log(kitty.walk());
// // "Kitty saunters forward"

// let flash = new Cheetah("Flash");
// console.log(flash.walk());
// // "Flash runs forward"

//write the classes and methods that will be necessary to make this code run, and log the following output:
// class Pet {
//   constructor(species, name) {
//     this.species = species;
//     this.name = name;
//   }

//   info() {
//     return `a ${this.species} named ${this.name}`
//   }
// }

// class Owner {
//   constructor(name) {
//     this.name = name;
//     this.listOfPets = [];
//   }

//   addPet(pet) {
//     this.listOfPets.push(pet)
//   }

//   numberOfPets() {
//     return this.listOfPets.length;
//   }

//   printPet() {
//     this.listOfPets.forEach(pet => console.log(pet.info()))
//   }
// }

// class Shelter {
//   constructor() {
//     this.listOfOwnerNames = [];
//   }

//   adopt(masterName, pet) {
//    if(!this.listOfOwnerNames.includes(masterName)) {
//      this.listOfOwnerNames.push(masterName);
//    }
//     masterName.addPet(pet);
//   }

//   printAdoptions() {
//     this.listOfOwnerNames.forEach(owner => {
//       console.log(`${owner.name} has adopted the following pets:`);
//       owner.printPet();
//     })
//   }
// }

// let butterscotch = new Pet('cat', 'Butterscotch');
// let pudding      = new Pet('cat', 'Pudding');
// let darwin       = new Pet('bearded dragon', 'Darwin');
// let kennedy      = new Pet('dog', 'Kennedy');
// let sweetie      = new Pet('parakeet', 'Sweetie Pie');
// let molly        = new Pet('dog', 'Molly');
// let chester      = new Pet('fish', 'Chester');

// let phanson = new Owner('P Hanson');
// let bholmes = new Owner('B Holmes');

// let shelter = new Shelter();
// shelter.adopt(phanson, butterscotch);
// shelter.adopt(phanson, pudding);
// shelter.adopt(phanson, darwin);
// shelter.adopt(bholmes, kennedy);
// shelter.adopt(bholmes, sweetie);
// shelter.adopt(bholmes, molly);
// shelter.adopt(bholmes, chester);
// shelter.printAdoptions();
// console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
// console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);

class Banner {
  constructor(message) {
    this.message = message;
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return `+-${'-'.repeat(this.message.length)}-+`;
  }

  emptyLine() {
    return `|${' '.repeat(this.message.length + 2)}|`
  }

  messageLine() {
    return `| ${this.message} |`
  }
}

let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

let banner2 = new Banner('');
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+