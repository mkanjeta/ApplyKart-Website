export const FormatCurrency = (val) => {
  return new Intl.NumberFormat().format(val);
};
