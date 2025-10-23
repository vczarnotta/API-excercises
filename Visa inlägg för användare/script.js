// Visa en lista med användare från jsonplaceholder.typicode.com/users.
// När man klickar på en användare ska deras posts hämtas och visas under användaren.

const userList = document.querySelector("ul")

fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(persons => {
        for(person of persons){
            const user = document.createElement("li")
            user.textContent = `Användarnamn: ${person.username}`
            userList.appendChild(user)
            user.dataset.id = person.id
        }
    })

userList.addEventListener("click", (event) => {
    if(event.target.tagName === "LI") {
        let userId = event.target.dataset.id
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(posts => {

            const existingList = event.target.querySelector("ul")
                if (existingList) {
                    existingList.remove()
                } else {
                    const postList = document.createElement("ul")
                    event.target.appendChild(postList)

                    posts.forEach(post => {
                        const userPost = document.createElement("li")
                        userPost.innerHTML = `<strong>${post.title}</strong><br>${post.body}`
                        postList.appendChild(userPost)
                    });
                }
        })
    }
})