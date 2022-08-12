// videoplayer
function videoplayer() {
    const video = document.querySelector('.videoplayer__video');
    const presentationContainer = document.querySelector('.presentation__container');
    const bigPlayBtn = document.querySelector('.presentation__play');
    const videoplayerControls = document.querySelector('.videoplayer__controls');
    const playBtn = document.querySelector('.videoplayer__play');
    const stopBtn = document.querySelector('.videoplayer__stop');
    const progress = document.querySelector('.progress');
    const time = document.querySelector('.videoplayer__time');

    // play & pause video

    bigPlayBtn.addEventListener('click', () => {
        video.play();
        presentationContainer.classList.add('presentation__container--hidden');
        videoplayerControls.classList.remove('videoplayer__controls--hidden');
    });

    playBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    // stop video

    function stopVideo() {
        presentationContainer.classList.remove('presentation__container--hidden');
        videoplayerControls.classList.add('videoplayer__controls--hidden');
        video.load();
    }

    stopBtn.addEventListener('click', stopVideo);
    video.addEventListener('ended', stopVideo);

    // timer

    video.addEventListener('timeupdate', () => {
        progress.value = (video.currentTime / video.duration) * 100;
        let minutes = Math.floor(video.currentTime / 60);
        let seconds = Math.floor(video.currentTime % 60);
        time.innerHTML = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    });

    // set progress

    progress.addEventListener('change', () => {
        video.currentTime = (progress.value * video.duration) / 100;
    });
}

module.exports = videoplayer;