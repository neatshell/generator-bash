function getValuesFlags(flags) {
  const valuesFlags = [];
  flags.forEach((flag) => {
    flag.varValue = flag.varValue || 1;
    valuesFlags.push(flag);
  });
  return valuesFlags;
}

module.exports = {
  getValuesFlags: getValuesFlags,
};
