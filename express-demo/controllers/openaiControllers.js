const { OpenAIApi, Configuration } = require('openai')

const config = new Configuration({
  apiKey: ''
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
  listModels: async (req, res) => {
    const { data } = await openai.listModels()
    res.send(resSuccess({ data: data.data}))
  },
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
    const { prompt } = req.body
    const { data } = await openai.createCompletion({
      model: 'text-davinci-001',
      prompt,
      temperature: 0.5,
      max_tokens: 2000,
      best_of: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      logprobs: 0,
      top_p: 1
    })
    res.send(resSuccess({ data: data.choices[0].text}))
  }
}

module.exports = openaiControllers