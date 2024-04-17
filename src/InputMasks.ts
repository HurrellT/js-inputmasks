import { setDecimalFormat } from "./formatters";

const InputMasks = {
  // date: {
  // DD_MM_YYYY: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  // MM_YYYY: [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  // },
  number: {
    DECIMAL: setDecimalFormat,
  },
};

export default InputMasks;
