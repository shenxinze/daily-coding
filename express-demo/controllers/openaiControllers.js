const { OpenAIApi, Configuration } = require('openai')

const config = new Configuration({
  apiKey: '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'
})

const openai = new OpenAIApi(config)

const resSuccess = (data = null, msg = '', code = 0, success = true) => {
  const obj = {
    code,
    success,
    msg
  }
  return data ? Object.assign({}, obj, {data}) : obj
}

const openaiControllers = {
  createImg: async (req, res) => {
    const { prompt, n = 1, size = '256x256' } = req.body
    const { data } = await openai.createImage({
      prompt,
      n,
      size
    })
    res.send(resSuccess({ imgUrl: data.data}))
  },
  completion: async (req, res) => {
    const { prompt, type } = req.body
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt} 翻译成${type === 0 ? '汉语' : '英语'}`
    })
    let str = data.choices[0].text
    str = str.replace('\n\n', '').replace('：', '')
    res.send(resSuccess({ data: str}))
  }
}

module.exports = openaiControllers