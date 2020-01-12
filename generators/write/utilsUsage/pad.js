function pad(descLeft, max) {
  let n = max - descLeft.length;
  let space = "  ";
  while (n > 0) {
    space += " ";
    n -= 1;
  }

  return descLeft + space;
}

module.exports = pad;
