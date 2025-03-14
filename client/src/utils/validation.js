// src/utils/validation.js
// This file will hold some validation functions.

// This fuction will check to see if a value is empty or not.
// Check for undefined, null, an empty object or empty string
// return true if any of these test are true, false otherwise.
export const is_Empty = (value) => 
  value === undefined || 
  value === null || 
  (typeof value === 'object' && Object.keys(value).length === 0 ) ||
  (typeof value === 'string' && value.trim().length === 0);

// Check to see if a string has any special characters in it.
// This function will use a regular expression to test a value to see if it conatians a special character.
// Parameter: value, the string we are testing
// Return true if there is a special character, false if there is only a-z or A-Z characters
export const alpha = (value) => {
  // ^ = not, a-zA-Z (sets if alpha chars), + more then one match
  let ex = /[^a-zA-Z]+/;
  const result = ex.test(value);
  return result
}

// console.log(alpha('Hello')); // False
// console.log(alpha('!hello')); // True
// console.log(alpha('Hello!')); // True
// console.log(alpha('894Gkdl!')); // True

// let test = '';
// console.log(is_Empty(test)); // True
// test = null;
// console.log(is_Empty(test)); // True
// test = 'Hello';
// console.log(is_Empty(test)); // False
// test = {}
// console.log(is_Empty(test)); // True