let car = null
fetch('/js/car.json').then(res => res.json()).then(res => {
  car = new Car(res.car)
})

class Car {
  data = []
  constructor(info){
    info && this._create(info)
  }
  _create = info => {
    info.forEach(car => {
      const dom = document.querySelector(car.id)
      const effect = gsap.to(dom, {
        duration: car.duration,
        ease: car.ease,
        x: car.position.x,
        y: car.position.y,
        repeat: car.repeat,
        repeatDelay: car.repeatDelay,
        paused: true
      })
      const audio = new Audio(`/sound/${car.sound_effect}`)
      const listener = this._addListener(dom, effect, audio)
      this.data.push({dom, effect, listener})
    })
  }
  _addListener = (dom, effect, audio) => { 
    let timer = null
    const click = dom.addEventListener('click', () => {
      this._clearTimer(timer)
      timer = setTimeout(() => {
        effect.paused(!effect.paused())
      }, 200)
    })
    const dblclick = dom.addEventListener('dblclick', () => {
      this._clearTimer(timer)
      audio.play()
    })
    return {click, dblclick}
  }
  _clearTimer = (timer) => {
    timer && clearTimeout(timer)
  }
  play = () => {
    this.data.forEach(car => {
      car.effect.play()
    })
  }
  paused = () => {
    this.data.forEach(car => {
      car.effect.play()
    })
  }
}

