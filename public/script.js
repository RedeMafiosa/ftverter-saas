async function startConversion() {

    const url = document.getElementById("urlInput").value;
    const format = document.getElementById("format").value;

    const status = document.getElementById("status");
    const bar = document.getElementById("bar");
    const btn = document.getElementById("downloadBtn");

    status.innerHTML = "A enviar...";
    bar.style.width = "0%";

    const formData = new FormData();
    formData.append("url", url);
    formData.append("format", format);

    let progress = 0;

    const fake = setInterval(() => {
        if (progress < 90) {
            progress += Math.random() * 7;
            bar.style.width = progress + "%";
            status.innerHTML = "A converter... " + Math.floor(progress) + "%";
        }
    }, 400);

    try {

        const res = await fetch("/convert", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        clearInterval(fake);

        bar.style.width = "100%";
        status.innerHTML = "Concluído ✔";

        btn.style.display = "block";

        btn.onclick = () => {
            window.location.href = "/download/" + data.id;
        };

    } catch (err) {
        clearInterval(fake);
        status.innerHTML = "Erro na conversão";
    }
}