<template>
	<div class="chat-gpt">
		<div>
			<el-tag
				type="success"
				:effect="tagIndex === i ? 'dark' : 'light'"
				v-for="(item, i) in list"
				:key="item"
				@click="tagHandler(i)"
				>{{ item }}</el-tag
			>
		</div>
		<div>
			<img :src="imgUrl[0]?.url" alt="" v-if="tagIndex === 0" />
			<highlightjs
				language="javascript"
				autodetect
				:code="textVal"
				v-else></highlightjs>
		</div>
		<el-input
			v-model="chatVal"
			:suffix-icon="Promotion"
			size="large"
			@keyup.enter="enterHandler" />
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Promotion } from '@element-plus/icons-vue'
import http from '@/service/api'

interface ImgUrl {
	url: string
}

const tagIndex = ref(0)
const list = ref(['生成图片', '对话'])
const chatVal = ref('')
const tagHandler = (i: number) => {
	tagIndex.value = i
}

const listModels = ref([])
const getListModels = async () => {
	const res = await http.listModels()
	listModels.value = res.data
}

const createImgParams = reactive({
	prompt: '',
	n: 1,
	size: '256x256'
})

const imgUrl = ref<ImgUrl[]>([])
const createImg = async () => {
	createImgParams.prompt = chatVal.value
	const res = await http.createImg(createImgParams)
	imgUrl.value = res.imgUrl
}

const textVal = ref('')
const translate = async () => {
	const res = await http.completion({ prompt: chatVal.value })
	textVal.value = res.data
}

const enterHandler = () => {
	textVal.value = ''
	if (tagIndex.value === 0) {
		createImg()
	} else {
		translate()
	}
}

onMounted(() => {
	getListModels()
})
</script>

<style lang="scss" scoped>
.chat-gpt {
	.el-tag {
		cursor: pointer;
		& + .el-tag {
			margin-left: 10px;
		}
	}
	:deep(.el-input__inner:focus + .el-input__suffix) {
		color: #409eff;
	}
}
</style>
