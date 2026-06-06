const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const ytdlp = require("yt-dlp-exec");

ffmpeg.setFfmpegPath(ffmpegPath);

function convertYouTube(url, outputPath, format) {

    return new Promise((resolve, reject) => {

        const stream = ytdlp.execStream(url, {
            format: "bestaudio"
        });

        ffmpeg(stream)
            .audioBitrate(192)
            .toFormat(format)
            .on("end", resolve)
            .on("error", reject)
            .save(outputPath);
    });
}

module.exports = { convertYouTube };