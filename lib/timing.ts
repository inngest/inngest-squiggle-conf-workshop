const ENABLE_DELAYS = true;

export async function delay(low, high) {
  if (!ENABLE_DELAYS) {
    return;
  }
  const fakeDelay = Math.floor(Math.random() * (high - low)) + low;
  return await new Promise((res) => setTimeout(res, fakeDelay));
}
