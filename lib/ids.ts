import crypto from 'crypto';

export function createId() {
  return crypto.randomBytes(16).toString('hex');
}
