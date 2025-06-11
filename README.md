# js-inputmasks

A lightweight JavaScript/TypeScript library for input masking, with a focus on decimal number formatting. This library was created to provide reliable currency number input masks for React Native inputs, but can be used in any JavaScript environment.

## Installation

```bash
npm install js-inputmasks
```

## Features

- Decimal number formatting with customizable:
  - Decimal separator (e.g., "." or ",")
  - Grouping/thousands separator (e.g., "," or ".")
  - Number of decimal places
  - Option to always show decimal places

## Usage

### Basic Example

```typescript
import { InputMasks } from 'js-inputmasks';
import { NumberFormatSettingsType } from 'js-inputmasks/dist/types/NumberFormatSettings';

// Define your number format settings
const numberFormatSettings: NumberFormatSettingsType = {
  decimalSeparator: '.',
  groupingSeparator: ','
};

// In your input's onChange handler:
const handleChange = (value: string) => {
  InputMasks.number.DECIMAL(
    value,
    (formattedValue) => {
      // Use the formatted value
      console.log(formattedValue);
    },
    numberFormatSettings
  );
};
```

### Advanced Usage

```typescript
// With optional parameters for decimal places
InputMasks.number.DECIMAL(
  value,
  (formattedValue) => {
    console.log(formattedValue);
  },
  numberFormatSettings,
  2,        // allowedDecimals: number of decimal places
  true      // alwaysShowDecimals: whether to always display decimal places
);
```

### Features

1. **Automatic Grouping**: Numbers are automatically grouped with the specified separator (e.g., "1,234,567")
2. **Decimal Handling**: 
   - Configurable decimal separator
   - Optional limit on decimal places
   - Option to always show decimal places (padded with zeros)
3. **Smart Input Handling**:
   - Prevents multiple decimal separators
   - Handles leading zeros intelligently
   - Samsung keyboard decimal separator bug fix included

### Example Outputs

```typescript
// With default settings (US format)
"1234.5" → "1,234.5"
"1234.50" → "1,234.50"

// With European format
// numberFormatSettings = { decimalSeparator: ',', groupingSeparator: '.' }
"1234,5" → "1.234,5"
"1234,50" → "1.234,50"

// With 2 decimal places, always shown
// allowedDecimals = 2, alwaysShowDecimals = true
"1234" → "1,234.00"
"1234.5" → "1,234.50"
```

## TypeScript Support

The library is written in TypeScript and includes type definitions. The main types you'll work with are:

```typescript
type NumberFormatSettingsType = {
  decimalSeparator: string;
  groupingSeparator: string;
};
```

## License

MIT
