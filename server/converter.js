const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const ytdl = require("ytdl-core");

ffmpeg.setFfmpegPath(ffmpegPath);

function convertYouTube(url, outputPath, format) {

    return new Promise((resolve, reject) => {

      const stream = ytdl(url, {
    filter: "audioonly",
    quality: "highestaudio"
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
