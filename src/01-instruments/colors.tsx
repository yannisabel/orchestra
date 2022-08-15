export const allColors = [
  {
    name: '$black-0',
    value: '#000000',
  },
  {
    name: '$black-V0--T10',
    value: 'rgba($black-0, .10)',
  },
  {
    name: '$black-V0--T25',
    value: 'rgba($black-0, .25)',
  },
  {
    name: '$black-V0--T50',
    value: 'rgba($black-0, .50)',
  },
  {
    name: '$black-V0--T75',
    value: 'rgba($black-0, .75)',
  },
  {
    name: '$black-V0--T90',
    value: 'rgba($black-0, .90)',
  },
  {
    name: '$white-0',
    value: '#FFFFFF',
  },
  {
    name: '$white-V0--T75',
    value: 'rgba($white-0, .75)',
  },
  {
    name: '$grey-0',
    value: '#CCCCCC',
  },
  {
    name: '$grey-10',
    value: '#D1D1D1',
  },
  {
    name: '$grey-50',
    value: '#919191',
  },
  {
    name: '$grey-60',
    value: '#7C7C7C',
  },
  {
    name: '$grey-100',
    value: '#333333',
  },
  {
    name: '$grey-V0--T2',
    value: 'rgba($grey-0, .2)',
  },
  {
    name: '$blue-0',
    value: '#D2E2EE',
  },
  {
    name: '$blue-10',
    value: '#6BBEFF',
  },
  {
    name: '$blue-20',
    value: '#3A73A0',
  },
  {
    name: '$blue-30',
    value: '#264B68',
  },
  {
    name: '$blue-40',
    value: '#404555',
  },
  {
    name: '$blue-50',
    value: '#282933',
  },
  {
    name: '$blue-100',
    value: '#212228',
  },
  {
    name: '$orange-0',
    value: '#FF811F',
  },
  {
    name: '$orange-10',
    value: '#EB6700',
  },
]

export const ColorList = () => {
  return allColors.map((color) => {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{
          borderRadius: '8px',
          backgroundColor: color.value, width: 50, height: 50
        }}></div>
        <p key={color.name}>
          name: {color.name}, value: {color.value}
        </p>
      </div>
    )
  })
}
