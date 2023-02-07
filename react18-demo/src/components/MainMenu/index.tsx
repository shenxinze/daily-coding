import React, { useState } from 'react'
import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

// type MenuItem = Required<MenuProps>['items'][number]

interface MenuItem {
	label: string,
	key: string,
	icon?: React.ReactNode,
	children?: MenuItem[]
}

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label
	} as MenuItem
}

const items: MenuItem[] = [
	getItem('栏目1', '/page1', <PieChartOutlined />),
	getItem('栏目2', '/page2', <DesktopOutlined />),
	getItem('栏目3', 'page3', <UserOutlined />, [
		getItem('栏目3-1', '/page3-1'),
		getItem('Bill', '4'),
		getItem('Alex', '5')
	]),
	getItem('Team', 'page4', <TeamOutlined />, [
		getItem('Team 1', '6'),
		getItem('Team 2', '8')
	]),
	getItem('Files', '9', <FileOutlined />)
]

const MainMenu: React.FC = () => {
  const navigateTo = useNavigate()
	const currentRoute = useLocation()
  const menuClick = ({key}: {key: string}) => {
    navigateTo(key)
  }
	let firstOpenKeys = ''
	firstOpenKeys = items.filter(item => item.children).find(item => (item.children as MenuItem[]).find(item => item.key === currentRoute.pathname))?.key as string
	const [openKeys, setOpenKeys] = useState([firstOpenKeys])
	const onOpenChange = (keys: string[]) => {
		setOpenKeys([keys.at(-1) as string])
	}
  return (
    <Menu
      theme='dark'
      defaultSelectedKeys={[currentRoute.pathname]}
      mode='inline'
      items={items}
      onClick={menuClick}
      onOpenChange={onOpenChange}
      openKeys={openKeys}
    />
  )
}

export default MainMenu