"use strict";

function factorial(n) {
  let answer = 1
  for (let i = 0; i < n; i++) {
  answer *= i + 1
  }
  return answer
}
