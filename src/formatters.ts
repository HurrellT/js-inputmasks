import { NumberFormatSettingsType } from "./types/NumberFormatSettings";

export const setDecimalFormat = (
  value: string,
  fun: Function,
  numberFormatSettings: NumberFormatSettingsType,
  allowedDecimals?: number,
  alwaysShowDecimals?: boolean,
) => {
  // This is a workaround for samsung keyboard bug
  // It takes the last character of the entire string and replaces it with the decimal separator
  const lastDotOrCommaPattern = /[.,]$/;
  value = value.replace(
    lastDotOrCommaPattern,
    numberFormatSettings.decimalSeparator
  );

  if (value.length === 0) fun('');
  if (
    value.length > 1 &&
    value[0] === '0' &&
    value[1] !== numberFormatSettings.decimalSeparator
  )
    value = value.slice(1);
  if (
    value.match(new RegExp(`\\${numberFormatSettings.decimalSeparator}`, 'g'))
      ?.length > 1
  )
    return;
  if (
    new RegExp(`\\d|\\${numberFormatSettings.decimalSeparator}`).test(
      value[value.length - 1]
    )
  ) {
    fun(
      allowedDecimals
        ? addThousandsSeparator(
            value,
            numberFormatSettings,
            allowedDecimals,
            alwaysShowDecimals
          )
        : addThousandsSeparator(
            value,
            numberFormatSettings,
            undefined,
            alwaysShowDecimals
          )
    );
  }
};

const addThousandsSeparator = (
  number: string | number,
  numberFormatSettings: NumberFormatSettingsType,
  allowedDecimals?: number,
  alwaysShowDecimals?: boolean
) => {
  if (typeof number !== 'string' && typeof number !== 'number') {
    throw new Error('Input must be a string or a number.');
  }

  // Convert the number to a string and remove any existing thousands separators
  let numStr = String(number).replace(
    new RegExp(`[^\\d\\-${numberFormatSettings.decimalSeparator}]`, 'g'),
    ''
  );

  // Split the number into integer and decimal parts
  var [integerPart, decimalPart] = numStr.split(
    numberFormatSettings.decimalSeparator
  );

  // Add the thousands separators using a regex
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    numberFormatSettings.groupingSeparator
  );

  // Combine the integer and decimal parts with commas
  let formattedNumber = formattedIntegerPart;
  if (decimalPart !== undefined) {
    if (alwaysShowDecimals && allowedDecimals) {
      const extraDecimalNumbers =
        allowedDecimals - decimalPart.length < 0
          ? 0
          : allowedDecimals - decimalPart.length;

      const extraDecimals = '0'.repeat(extraDecimalNumbers);

      decimalPart += extraDecimals;
    }
    allowedDecimals
      ? (formattedNumber +=
          numberFormatSettings.decimalSeparator +
          decimalPart.substring(0, allowedDecimals))
      : (formattedNumber += numberFormatSettings.decimalSeparator + decimalPart);
  } else if (alwaysShowDecimals && allowedDecimals) {
    const extraDecimals = '0'.repeat(allowedDecimals);

    formattedNumber += numberFormatSettings.decimalSeparator + extraDecimals;
  }

  return formattedNumber;
};