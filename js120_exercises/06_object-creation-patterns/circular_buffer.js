class CircularBuffer {
  constructor(size) {
    this.size = size;
    this.buffer = new Array(3).fill(null);
    this.nextPos = 0;
    this.oldestPos = undefined;
  }

  put(newItem) {
    if (this.isBufferFull()) {
      this.buffer[this.oldestPos] = newItem;
      this.oldestPos = this.incrementIndex(this.oldestPos);
    } else {
      this.buffer[this.nextPos] = newItem;
    }

    if (this.oldestPos === undefined) {
      this.oldestPos = this.nextPos;
    }
    this.nextPos = this.incrementIndex(this.nextPos);
  }

  get() {
    if (this.oldestPos !== undefined) {
      let itemToRemove = this.buffer[this.oldestPos];
      this.buffer[this.oldestPos] = null;
      if (this.isBufferEmpty()) {
        this.oldestPos = undefined;
      } else {
        this.oldestPos = this.incrementIndex(this.oldestPos);
      }

      return itemToRemove;
    }
    return null;
  }

  isBufferFull() {
    return this.buffer.every(item => item !== null);
  }

  isBufferEmpty() {
    return this.buffer.every(item => item === null);
  }

  incrementIndex(idx) {
    return (idx + 1) % this.size;
  }
}

let buffer = new CircularBuffer(3);


console.log(buffer.get() === null);

buffer.put(1);
buffer.put(2);
console.log(buffer.get() === 1);

buffer.put(3);
buffer.put(4);
console.log(buffer.get() === 2);

buffer.put(5);
buffer.put(6);
buffer.put(7);
console.log(buffer.get() === 5);
console.log(buffer.get() === 6);
console.log(buffer.get() === 7);
console.log(buffer.get() === null);

let anotherbuffer = new CircularBuffer(4);
console.log(anotherbuffer.get() === null);

anotherbuffer.put(1)
anotherbuffer.put(2)
console.log(anotherbuffer.get() === 1);

anotherbuffer.put(3)
anotherbuffer.put(4)
console.log(anotherbuffer.get() === 2);

anotherbuffer.put(5)
anotherbuffer.put(6)
anotherbuffer.put(7)
console.log(anotherbuffer.get() === 4);
console.log(anotherbuffer.get() === 5);
console.log(anotherbuffer.get() === 6);
console.log(anotherbuffer.get() === 7);
console.log(anotherbuffer.get() === null);