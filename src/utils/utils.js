export function formatPlayCount(playCount) {
    playCount = Number(playCount)
    playCount = playCount / 1000 > 9 ? playCount / 1000 + 'k' : playCount
    return playCount
}