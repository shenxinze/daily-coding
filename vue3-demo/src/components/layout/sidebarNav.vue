<template>
	<div class="menu-wrap">
		<h1>这是Logo</h1>
		<el-scrollbar class="scroll-bar">
			<ul class="nav-list">
				<li
					:class="{ active: defaultActive === nav.path }"
					v-for="nav in menuList"
					:key="nav.path"
					@click="switchNav(nav.path)">
					<el-icon>
						<IconMenu />
					</el-icon>
					<span>{{ nav.name }}</span>
				</li>
			</ul>
		</el-scrollbar>
		<p>XXXXXX公司</p>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElScrollbar } from 'element-plus'
import { Menu as IconMenu } from '@element-plus/icons-vue'

const menuList = ref([{ path: '/chatGPT', name: 'ChatGPT', icon: 'home' }])
const router = useRouter()
const route = useRoute()

const defaultActive = computed(() => {
	return route.path
})

const switchNav = (path: string) => {
	router.push(path)
}
</script>

<style lang="scss" scoped>
.menu-wrap {
	height: 100%;
	overflow-y: hidden;
	background-color: #3385ff;
	position: relative;
	&::before {
		content: '';
		width: 200px;
		height: 200px;
		border-radius: 50%;
		position: absolute;
		left: -64px;
		top: -80px;
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0.32),
			rgba(255, 255, 255, 0)
		);
	}
	h1 {
		font-size: 24px;
		font-family: TRENDS;
		color: #ffffff;
		line-height: 24px;
		text-align: center;
		margin: 40px 0 86px;
	}
	.scroll-bar {
		height: calc(100vh - 150px - 84px);
	}
	.el-menu {
		border-right-color: transparent;
		:deep(.el-menu-item:hover) {
			position: relative;
		}
		:deep(.el-menu-item.is-active) {
			color: #fff;

			position: relative;
			&::before {
				content: '';
				width: calc(100% - 24px);
				height: 100%;
				background: rgba(255, 255, 255, 0.16);
				border-radius: 10px;
				position: absolute;
				left: 12px;
				top: 0;
			}
		}
	}
	p {
		line-height: 84px;
		font-size: 14px;
		font-family: SourceHanSansCN-Regular, SourceHanSansCN;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.4);
		text-align: center;
	}
}
.menu-list {
	height: 100px;
}
.nav-list {
	padding: 0 12px;
	li {
		font-size: 16px;
		font-family: SourceHanSansCN-Regular, SourceHanSansCN;
		font-weight: 400;
		color: #cbe0ff;
		cursor: pointer;

		height: 44px;
		background-color: transparent;
		border-radius: 10px;
		display: flex;
		align-items: center;
		transition: all 0.2s linear;
		.el-icon {
			margin: 0 16px 0 28px;
		}
		&:hover,
		&.active {
			font-family: SourceHanSansCN-Medium, SourceHanSansCN;
			font-weight: 500;
			color: #ffffff;
			background-color: rgba(255, 255, 255, 0.16);
		}
		& + li {
			margin-top: 10px;
		}
	}
}
</style>
