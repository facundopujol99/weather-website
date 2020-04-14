const weatherForm = document.querySelector('form')
const searchText = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')
const img = document.querySelector('img')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = searchText.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }else{
        img.src = data.imgUrl
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
        }
    })
})
})