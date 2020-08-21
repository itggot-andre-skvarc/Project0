document.addEventListener('DOMContentLoaded', (event) => {
    if (location.href.includes('/game')) {
    game()  
    } else {
        window.localStorage.clear();
    }
})

function game() {
    data = document.querySelector('.hide')
    console.log(data.innerHTML)
    console.log(data.innerHTML.replace('=&gt;', ':'))
    data = JSON.parse(data.innerHTML.replaceAll('=&gt;', ':'))
    console.log(data)
    
    wrapper = document.querySelector('body')
    dataLength = Object.keys(data).length
    running = true
    while (running) {
        counter = window.localStorage.getItem('answerCounter');

        // You have gussed on all images, and now the game is over
        if (parseInt(counter) == dataLength * 4) {
            popup = document.createElement('div')
            title = document.createElement('h3')
            title.innerHTML = 'Du klararde det.'
            popup.append(title)

            resetButton = document.createElement('p')
            resetButton.innerHTML = 'Restart'
            resetButton.classList.add("reset")
            resetButton.onclick = function () {
                resetGame()
            }
            popup.append(resetButton)
            learnMore = document.createElement('a')
            learnMore.innerHTML = 'Se alla bilder'
            learnMore.href = "/"
            popup.append(learnMore)

            wrapper.append(popup)

            running = false
            return ''
        }

        slump = Math.random(dataLength - 1) * dataLength - 1
        if (slump < 0) {
            slump = slump * -1
        }

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
        counter = window.localStorage.getItem('answerCounter');
        if (counter != null && counter != 'undefined') {
            counter = parseInt(counter) + 1
        } else {
            counter = 1
        }
        window.localStorage.setItem('answerCounter', counter);

        // Updates the number of correct guesses.
        if (temp != null && temp != 'undefined') {
            temp = parseInt(temp) + 1
        } else {
            temp = 1
        }
        window.localStorage.setItem(svar, temp);

        setTimeout(() => {
            location.reload();
        }, 1000);
    } else {
        temp = window.localStorage.getItem(svar);

        counter = window.localStorage.getItem('answerCounter');

        if (counter != null && counter != 'undefined') {
            if (temp != null && temp != 'undefined') {
                counter = parseInt(counter) - temp
            }
        } else {
            counter = 0
    } 
        window.localStorage.setItem('answerCounter', counter);

        window.localStorage.setItem(svar, 0);

        wrapper.style.background = 'red'
        setTimeout(() => {
            wrapper.style.background = '#fff'
        }, 1000);
    }
}

function resetGame() {
    window.localStorage.clear();
    location.reload()
}