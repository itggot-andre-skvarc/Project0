document.addEventListener('DOMContentLoaded', (event) => {
    if (location.href.includes('/game')) {
        if (window.localStorage.getItem("starttime") == null || window.localStorage.getItem("starttime") == "undefined"){        
            var today = new Date();
            window.localStorage.setItem("starttime",today)            
        } 
        game()
    } else {
        window.localStorage.clear();
    }
})

// How many right guesses that are required to complete the game
const guessesCount = 1

function game() {
    data = document.querySelector('.hide')

    // Converts the imported data to JSON after correcting the format.
    temp = data.innerHTML
    for (i = 0; i < Math.round(data.innerHTML.length / 4); i++) {
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
        if (parseInt(counter) == dataLength * guessesCount) {
            var starttime = window.localStorage.getItem("starttime")
            var now = new Date();
            pxz = Date.parse(starttime)
            result = Date.parse(now) - pxz
            result = result / 1000 
            console.log(result)
            result = Math.round((result + Number.EPSILON) * 100) /100
            if (result <= 60 ) {
                result = result.toString() +" S" 

            }
            else {
                result = Math.round(((result / 60) + Number.EPSILON) * 100) /100
                result = result.toString() +" Min"
                
            }
            
            popup = document.createElement('div')
            popup.classList.add('popup')
            document.querySelector('body').classList.add('sid')
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
            learnMore.innerHTML = '| Se alla bilder'
            learnMore.href = "/"
            popup.append(learnMore)

            wrapper.append(popup)

            tidform = document.createElement("form")
            tidform.classList.add("forum")
            input = document.createElement("input")
            input.name = "name"
            input.placeholder = "Username"
            input2 = document.createElement("input")
            input2.name = "result"
            input2.classList.add("hidden")
            input2.value = result
            button = document.createElement("button")
            button.innerHTML = "Spara tid"
            tidform.action = "/leaderboard/add"
            tidform.method = "post"
            tidform.append(input2)
            tidform.append(button)
            tidform.append(input)
            wrapper.append(tidform)

            $.getJSON('/leaderboard/fetch', function (data) {
                console.log(data)
                lista = document.createElement("div")
                lista.classList.add("lista")
                for(el in data){
                    ptag = document.createElement("p")
                    ptag2 = document.createElement("p")
                    ptag2.innerHTML = el
                    ptag.innerHTML = data[el]

                    lista.append(ptag2)
                    lista.append(ptag)


                }
                wrapper.append(lista)
            })
            


            


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
        if (temp <= guessesCount - 1) {
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

        s = Math.random(list.length - 1) * list.length
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
            wrapper.style.background = 'peachpuff'
        }, 1000);
    }
}

function resetGame() {
    window.localStorage.clear();
    location.reload()
}