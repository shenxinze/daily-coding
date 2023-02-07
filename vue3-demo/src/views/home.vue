<template>
	<div class="home">
		<el-container>
			<el-aside width="240px">
				<SidebarNav />
			</el-aside>
			<el-container>
				<el-header>
					<CommonHeader />
				</el-header>
				<el-main>
					<div class="container">
						<el-scrollbar>
							<router-view />
						</el-scrollbar>
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import SidebarNav from '@/components/layout/sidebarNav.vue'
import CommonHeader from '@/components/layout/commonHeader.vue'
</script>

<style lang="scss" scoped>
.home {
	height: 100%;
	display: flex;
	background-color: #3385ff;
	.el-header {
		height: auto;
		padding: 0;
	}
	.el-main {
		position: relative;
		background-color: #f0f2fa;
		padding: 0 20px 20px;
	}
}
</style>
