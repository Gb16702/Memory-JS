const cards = document.querySelectorAll('.card')
const even = document.querySelectorAll('.card').length /2 //permet d'adapter le nombre de paires au nombre de cartes disponibles
console.log(even);
let matched = 0
let cardA, cardB
let disabled = false // on définit disabled pour éviter de pouvoir cliquer pendant la vérification lorsque 2 cartes sont retournées
var sec = 0
var min = 0
var hrs = 0
var t;
var essais = document.querySelector('.essais')
var click = 0
var timerChrono = document.querySelector('.chrono')
var results = document.querySelector('.results')
var gameDuration = document.querySelector('.duration')
var attempts = document.querySelector('.attempts')
var ratio = document.querySelector('.ratio')
var restart= document.querySelector('.restart')
restart.style.display= "none"
function timer() {
    t = setTimeout(add, 1000);
  }
  function reset() {
    timerChrono.textContent = "Temps : 00:00:00"
    seconds = 0; minutes = 0; hours = 0
  }
  function tick() {
      sec++;
      if(sec >= 60) {
        sec = 0;
        min ++
        if(min >= 60) {
          min = 0
          hrs ++
        }
      }
  }
  function add() {
  tick();
  timerChrono.textContent = "Temps"+" "+":"+" "+(hrs > 9 ? hrs : "0" + hrs)
  + ":" + (min > 9 ? min : '0' + min)
  + ":" + (sec > 9 ? sec : "0" + sec)
  timer()
  }
  function timer() {
    t = setTimeout(add, 1000);
  }

console.log(timerChrono);
var chi = 12


function c({target: clicked}) {
    if(cardA !== clicked && !disabled && btnStart.innerHTML == "C'est parti !") {
        clicked.classList.add('flip')
        if(timeleft < 0) {
            var length = document.querySelectorAll('.flip').length
            console.log(length);
            if(length == 16) {
                results.style.setProperty('transform', "translate(-50%, -50%)")
                gameDuration.innerHTML = `Votre temps : ${t} secondes`
                if(click == 0) {
                    attempts.innerHTML = `Bravo ! Vous avez fait un sans-faute`
                    ratio.innerHTML = `Votre taux de réussite est de 100%`
                }else {
                    attempts.innerHTML = `Paires incorrectes : ${click}`
                    ratio.innerHTML = `Votre taux de réusite est de ${(8 / (click + 8) ) * 100}%`
                    console.log(click);
                }
            }
        }
        if(!cardA) {
            return cardA = clicked
        }
        cardB = clicked
        disabled = true
        let cardAImg = cardA.querySelector('.back-view img').src, cardBImg = cardB.querySelector('.back-view img').src
        match(cardAImg, cardBImg)
    }
}
function match(img1, img2) {
    if(img1 === img2) { // condition pour savoir si une carde a matché avec une autre
        matched++ // J'incrémente la variable de match par 1
        if(matched == even) {
            setTimeout(() => {
                return shuffleCard() // Si toutes les cartes on été trouvées, on lance une fonction qui va disperser les cartes à nouveau
            }, 1000) // on appelle la fonction shuffleCard après 1 seconde
        }

        cardA.removeEventListener('click', c)
        cardB.removeEventListener('click', c)
        cardA = cardB = '';
        return disabled = false
    }
    setTimeout(() => {
        // ajout d'un timeout pour que la keyframe de la carte retournée n'apparaisse qu'au bout d'un petit temps
        cardA.classList.add('shake'); cardB.classList.add('shake')
        click = click +1
        essais.innerHTML = `Echecs : ${click}`
    }, 275)
    setTimeout(() => {
        cardA.classList.remove('shake', 'flip');
        cardB.classList.remove('shake', 'flip');
        cardA = cardB = ''; // revient au même que faire cardA = ""; cardB = "" -> on y gagne une ligne
        disabled = false
    }, 1200)
}

console.log(length);

let shuffleCard = () => {
    matched = 0;
    disabled = false
    cardA = cardB = ""
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]
    arr.sort(() => Math.random() > 0.5 ? 1 : -1) // on crée un random avec les cartes, si le random est > 0.5, ce dernier vaut 1, sinon il vaut - 1
    cards.forEach((card, index) => { // boucle qui prend les cartes et qui prend chaque index dans celle-ci, on met un random pour chaque image
        let imgTag = card.querySelector('img');
        imgTag.src = `images/img-${arr[index]}.png`
        card.addEventListener('click', c)
    })
}

shuffleCard();
let span = document.querySelector('.must')
let play = document.querySelector('.play')
cards.forEach(card => {
    console.log(card);
    // card.addEventListener('click', c)
    card.addEventListener('click', e => {
        if(btnStart.innerHTML != "C'est parti") {
            span.style.setProperty('visibility', 'visible')
            if (span.style.visibility == 'visible' && btnStart.innerHTML != "C'est parti") {
                btnStart.classList.add('warning')
            }
        }
    })

})

let rules = document.querySelector('.rules')
let modal = document.querySelector('.modal')
let close = document.querySelector('.close').onclick = () => {
    modal.style.setProperty('transform', 'translate(200%, -50%)')
    modal.classList.remove('open')
    if(!modal.classList.contains('open')) {
        rules.style.display = ''
    }
}
 document.querySelector('.rules').onclick = (e) => {
    modal.style.setProperty('transform', 'translate(-50%, -50%)')
    modal.classList.add('open')
    if(modal.classList.contains('open')){
        rules.style.display = 'none'
    }
}
let edge = document.querySelector('.edge')
let btnStart = document.querySelector('.start')
var t;
var timeleft = 2;
function start() {
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.add('flip')
        })
    }, 2300)

    btnStart.classList.remove('warning')
    span.innerHTML = ""
    btnStart.style.background = ''
    btnStart.innerHTML = "Début dans 3"
    var downloadTimer = setInterval(() => {

        btnStart.innerHTML = `Début dans ${timeleft}`
        timeleft -= 1
        if(timeleft < 0) {
            clearInterval(downloadTimer)
            btnStart.innerHTML = 'C\'est parti !'
            console.log(btnStart.innerHTML);
            timer()
            timerChrono.style.setProperty('visibility', 'visible')
            cards.forEach(card => {
                function call() {
                    setTimeout(() => {
                        btnStart.style.display = "none"
                    }, 400)
                }
                async function callback() {
                    await call()
                    setTimeout(() => {
                        restart.style.display = "inline"
                    },400)
                }
                callback()
                card.classList.remove('flip')
            } )
        }
    }, 1000)
}


