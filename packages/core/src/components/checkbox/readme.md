# orchestra-checkbox



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                | Type                       | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------ | -------------------------- | ----------- |
| `checked`     | `checked`      | A boolean indicating the checked state of the checkbox.                                    | `boolean`                  | `false`     |
| `componentId` | `component-id` | The unique identifier for the checkbox. Used to associate with external label elements.    | `string`                   | `undefined` |
| `disabled`    | `disabled`     | A boolean indicating the disable state of the checkbox.                                    | `boolean`                  | `false`     |
| `name`        | `name`         | A string representing the name of the checkbox for form submission.                        | `string`                   | `''`        |
| `required`    | `required`     | A boolean indicating whether the field is required.                                        | `boolean`                  | `false`     |
| `value`       | `value`        | A string representing the value of the checkbox for form submission.                       | `string`                   | `'on'`      |
| `variant`     | `variant`      | A string indicating the design variation of the checkbox based on the level of importance. | `"primary" \| "secondary"` | `'primary'` |


## Events

| Event             | Description                                                | Type                   |
| ----------------- | ---------------------------------------------------------- | ---------------------- |
| `orchestraChange` | Native change event - emitted when checkbox state changes. | `CustomEvent<boolean>` |


----------------------------------------------


