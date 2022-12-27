<template>
  <div class="chat-gpt">
    <div>
      <el-tag type="success" :effect="tagIndex === i ? 'dark' : 'light'" v-for="item,i in list" :key="item" @click="tagHandler(i)">{{item}}</el-tag>
    </div>
    <div>
      <img :src="imgUrl[0]?.url" alt="">
      {{ textVal }}
    </div>
    <el-input v-model="chatVal" :suffix-icon="Search" size="large" @keyup.enter="enterHandler" />
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import http from '@/service/api'

interface ImgUrl {
  url: string
}
const tagIndex = ref(0)
const list = ref(['生成图片', '汉译英', '英译汉'])
const chatVal = ref('')
const translateType = ref(-1)
const tagHandler = (i: number) => {
  tagIndex.value = i
  if (i === 1) {
    translateType.value = 1
  } else if (i === 2) {
    translateType.value = 0
  } else {
    translateType.value = -1
  }
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
  // const res = await http.translate({question: chatVal.value})
  const res = await http.completion({prompt: chatVal.value, type: translateType.value})
  console.log('res', res)
  textVal.value = res.data
}

const enterHandler = () => {
  if (tagIndex.value === 0) {
    createImg()
  } else {
    translate()
  }
}
</script>

<style lang='scss' scoped>
.chat-gpt {
  width: 80%;
  margin: 0 auto;
  .el-tag {
    cursor: pointer;
    &+.el-tag {
      margin-left: 10px;
    }
  }
}
</style>