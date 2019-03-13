export function formatPlayCount(playCount) {
    playCount = Number(playCount)
    playCount = playCount / 1000 > 9 ? Math.round(playCount / 1000) + 'k' : playCount
    return playCount
}

export function fullAudioSrc(musicId) {
    return `https://music.163.com/song/media/outer/url?id=${musicId}.mp3`
}