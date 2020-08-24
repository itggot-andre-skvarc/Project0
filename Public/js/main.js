document.addEventListener('DOMContentLoaded', (event) => {
    if (location.href.includes('/game')) {
        game()
    } else {
        window.localStorage.clear();
    }
})

function game() {
    data = document.querySelector('.hide')

    // Converts the imported data to JSON after correcting the format.
    temp = data.innerHTML
    for (i = 0; i < Math.round(data.innerHTML.length / 4); i ++) {
        temp = temp.replace('=&gt;', ':')
    }
    data = JSON.parse(temp)

    wrapper = document.querySelector('body')
    dataLength = Object.keys(data).length
    running = true

    // Generate user
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

        // Randomize who is choosen.
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

    nameElement = document.createElement('h2')
    nameElement.innerHTML = randomName
    wrapper.append(nameElement)
    divElement = document.createElement('div')
    divElement.classList.add('bilder')

    // Randomize image order
    list = new Array(dataLength);
    for (i = 0; i < list.length; i++) {
        list[i] = [i]
    }

    for (i = 0; i < dataLength; i++) {
        img = document.createElement('img')

        s = Math.random(list.length - 1) * list.length - 1
        if (s < 0) {
            s = s * -1
        }
        s = Math.floor(s)
        number = list[s]
        list.splice(s, 1)
        img.src = "/img/users/" + data[number]['img']
        img.alt = data[number]['name']
        img.onclick = function () {
            guess(this)
        }

        divElement.append(img)
    };
    wrapper.append(divElement)
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