document.addEventListener("DOMContentLoaded", function () {
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
    const loader = document.querySelector(".loading-screen");
    const body = document.querySelector("body");
    loaderFadeOut(loader, body);

    // Intersection Observer for sections
    const sections = document.querySelectorAll("section");
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("hidden");
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
                entry.target.classList.add("hidden");
            }
        });
    }, observerOptions);

    sections.forEach((section) => {
        section.classList.add("hidden");
        observer.observe(section);
    });

    footer = document.querySelector("footer");
    footer.classList.add("hidden");
    observer.observe(footer);
});

function sleep(ms) {
    console.log("sleeping for " + ms + "ms");
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function loaderFadeOut(loader, body) {
    loader.style.opacity = 0;
    await sleep(1000);
    loader.style.display = "none";
    body.style.overflow = "auto";
}
