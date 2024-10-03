export class Queue {
  storage = {};
  headIdx = 0;
  tailIdx = 0;

  enqueue(message: any): void {
    this.storage[this.tailIdx] = message;
    this.tailIdx++;
  }

  dequeue(): any | undefined {
    if (this.size() <= 0) return undefined;

    const message = this.storage[this.headIdx];
    delete this.storage[this.headIdx];
    this.headIdx++;

    // Reset counters if necessary
    if (this.headIdx === this.tailIdx) {
      this.headIdx = 0;
      this.tailIdx = 0;
    }
    return message;
  }

  size() {
    return this.tailIdx - this.headIdx;
  }

  peek() {
    return this.storage[this.headIdx];
  }
}
