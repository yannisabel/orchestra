# core-button



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                  | Type                                     | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------- | ----------- |
| `disabled` | `disabled` | A boolean indicating the disable state of the button. The `aria-disabled` attribute relies on this property. | `boolean`                                | `false`     |
| `size`     | `size`     | A string indicating the size variation of the button.                                                        | `"large" \| "medium" \| "small"`         | `'medium'`  |
| `type`     | `type`     | A string indicating the behavior of the button. It relies on `HTMLButtonElement['type']`                     | `"button" \| "reset" \| "submit"`        | `'button'`  |
| `variant`  | `variant`  | A string indicating the design variation of the button based on the level of importance.                     | `"primary" \| "secondary" \| "tertiary"` | `'primary'` |


## Slots

| Slot | Description                                 |
| ---- | ------------------------------------------- |
|      | Button content, such as a label or an icon. |


## Shadow Parts

| Part       | Description                                                                                     |
| ---------- | ----------------------------------------------------------------------------------------------- |
| `"button"` | The native button element. Carries `data-variant`, `data-size` and `data-disabled` state hooks. |


----------------------------------------------


