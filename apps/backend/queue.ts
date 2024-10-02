export class QueueClient {
  baseURL = 'http://localhost:4040';

  async enqueue(item: any): Promise<void> {
    const url = new URL('/enqueue', this.baseURL);
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(item),
    });
    // TODO - Handle error
    // const json = await response.json();
  }

  async dequeue(): Promise<any | undefined> {
    const url = new URL('/dequeue', this.baseURL);
    const response = await fetch(url, {
      method: 'POST',
    });
    const json = await response.json();
    return json?.item;
  }
}
