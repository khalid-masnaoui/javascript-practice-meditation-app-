function khalid() {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.mouving-outline circle');
    const video = document.querySelector('.video-container video');

    const sounds = document.querySelectorAll('.rain-sun button');
    //time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    const outlineLength = outline.getTotalLength();
    let faakeduration = 600;
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    play.addEventListener('click', () => {
        checkPlaying(song);
    });
    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            faakeduration = this.getAttribute('data-time');
            timeDisplay.textContent =
                Math.floor(faakeduration / 60) + ':' + Math.floor(faakeduration % 60);
        });
    });
    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            video.src = this.getAttribute('data-video');
            song.src = this.getAttribute('data-sound');
            checkPlaying(song);
        });
    });

    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = '/svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = 'svg/play.svg';
        }
    };
    // everysecond with playable objects

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;

        let elapsed = faakeduration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progress =
            outlineLength - (currentTime / faakeduration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        timeDisplay.textContent = minutes + ':' + seconds;
        if (currentTime >= faakeduration) {
            song.pause();
            video.pause();
            song.currentTime = 0;
            play.src = 'svg/play.svg';
        }
    };
}
khalid();