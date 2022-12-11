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
  }
}

module.exports = openaiControllers