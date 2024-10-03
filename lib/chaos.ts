// Randomly throw an error at a certain frequency between 0 (never) and 1 (100%)
export function randomFailure(
  frequency = 0.5,
  message = 'Failed to execute :('
) {
  if (Math.random() < frequency) {
    throw new Error(message);
  }
}
