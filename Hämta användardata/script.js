const userList = document.querySelector("ul")

fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(persons => {
        console.log(persons)

        for(person of persons){
            const user = document.createElement("li")
            user.textContent = `namn: ${person.name}, e-post: ${person.email}`
            userList.appendChild(user)
        }
    })