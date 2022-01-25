module.exports = function check(str, bracketsConfig) {
  let openReg = [];
  let stack = [];
  let brackets = Object.fromEntries(bracketsConfig);
  Object.keys(brackets).forEach((item) =>
    isNaN(+item * "1") ? openReg.push(`\\${item}`) : openReg.push(`${item}`)
  );
  openReg = new RegExp(openReg.join("|"), "g");
  if (str.length % 2) return false;
  for (let i = 0; i < str.length; i++) {
    if (stack == 0 && str[i].match(openReg)) {
      stack.push(str[i]);
    } else if (stack == 0 && !str[i].match(openReg)) {
      return false;
    } else if (str[i].match(openReg) && str[i] != brackets[stack.slice(-1)]) {
      stack.push(str[i]);
    } else if (str[i] == brackets[stack.slice(-1)]) {
      stack.pop();
    }
  }
  return stack == 0 ? true : false;
};
