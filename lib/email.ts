import { createId } from './ids';
import { delay } from './timing';
import { randomFailure } from './chaos';
import { logger } from './logger';

export const template = {
  compile: function (name: any, message: any) {
    return `<html><body><p>Hi there, welcome to our product</p><p>${message}</p></body></html>`;
  },
};

export const emailAPI = {
  send: async function (name: any, message: any) {
    await delay(100, 200);
    randomFailure(0.2, 'Email API: 500 Internal Server Error');
    logger.debug('Email sent successfully');
    return { emailId: createId() };
  },
};
