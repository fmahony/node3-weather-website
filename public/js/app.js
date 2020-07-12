
//Util Functions
const fetchWeather = (location) => {fetch('/weather?address=' + location).then((response)=> {
    response.json().then( (data)=> {
        if(data.error){
            messageOne.textContent = data.error
        } else {
            temp= data.temp 
            humidity = data.humidity
            status = data.status
            messageOne.textContent = data.location
            messageTwo.textContent = 'It is ' + status + ' with a temperature of ' + temp + 'F and a humidity of ' + humidity + ' %.'
        }
    })
})}

//Get information from DOM
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

//Create Listener and fetch weather
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    fetchWeather(location)
})