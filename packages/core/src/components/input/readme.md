# orchestra-input



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                               | Type                                                            | Default     |
| ----------------- | ------------------ | ------------------------------------------------------------------------- | --------------------------------------------------------------- | ----------- |
| `ariaDescribedby` | `aria-describedby` | Additional ID reference(s) describing the input.                          | `string`                                                        | `undefined` |
| `ariaLabel`       | `aria-label`       | Accessible name used when no visible label is provided.                   | `string`                                                        | `undefined` |
| `ariaLabelledby`  | `aria-labelledby`  | ID reference(s) for an accessible label.                                  | `string`                                                        | `undefined` |
| `autocomplete`    | `autocomplete`     | Autofill hint forwarded to the native input.                              | `string`                                                        | `undefined` |
| `disabled`        | `disabled`         | Prevents interaction and excludes the value from form submission.         | `boolean`                                                       | `false`     |
| `errorMessage`    | `error-message`    | Custom validation error shown below the input and used for form validity. | `string`                                                        | `undefined` |
| `helperText`      | `helper-text`      | Persistent supporting text shown below the input.                         | `string`                                                        | `undefined` |
| `htmlId`          | `html-id`          | The input's id, useful when associating an external label.                | `string`                                                        | `undefined` |
| `inputMode`       | `inputmode`        | Virtual keyboard hint forwarded to the native input.                      | `string`                                                        | `undefined` |
| `label`           | `label`            | The visible label for the input.                                          | `string`                                                        | `undefined` |
| `maxLength`       | `max-length`       | Maximum number of characters accepted by the native input.                | `number`                                                        | `undefined` |
| `minLength`       | `min-length`       | Minimum number of characters accepted by the native input.                | `number`                                                        | `undefined` |
| `name`            | `name`             | The name submitted with the input value.                                  | `string`                                                        | `''`        |
| `pattern`         | `pattern`          | Native pattern constraint applied to the input value.                     | `string`                                                        | `undefined` |
| `placeholder`     | `placeholder`      | A short hint shown when the input has no value.                           | `string`                                                        | `undefined` |
| `readOnly`        | `readonly`         | Prevents editing while keeping the value available to form submission.    | `boolean`                                                       | `false`     |
| `required`        | `required`         | Requires a value before the associated form can be submitted.             | `boolean`                                                       | `false`     |
| `type`            | `type`             | The kind of single-line text input to render.                             | `"email" \| "password" \| "search" \| "tel" \| "text" \| "url"` | `'text'`    |
| `value`           | `value`            | The current value of the input.                                           | `string`                                                        | `''`        |


## Events

| Event             | Description                                                                          | Type                  |
| ----------------- | ------------------------------------------------------------------------------------ | --------------------- |
| `orchestraChange` | Emitted when the user commits a value change. The event detail is the current value. | `CustomEvent<string>` |
| `orchestraInput`  | Emitted for each user edit. The event detail is the current value.                   | `CustomEvent<string>` |


## Methods

### `checkValidity() => Promise<boolean>`

Checks whether the input satisfies its constraints.

#### Returns

Type: `Promise<boolean>`



### `reportValidity() => Promise<boolean>`

Reports validity and prompts the browser to show its validation UI.

#### Returns

Type: `Promise<boolean>`



### `setCustomValidity(message: string) => Promise<void>`

Sets a custom validation message. Pass an empty string to clear it.

#### Parameters

| Name      | Type     | Description |
| --------- | -------- | ----------- |
| `message` | `string` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------


