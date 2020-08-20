document.addEventListener('DOMContentLoaded', (event) => {
    game()  
})

function game() {
    data = document.querySelector('.hide')
    console.log(data.innerHTML)
    console.log(data.innerHTML.replace('=&gt;', ':'))
    data = JSON.parse(data.innerHTML.replaceAll('=&gt;', ':'))
    console.log(data)
    
    wrapper = document.querySelector('body')
    console.log(data[0])
    console.log(data)
    dataLength = Object.keys(data).length
    console.log(dataLength)
    randomName = data[Math.round(Math.random(dataLength)*dataLength -1)]['name']
    console.log(randomName)
    nameElement = document.createElement('h2')
    nameElement.innerHTML = randomName
    console.log(nameElement)
    wrapper.append(nameElement)
    
    for (i = 0; i < dataLength;  i++){
        console.log(data[i])
        img = document.createElement('img')
        img.src = "/img/" + data[i]['img']
        img.alt = data[i]['name']
        img.onclick = function () {guess(this)}
        
        wrapper.append(img)
    };
}



function guess(el) {
    svar = document.querySelector("h2").innerHTML  
    gissning = $(el).attr('alt')
    
    if (gissning == svar) {
        wrapper.style.background = 'lightgreen'
        
        setTimeout(() => {
            location.reload();
            
        }, 2500);
        
    } 
    else {
        wrapper.style.background = 'red'
        setTimeout(() => {
            wrapper.style.background = '#fff'
        }, 1000);
    }
    
    
}
