const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const ytdl = require("ytdl-core");

ffmpeg.setFfmpegPath(ffmpegPath);

function convertYouTube(url, outputPath, format) {
    return new Promise((resolve, reject) => {
        try {

            // 1. valida URL
            if (!ytdl.validateURL(url)) {
                return reject(new Error("URL inválido"));
            }

            console.log("Iniciando download YouTube...");

            // 2. stream mais estável
            const stream = ytdl(url, {
                filter: "audioonly",
                quality: "highestaudio",
                highWaterMark: 1 << 25,
                dlChunkSize: 0 // ajuda estabilidade no Render
            });

            // 3. erros do stream (CRÍTICO)
            stream.on("error", (err) => {
                console.error("YTDL ERROR:", err);
                reject(new Error("Erro no stream do YouTube"));
            });

            // 4. ffmpeg pipeline
            const command = ffmpeg(stream)
                .audioBitrate(192)
                .toFormat(format)

                .on("start", (cmd) => {
                    console.log("FFmpeg iniciado");
                    console.log(cmd);
                })

                .on("progress", (p) => {
                    if (p && p.percent) {
                        console.log(`Progresso: ${Math.floor(p.percent)}%`);
                    }
                })

                .on("error", (err) => {
                    console.error("FFMPEG ERROR:", err.message);
                    reject(new Error("Erro na conversão"));
                })

                .on("end", () => {
                    console.log("Conversão concluída");
                    resolve();
                })

                .save(outputPath);

        } catch (err) {
            console.error("FATAL ERROR:", err);
            reject(err);
        }
    });
}

module.exports = { convertYouTube };
