// Hämta från: https://jsonplaceholder.typicode.com/posts
// Visa de första 10 inläggen i DOM:en.
// Visa title i fet stil och body under.
// Lägg till en “Ladda fler”-knapp som hämtar nästa 10.
// Extra: Lägg till en sökruta som filtrerar inlägg baserat på ord i titeln.

const postContainer = document.querySelector("section")
let currentIndex = 0

//Skapa knappen för att ladda fler
const loadBtn = document.createElement("button")
loadBtn.textContent = "Ladda fler"
document.body.appendChild(loadBtn)

//Deklarera variabeln data utanför funktionen för att kunna hämta fler gånger
let posts = []

//Funktion för att hämta de kommande 10 inläggen.
function loadPosts() {
   posts.slice(currentIndex, currentIndex + 10).forEach(post => {
            const postContent = document.createElement("div")
            postContent.innerHTML = `<strong>${post.title}</strong><br>${post.body}`
            postContainer.appendChild(postContent)
        })
        currentIndex += 10
    if(currentIndex >= posts.length) {
        loadBtn.style.display = "none" //Dölj knappen när alla inläg har laddats
    }
}

//Hämta från API
fetch("https://jsonplaceholder.typicode.com/posts")
.then(res => res.json())
.then(data => {
    posts = data //Hämta data utanför funktion

    loadPosts() //10 st syns direkt när sidan laddas

    loadBtn.addEventListener("click", () => {
        loadPosts() //Lägg till 10 stycken varje gång knappen klickas
    }) 
})

const searchInput = document.querySelector("input")

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase() //Hämta input i sökfältet
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(query)) //Kontrollera att sökningen matchar titeln och skapa en ny lista med matchningar.

    postContainer.innerHTML = "" //Rensa tidigare inlägg
    
        if(filteredPosts.length === 0) {
            postContainer.textContent = "Inga inlägg hittades."
        } else {
            filteredPosts.forEach(post => {
                const postContent = document.createElement("div")
                postContent.innerHTML = `<strong>${post.title}</strong><br>${post.body}`
                postContainer.appendChild(postContent)
            })
        }

    //Dölj knappen när en sökning pågår
    if(query === "") {
            loadBtn.style.display = "block"

            //Återställ laddade inlägg när sökrutan är tom.
            currentIndex = 0
            postContainer.innerHTML = ""
            loadPosts()

        } else {
            loadBtn.style.display = "none"
        }
})
