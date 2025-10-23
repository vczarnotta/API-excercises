// Hämta data från:
//     https://jsonplaceholder.typicode.com/users
// Visa användarnamnen i en lista.
// När du klickar på ett namn, visa:
//     e-postadress
//     stad (address.city)
// Extra: Visa deras företagsnamn också (company.name).

const peopleList = document.createElement("ul")
document.body.appendChild(peopleList)

let people = []

fetch("https://jsonplaceholder.typicode.com/users")
.then(res => res.json())
.then(data => {
    people = data

    people.forEach(person => {
        const personListItem = document.createElement("li")
        personListItem.textContent = person.username
        personListItem.dataset.id = person.id
        peopleList.appendChild(personListItem)

        console.log(person)
    })
})

peopleList.addEventListener("click", (event) => {
        if(event.target.tagName === "LI") {
            const personId = Number(event.target.dataset.id)
            const person = people.find(p => p.id === personId)

            const existingInfo = event.target.querySelector("ul")
            if (existingInfo) {
                existingInfo.remove()
                return  // Toggle: om info fanns så tar vi bort den och slutar
            }

            const info = document.createElement("ul")
            event.target.appendChild(info)

            const email = document.createElement("li")
            email.textContent = `Email: ${person.email}`
            info.appendChild(email)

            const city = document.createElement("li")
            city.textContent = `City: ${person.address.city}`
            info.appendChild(city)

            const company = document.createElement("li")
            company.textContent = `Company: ${person.company.name}`
            info.appendChild(company)
        }   
    })
