

const form = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('.message_1');
const message2 = document.querySelector('.message_2')


form.addEventListener('submit', (e)=>{
    message1.textContent = 'Loading';
    message2.textContent = '';
    e.preventDefault();
    const location = search.value     
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        
        response.json().then(({error, address, forecast, location}) => {
            
            if(error){
                return message1.textContent= error;
            }
            console.log(address);
            console.log(location);
            message1.textContent = location;
            console.log(forecast);
            message2.textContent = forecast;
        });
    })
    
    
    


})
