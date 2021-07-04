function s(selector) {
    return document.querySelector(selector)
}

function sa(selector) {
    return document.querySelectorAll(selector)
}

function createVideoElement(filename) {
    const videoElement = document.createElement('video')
    videoElement.src = filename
    return videoElement
}

function createTrackElement(subtitle) {
    const trackElement = document.createElement('track')
    trackElement.src = subtitle
    trackElement.default = true
    return trackElement
}

window.onload = () => {
    const videoList = [...sa('.video-data')]
        .map(item => { return { filename: item.dataset.filename, subtitle: item.dataset.subtitle } })
        .map(item => {
            const video = createVideoElement(item.filename)
            const track = createTrackElement(item.subtitle)
            video.appendChild(track)
            return video
        })

    let currentVideoIndex = 0

    const videoContainer = s('.video-container')
    videoContainer.appendChild(videoList[currentVideoIndex])

    const playButton = s('.play-button')
    playButton.onclick = () => {
        videoList[currentVideoIndex].play()
    }
}
