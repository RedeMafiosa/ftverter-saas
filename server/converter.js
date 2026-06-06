const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const ytdl = require("ytdl-core");

ffmpeg.setFfmpegPath(ffmpegPath);

function convertYouTube(url, outputPath, format) {

    return new Promise(async (resolve, reject) => {

        try {

            // 🔥 valida URL primeiro
            if (!ytdl.validateURL(url)) {
                return reject(new Error("URL inválido"));
            }

            const stream = ytdl(url, {
                filter: "audioonly",
                quality: "highestaudio",
                highWaterMark: 1 << 25
            });

            stream.on("error", (err) => {
                reject(err);
            });

            ffmpeg(stream)
                .audioBitrate(192)
                .toFormat(format)
                .on("start", (cmd) => {
                    console.log("FFmpeg iniciado:", cmd);
                })
                .on("error", (err) => {
                    reject(err);
                })
                .on("end", () => {
                    resolve();
                })
                .save(outputPath);

        } catch (err) {
            reject(err);
        }
    });
}

module.exports = { convertYouTube };
