function s(selector) {
    return document.querySelector(selector)
}

function sa(selector) {
    return document.querySelectorAll(selector)
}

function createSourceElement(filename) {
    const e = document.createElement('source')
    e.src = filename
    return e
}

function createTrackElement(subtitle) {
    const e = document.createElement('track')
    e.src = subtitle
    e.default = true
    return e
}

function showTrack(e) {
    e.textTracks[0].mode = "showing"
}

function hideTrack(e) {
    e.textTracks[0].mode = "disabled"
}

window.onload = () => {
    const videoList = [...sa('.video-data')]
        .map(item => {
            return {
                filename: item.dataset.filename,
                source: createSourceElement(item.dataset.filename),
                track: createTrackElement(item.dataset.subtitle),
            }
        })
    let currentVideoIndex = 0
    let currentVideo = videoList[currentVideoIndex]
    let isSubtitleShowing = false

    const video = s('.video')
    video.src = currentVideo.filename
    video.appendChild(currentVideo.track)
    hideTrack(video)

    const playButton = s('.play-button')
    playButton.onclick = () => {
        video.play()
        if (isSubtitleShowing) {
            hideTrack(video)
            showTrack(video)
        } else {
            showTrack(video)
            hideTrack(video)
        }
    }

    const pauseButton = s('.pause-button')
    pauseButton.onclick = () => {
        video.pause()
    }

    const subtitleOnButton = s('.subtitle-on-button')
    subtitleOnButton.onclick = () => {
        isSubtitleShowing = true
        showTrack(video)
    }

    const subtitleOffButton = s('.subtitle-off-button')
    subtitleOffButton.onclick = () => {
        isSubtitleShowing = false
        hideTrack(video)
    }

    const nextButton = s('.next-button')
    nextButton.onclick = () => {
        if (currentVideoIndex === videoList.length - 1) {
            return
        }
        // currentVideo.source.remove()
        currentVideo.track.remove()
        currentVideoIndex += 1
        currentVideo = videoList[currentVideoIndex]
        video.src = currentVideo.filename
        video.appendChild(currentVideo.track)
    }

    const prevButton = s('.prev-button')
    prevButton.onclick = () => {
        if (currentVideoIndex === 0) {
            return
        }
        // currentVideo.source.remove()
        currentVideo.track.remove()
        currentVideoIndex -= 1
        currentVideo = videoList[currentVideoIndex]
        video.src = currentVideo.filename
        video.appendChild(currentVideo.track)
    }
}
