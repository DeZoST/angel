document.addEventListener("DOMContentLoaded", function () {
    const loader = document.createElement("div");
    loader.id = "loader";
    loader.style.position = "fixed";
    loader.style.top = "0";
    loader.style.left = "0";
    loader.style.width = "100%";
    loader.style.height = "100%";
    loader.style.background = "white";
    loader.style.display = "flex";
    loader.style.justifyContent = "center";
    loader.style.alignItems = "center";
    loader.style.fontSize = "1.5rem";
    loader.innerText = "Chargement...";
    document.body.appendChild(loader);

    window.addEventListener("load", function () {
        loader.style.display = "none";
    });

    fetch("/data/content.json")
        .then((response) => response.json())
        .then((data) => {
            document.querySelectorAll("[data-text]").forEach((element) => {
                const key = element.getAttribute("data-text");
                if (data[key]) {
                    element.textContent = data[key];
                }
            });
        })
        .catch((error) =>
            console.error("Erreur de chargement du contenu: ", error)
        );
});
