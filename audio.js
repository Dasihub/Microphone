let body, num, array, width, logo, My, src, height, context, analyser

body = document.querySelector('body')

num = 32

array = new Uint8Array(num * 2)

width = 10


window.onclick = function() {
    if (context) return
    document.querySelector('h1').remove()

    for (let index = 0; index < num; index++) {
        logo = document.createElement('div')
        logo.className = 'logo'
        logo.style.backgroundColor = 'red'
        logo.style.minWidth = width + 'px'
        body.appendChild(logo)
    }

    My = document.querySelectorAll('.logo')

    context = new AudioContext()
    analyser = context.createAnalyser()

    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
        src = context.createMediaStreamSource(stream)
        src.connect(analyser)
        loop()
    }).catch(err => {
        alert(`${err} Отклонена`)
    })
}

const loop = () => {
    window.requestAnimationFrame(loop)
    analyser.getByteFrequencyData(array)
    for (let index = 0; index < num; index++) {
    height = array[index + num]
    My[index].style.minHeight = height + 'px'
    My[index].style.opacity = 0.8 * height
    }
}