function Queue() {
  this.queue = [];
}

Queue.prototype.enqueue = function enqueue(item) {
  this.queue.push(item);
};

Queue.prototype.dequeue = function dequeue() {
  this.queue.shift();
};

Queue.prototype.toArray = function toArray() {
  return this.queue;
};

module.exports = Queue;
