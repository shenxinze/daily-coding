window.scrollTo({ top: 0 })
const parts = document.querySelectorAll('.part')
let partIndex = 0
let prevPartIndex = 0
const duration = 0.05

gsap.set(parts[partIndex], { opacity: 1 })
gsap.set(parts[partIndex].querySelectorAll('h2'), { y: 0 })
gsap.set(parts[partIndex].querySelector('p'), { y: 0, opacity: 1 })

Array.from(parts).slice(1).forEach(part => {
  gsap.set(part.querySelectorAll('h2'), { y: 100 })
  gsap.set(part.querySelector('p'), { y: 100, opacity: 0 })
})


let lastTime = 0
const throttle = (func, timeFrame) => {
  return () => {
    var now = Date.now()
    if (now - lastTime >= timeFrame) {
      func()
      lastTime = now
    }
  }
}

const disableScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop)
  }
}

const enableScroll = () => {
  window.onscroll = () => {}
}

// 进入效果
const inAnimate = partIndex => {
  return gsap
    .timeline({ defaults: { duration: duration }})
    .to(
      parts[partIndex],
      {
        opacity: 1
      },
      '>+0.5'
    )
    .to(
      parts[partIndex].querySelectorAll('h2'),
      {
        y: 0
      },
      '>'
    )
    .to(
      parts[partIndex].querySelector('p'),
      {
        y: 0,
        opacity: 1
      },
      '>'
    )
}
// 退出效果
const outAnimte = partIndex => {
  return gsap
    .timeline({ defaults: { duration: duration }})
    .to(
      parts[partIndex].querySelectorAll('h2'),
      {
        y: 100
      },
      0
    )
    .to(
      parts[partIndex].querySelector('p'),
      {
        y: 100,
        opacity: 0
      },
      0
    )
    .to(
      parts[partIndex],
      {
        opacity: 0
      },
      '>'
    )
}
const animatePart = () => {
  const timeline = gsap.timeline()
  timeline.timeScale(2)
  dotList[prevPartIndex].classList.remove('active')
  dotList[partIndex].classList.add('active')
  const tempPrevPartIndex = prevPartIndex
  prevPartIndex = partIndex
  timeline
    .add(outAnimte(tempPrevPartIndex))
    .add(inAnimate(partIndex))
}
// 切换页面
const jumpToPart = () => {
  line.style.width = (partIndex / (parts.length - 1) * 100 ) + '%'
  dotList[partIndex].classList.add('active')
  gsap.to(window, {
    duration: 2.5,
    scrollTo: {
      y: 100
    },
    ease: 'elastic.out(1.75, 0.3)',
    onStart: () => {
      enableScroll()
      gsap.delayedCall(0.85, () => {
        disableScroll()
        animatePart()
      })
    }
  })
}
// 监听鼠标滚动
window.addEventListener('wheel', e => {
  const callback = () => {
    const delta = e.deltaY
    if (delta > 0) {
      if (partIndex < parts.length - 1) {
        partIndex += 1
        jumpToPart()
      }
    } else {
      if (partIndex > 0) {
        partIndex -= 1
        jumpToPart()
      }
    }
  }
  const t = throttle(callback, 1000)
  t()
})
// disableScroll()
// footer 切换
const dotList = document.querySelectorAll('.progress-line li')
const line = document.querySelector('footer .line')
dotList[0].classList.add('active')
dotList.forEach((dot, i) => {
  dot.addEventListener('click', function(){
    partIndex = i
    jumpToPart()
    // dotList.forEach(dot => {
    //   dot.classList.remove('active')
    // })
    // this.classList.add('active')
  })
})

// 滚动条动画
// const scrollAnimate = gsap.to('')
ScrollTrigger.create({
  trigger: '.container',
  // animation: scrollAnimate,
  start: 'top top',
  end: 'center bottom',
  pin: true,
  markers: true,
  scrub: 0.6
})

