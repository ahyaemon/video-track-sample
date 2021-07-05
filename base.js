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
    let currentVideo = videoList[currentVideoIndex]
    let isSubtitleShowing = false

    const videoContainer = s('.video-container')
    videoContainer.appendChild(videoList[currentVideoIndex])

    const playButton = s('.play-button')
    playButton.onclick = () => {
        console.log(isSubtitleShowing)
        if (isSubtitleShowing) {
            currentVideo.textTracks[0].mode = "showing"
        } else {
            currentVideo.textTracks[0].mode = "disabled"
        }
        currentVideo.play()
    }

    const pauseButton = s('.pause-button')
    pauseButton.onclick = () => {
        currentVideo.pause()
    }

    const subtitleOnButton = s('.subtitle-on-button')
    subtitleOnButton.onclick = () => {
        isSubtitleShowing = true
        currentVideo.textTracks[0].mode = "showing"
    }

    const subtitleOffButton = s('.subtitle-off-button')
    subtitleOffButton.onclick = () => {
        isSubtitleShowing = false
        currentVideo.textTracks[0].mode = "disabled"
    }

    const nextButton = s('.next-button')
    nextButton.onclick = () => {
        if (currentVideoIndex === videoList.length - 1) {
            return
        }
        currentVideo.remove()
        currentVideoIndex += 1
        currentVideo = videoList[currentVideoIndex]
        videoContainer.appendChild(currentVideo)
    }

    const prevButton = s('.prev-button')
    prevButton.onclick = () => {
        if (currentVideoIndex === 0) {
            return
        }
        currentVideo.remove()
        currentVideoIndex -= 1
        currentVideo = videoList[currentVideoIndex]
        videoContainer.appendChild(currentVideo)
    }
}
