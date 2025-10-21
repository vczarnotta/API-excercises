const imageBtn = document.querySelector("button");
const imageContainer = document.querySelector("div")

const colors = ["#ee4266", "#ffd23f", "#3bceac", "#0ead69"]
let colorIndex = 0

imageBtn.addEventListener("click", () => {
    document.body.classList.add("align-top")

    //Hämta bild från API
    fetch("https://randomfox.ca/floof/")
    .then(response => response.json())
    .then(data => {
        console.log(data.image)
        
        //Hämta och visa bild
        const foxImage = document.createElement("img");
        foxImage.src = data.image
        imageContainer.appendChild(foxImage)
        foxImage.classList.add("fox-img")

        //Sätt bakgrundsfärg
        colorIndex = (colorIndex + 1) % colors.length //Byter färg efter varje bild, loopar
        foxImage.style.backgroundColor = colors[colorIndex]
    })
});
