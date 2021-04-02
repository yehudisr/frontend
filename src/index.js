const url = 'http://localhost:3000/users'
const ulAnecdotes = document.querySelector('ul.anecdotes')
const ulMembers = document.querySelector('ul.members')
const anecdoteForm = document.querySelector('form.anecdote-form')
const newMemberForm = document.querySelector('form#new-family-member-form')
const updateMemberForm = document.querySelector('form#update-family-member-form')
const updateBtn = document.querySelector('#member-details > div.card-header-center > button')
const addButton = document.querySelector('button#new-family-member')



function renderHighLightedMember(familyMember) {

    const h2 = document.querySelector('h2.card-title')
    h2.textContent = familyMember.name

    const memberImg = document.querySelector('img')
    memberImg.src = familyMember.image

    const pCategory = document.querySelector('p.card-subtitle')
    pCategory.textContent = familyMember.category

    const pBirthday = document.querySelector('p.birthday')
    pBirthday.textContent = familyMember.birthday

    ulAnecdotes.innerHTML = ''

    anecdoteForm.dataset.id = familyMember.id
    updateMemberForm.dataset.id = familyMember.id

}


fetch(`${url}/1`)
    .then(response => response.json())
    .then(user => {
        renderHighLightedMember(user)
        newMemberForm.dataset.id = user.id
        user.family_members.forEach(familyMember => {
            const li = document.createElement('li')
            li.innerText = familyMember.name
            li.dataset.id = familyMember.id
            ulMembers.append(li)

        })
    })

ulMembers.addEventListener('click', event => {
    if (event.target.matches('li')) {
        const id = event.target.dataset.id
        fetch(`http://localhost:3000/family_members/${id}`)
            .then(response => response.json())
            .then(familyMember => {
                renderHighLightedMember(familyMember)

                familyMember.anecdotes.forEach(anecdote => {
                    const anecdoteLi = document.createElement('li')
                    anecdoteLi.dataset.id = anecdote.id
                    anecdoteLi.innerText = anecdote.note
                    anecdoteLi.classList.add('anecdote-li')
                    const deleteButton = document.createElement('button')
                    deleteButton.textContent = 'X'
                    deleteButton.classList.add('anecdote-delete-button')
                    anecdoteLi.append(deleteButton)
                    ulAnecdotes.append(anecdoteLi)
                })
            })
    }
})



anecdoteForm.addEventListener('submit', event => {
    event.preventDefault()

    const id = event.target.dataset.id
    const newAnecdote = event.target[0].value


    fetch(`http://localhost:3000/family_members/${id}/anecdotes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ note: newAnecdote, family_member_id: id })
    })
        .then(response => response.json())
        .then(anecdote => {
            const li = document.createElement('li')
            li.textContent = anecdote.note
            li.dataset.id = anecdote.family_member_id
            const deleteButton = document.createElement('button')
            deleteButton.textContent = 'X'
            li.append(deleteButton)
            ulAnecdotes.append(li)
        })

    event.target.reset()
})


newMemberForm.addEventListener('submit', event => {
    event.preventDefault()

    const name = event.target.name.value
    const birthday = event.target.birthday.value
    const image = event.target.photo.value
    const category = event.target.category.value
    const user_id = event.target.dataset.id

   

    newMember = { name, birthday, image, category, user_id }

    fetch(`http://localhost:3000/family_members`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMember)
    })
        .then(response => response.json())
        .then(familyMember => {
            renderHighLightedMember(familyMember)
        })

        event.target.reset()
})

addButton.addEventListener('click', event => {
    if (event.target.matches('button#new-family-member')) {
        newMemberForm.style.display = newMemberForm.style.display === 'block' ? 'none' : 'block'
    }
})

updateMemberForm.addEventListener('submit', event => {

    event.preventDefault()
    const updatedValues = {
        name: event.target.name.value,
        image: event.target.photo.value
    }

    fetch(`http://localhost:3000/family_members/${event.target.dataset.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedValues)
    })
        .then(response => response.json())
        .then(familyMember => {
            renderHighLightedMember(familyMember)
        })

})

ulAnecdotes.addEventListener('click', event => {
    if (event.target.matches('button')) {
        const id = event.target.closest('li').dataset.id
        fetch(`http://localhost:3000/anecdotes/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => 
                event.target.closest('li').remove()
                )
    }
})


updateBtn.addEventListener('click', event => {
    console.log(event.target)
    updateMemberForm.style.display = updateMemberForm.style.display === 'block' ? 'none' : 'block'
})


const loginForm = document.querySelector('form#login-form')
loginForm.addEventListener('submit', event => {
    event.preventDefault()
    loginForm.style.display = 'none' 
    const mainWrapper = document.querySelector('main.main-wrapper')
    mainWrapper.style.display = 'flex'

})