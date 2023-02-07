import { useState, createContext } from 'react'
// import { Button, Space } from 'antd'
// import { ForwardOutlined } from '@ant-design/icons'
import { Outlet, Link, useRoutes } from 'react-router-dom'
import routes from './router'
import context from '@/store'

function App() {
  const routesList = useRoutes(routes)
  const [age, setAge] = useState(18)
  const change = (val: number) => {
    setAge(val)
  }
  return (
    <context.Provider value={{name: 'shenxinze', age: age, change}}>
      <div className="App">
        {/* <Link to='/home'>home</Link>
        <Link to='/about'>about</Link> */}

        {/* 占位符组件，类似于vue中的<router-view /> */}
        {/* <Outlet /> */}

        {routesList}
      </div>
    </context.Provider>
  )
}

export default App
