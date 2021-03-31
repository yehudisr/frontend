const url = 'http://localhost:3000/users'
const ulAnecdotes = document.querySelector('ul.anecdotes')     
const ulMembers = document.querySelector('ul.members')


function renderHighLightedMember(familyMember){
 
    const h2 = document.querySelector('body > main > div.member-details > h2')
    h2.textContent = familyMember.name

    const memberImg = document.querySelector('img')
    memberImg.src = familyMember.image
    
    const pCategory = document.querySelector('p.category')
    pCategory.textContent = familyMember.category

    const pBirthday = document.querySelector('p.birthday')
    pBirthday.textContent = familyMember.birthday

    ulAnecdotes.innerHTML = ''


    // const anecdoteForm = document.querySelector('form.anecdote-form')
    // anecdoteForm.dataset.id = familyMember.id
    // anecdoteForm[0].value = familyMember.note

}


fetch(`${url}/1`)
  .then(response => response.json())
  .then(user => {
    renderHighLightedMember(user)

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
                    ulAnecdotes.append(anecdoteLi)
                   }) 
            })
    }
})

