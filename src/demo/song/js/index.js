(function () {
    // 歌词解析
    function parseLrc(lrc) {
        const lines = lrc.split('\n');
        const result = {};
        const timeRegex = /^\[(\d{2}):(\d{2})\.(\d{2})\]\s*(.+)/;

        lines.forEach(line => {
            line = line.trim();
            const match = line.match(timeRegex);
            if (match) {
                // Convert time to seconds
                const minutes = parseInt(match[1]);
                const seconds = parseInt(match[2]);
                const centiseconds = parseInt(match[3]);
                const timeInSeconds = minutes * 60 + seconds + centiseconds / 100;

                const text = match[4].trim();
                result[timeInSeconds] = text;
            }
        });

        return result;
    }


    // 使用示例
    const { demo_song_lrc } = youzi.song;
    const lyricsMap = parseLrc(demo_song_lrc);
    console.log(lyricsMap);

    // 渲染歌词
    const ul = document.querySelector('.lrc_scroll');
    const lis = Object.values(lyricsMap).map(lyric => {
        const li = document.createElement('li');
        li.innerText = lyric;
        return li;
    });
    ul.append(...lis);

    // 歌曲时间排序
    const sortedTimes = Object.keys(lyricsMap).sort((a, b) => a - b);
    sortedTimes.unshift(-1);
    sortedTimes.push(Number.MAX_SAFE_INTEGER);

    // 监听歌曲播放
    const audio = document.querySelector('#audio');
    audio.addEventListener('timeupdate', (event) => {
        const currentTime = event.target.currentTime;
        console.log("🚀 ~ audio.addEventListener ~ currentTime:", currentTime)

        // 找到当前时间对应的歌词下一行
        const currentInx = sortedTimes.findIndex(time => currentTime < time);

        // 移除所有高亮歌词
        Array.from(ul.children).forEach(li => {
            li.classList.remove('active');
        });

        // 高亮歌词
        const currentLi = ul.children[currentInx];
        if (!currentLi.classList.contains('active')) {
            currentLi.classList.add('active');
        }

        // 滚动歌词
        ul.style.transform = `translateY(-${(currentInx - 1) * 34}px)`;
    });
}())




