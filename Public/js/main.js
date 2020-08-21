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
    running = true
    while (running) {
        keys = Object.keys(window.localStorage)
        if (window.localStorage.getItem())
        slump = Math.random(dataLength - 1)*dataLength -1
        randomName = data[Math.round(slump)]['name']
  
        temp = window.localStorage.getItem(randomName);
        if (temp <= 3) {
            running = false
        }
    }
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
        // Fetches the current amount of correct guesses on a item.
        temp = window.localStorage.getItem(svar);
        // Updates the number of correct guesses.
        if (temp != null && temp != 'undefined') {
            temp = parseInt(temp) + 1
        } else {
            temp = 1
        }
        window.localStorage.setItem(svar, temp);

        setTimeout(() => {
            location.reload();
        }, 2500);
    } 
    else {
        window.localStorage.setItem(svar, 0);

        wrapper.style.background = 'red'
        setTimeout(() => {
            wrapper.style.background = '#fff'
        }, 1000);
    }
}

function reset() {
    window.localStorage.clear();
}
