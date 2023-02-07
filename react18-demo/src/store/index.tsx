import React from 'react'

const testContext = React.createContext({
  name: 'shenxinze',
  age: 18,
  change: (val: number) => {}
})
export default testContext