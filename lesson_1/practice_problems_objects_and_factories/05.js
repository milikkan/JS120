function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,
  
    getDescription() {
      return `${this.title} was written by ${this.author}.`;
    }
  };
}

let book1 = createBook('Mythos', 'Stephen Fry', true);
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse', true);

console.log(book1.read);  // true
console.log(book2.read);  // false
console.log(book3.read);  // true