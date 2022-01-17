/*Attributes
  Title: Mythos
  Author: Stephen Fry

Behavior:
  Get Description

-----------------------------
Attributes
  Title: Me Talk Pretty One Day
  Author: David Sedaris

Behavior:
  Get Description

-----------------------------
Attributes
 Title: Aunts aren't Gentlemen
 Author: PG Wodehouse

 Behavior:
   Get Description

Problem 1: Create three objects that represent the three books shown above. The method for the "Get Description" behavior should return a string like the following:
   "Me Talk Pretty one day was written by David Sedaris."
   */

function createBooks (title, author, status) {
  return {
    author: author,
    title: title,
    read: status,
    readStatus: 'I have not read it.',

    completedReading: function() {
      this.read = true; 
      this.readStatus = 'I have read it.';
    },

    getDescription: function (){
      return `${this.title} was written by ${this.author}. ${this.readStatus}`;
    }
  }
}

let test1 = createBooks('Mythos' , 'Stephen Fry', false);
test1.completedReading();
console.log(test1.getDescription());

// let test2 = createBooks('Me Talk Pretty One Day', 'David Sedaris', false);
// console.log(test2);

// let test3 = createBooks('Aunt\'s aren\'t Gentlemen', 'PG Wodehouse', false);
// console.log(test3.hasRead());