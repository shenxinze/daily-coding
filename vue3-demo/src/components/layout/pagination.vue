<template>
	<div class="pagination-wrap" :class="[center ? 'center' : 'right']">
		<el-pagination
			background
			hide-on-single-page
			:layout="layout"
			:total="total"
			:page-sizes="pageSizes"
			v-model:page-size="pageSize"
			v-model:current-page="currentPage"
			@size-change="sizeChange"
			@current-change="currentChange" />
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(
	defineProps<{
		layout?: string
		pageSizes?: number[]
		total?: number
		page?: number
		limit?: number
		center?: boolean
	}>(),
	{
		layout: 'sizes, total, prev, pager, next, jumper',
		pageSizes: () => [10, 20, 30, 50],
		total: 0,
		page: 1,
		limit: 10,
		center: true
	}
)

const emits = defineEmits(['change', 'update:page', 'update:limit'])

const currentPage = computed({
	get() {
		return props.page
	},
	set(val) {
		emits('update:page', val)
	}
})
const pageSize = computed({
	get() {
		return props.limit
	},
	set(val) {
		emits('update:limit', val)
	}
})

const sizeChange = (val: number) => {
	emits('change', { page: currentPage, limit: val })
}
const currentChange = (val: number) => {
	emits('change', { page: val, limit: pageSize })
}
</script>

<style lang="scss" scoped>
.pagination-wrap {
	margin: 30px 0 0;
	display: flex;
	&.center {
		justify-content: center;
	}
	&.right {
		justify-content: flex-end;
	}
}
</style>
