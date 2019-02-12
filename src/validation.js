// @flow

import { contains, split } from 'rambda';
import { parse, isBefore, format } from 'date-fns';
import { now } from './now';

export function validateName(input: string = ''): boolean {
  if (input && /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(input)) {
    return true;
  }
  return false;
}

export function validateEmail(input: string = ''): boolean {
  const emailRx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return !!input && emailRx.test(input);
}

export function validatePhoneNumber(input: string = ''): boolean {
  // from https://stackoverflow.com/questions/11518035/regular-expression-for-gb-based-and-only-numeric-phone-number
  const phoneRx = /^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?$/;

  return phoneRx.test(input);
}

export function validateNumPeople(input: number): boolean {
  return input > 0;
}

export function validateDate(input: string = '2001/09/11'): boolean {
  // TODO
  const [YYYY, MM, DD] = split('-')(input);
  console.debug(`input: ${DD} / ${MM} / ${YYYY}`);
  const today = now();
  const todayFormatted = format(today, 'YYYY-MM-DD');
  if (!input) {
    return false;
  }
  console.log(`YYYY/MM/DD = ${YYYY}/${MM}/${DD}`);
  const parsed = parse(new Date(YYYY, MM - 1, DD));
  console.debug(`checking if ${input} is today`);

  if (todayFormatted === input) {
    console.debug('input is today. valid.');
    return true;
  }

  console.debug(`checking if ${parsed} is before/after ${today}`);

  if (isBefore(parsed, today)) {
    console.error(`given date is in the past`);
    return false;
  }
  console.debug(`given date is in the future :)`);
  return true;
}

export function validateTime(input: string = '00:00'): boolean {
  const [hh, mm] = split(':')(input);
  const hour = parseInt(hh, 10);
  const minutes = parseInt(mm, 10);
  if (hour > 3 && hour < 18) {
    return false;
  }

  if (hour === 3 && minutes > 0) {
    return false;
  }

  if (minutes > 59) {
    return false;
  }

  // console.debug(`${input} is a valid time`);

  return true;
}

export const validate = {
  name: validateName
};

export default validate;
