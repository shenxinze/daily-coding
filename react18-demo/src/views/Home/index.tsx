import React, { useState } from 'react'
import { Breadcrumb, Layout, theme } from 'antd'
import styles from './home.module.scss'
import { Outlet } from 'react-router-dom'
import MainMenu from '@/components/MainMenu'

const { Header, Content, Footer, Sider } = Layout

const Home: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer }
	} = theme.useToken()
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={value => setCollapsed(value)}>
				<div
					style={{
						height: 32,
						margin: 16,
						background: 'rgba(255, 255, 255, 0.2)'
					}}
				/>
				<MainMenu />
			</Sider>
			<Layout className='site-layout'>
				<Header style={{ padding: 0, background: colorBgContainer }}>
          <Breadcrumb className={styles.breadcrumb}>
						<Breadcrumb.Item>User</Breadcrumb.Item>
						<Breadcrumb.Item>Bill</Breadcrumb.Item>
					</Breadcrumb>
        </Header>
				<Content className={styles.content}>
					<Outlet />
				</Content>
				<Footer className={styles.footer}>
					Ant Design ©2023 Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	)
}

export default Home
