<template>
	<div class="header">
		<div class="header-search">
			<el-input
				v-model="searchVal"
				size="large"
				placeholder="搜索"
				:suffix-icon="Search" />
		</div>
		<div class="right-wrap">
			<div class="user-login-info">
				<el-avatar
					:size="40"
					src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
				<el-dropdown @command="command">
					<span class="el-dropdown-link">
						<span class="user-name">{{ username }}</span>
						<el-icon class="el-icon--right">
							<arrow-down />
						</el-icon>
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item command="exit">
								<el-icon size="16">
									<SwitchButton /> </el-icon
								>退出系统
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, ArrowDown, SwitchButton } from '@element-plus/icons-vue'

const searchVal = ref('')
const username = ref('Admin')
const command = (val: string) => {}
</script>

<style lang="scss" scoped>
.header {
	height: 72px;
	background-color: #fff;
	border-top-left-radius: 36px;
	padding: 0 20px 0 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.header-search {
		:deep(.el-input__wrapper) {
			border-radius: 50px;
		}
	}
	.right-wrap {
		display: flex;
	}
	.user-login-info {
		display: flex;
		align-items: center;
		.el-avatar {
			margin: 0 8px 0 15px;
		}
		.user-name {
			font-size: 14px;
			font-family: SourceHanSansCN-Regular, SourceHanSansCN;
			font-weight: 400;
			color: #666666;
		}
	}
}
</style>
