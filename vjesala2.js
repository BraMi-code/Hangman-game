var nizSlika = ["https://i.postimg.cc/bNv1NG1Y/hangman.png", "https://i.postimg.cc/rw0Wxvhv/hangman1.png", "https://i.postimg.cc/XYR58QmX/hangman2.png", "https://i.postimg.cc/d0GySGc6/hangman3.png", "https://i.postimg.cc/TwGD8hR6/hangman4.png", "https://i.postimg.cc/cHm8dZH8/hangman5.png", "https://i.postimg.cc/Bb7L1g2S/hangman6.png", "https://i.postimg.cc/90QwMSRg/hangman7.png", "https://i.postimg.cc/zDxRMJ6s/hangman8.png", "https://i.postimg.cc/65TGxkNy/hangman9.png", "https://i.postimg.cc/TYS5dtRQ/hangman10.png", "https://i.postimg.cc/nhDjCqrx/hangman-end.png"];

var nizRijeci = ["vješala", "tastatura", "telefon", "šišmiš", "o\u01c6ak", "\u01ccuška", "\u01c9u\u01c9a"];
console.log(nizRijeci);

// rijec koja se pojavljuje na crticama iznad tastature
var velikiDiv = document.getElementById('velikiDiv');
var brojacSlova = 0;
var randomRijec = "";
var redniBrojSlike = 0;
var privremeniDiv = {};
var pogodjenoSlovo = document.getElementById('pogodjenoSlovo');
var randomRijec = "";

var sledecaSlika = document.getElementById('slike');
var muzikaIgrica;
var pokreniMuziku = document.getElementById('dugmePokreni');
var audio = document.getElementById('audiotag1');
var stopMuzika = document.getElementById('zaustaviMuziku');

function podesiIme() {
    var imeIgraca = document.getElementById('unesiIme').value;
    document.getElementById('imeIgraca').innerHTML = imeIgraca;
    document.getElementById('skloniInput').style.display = "none";
}
function zapocniIgru() {
    document.getElementById('glavnaStrana').style.display = "block";
    document.getElementById('pocetnaStrana').style.display = "none";
    //velikiDiv.innerHTML = "";
     // pokrecemo muziku kad zapocnemo igru
    pokreniZvuk();
     // ovdje zapocinjemo igru 
    zaigrajIgru();
}

function zatvoriProzor() {
    var zatvoriPravila = document.getElementById('pravila');
    zatvoriPravila.style.display = 'none';
}

function prikaziPravila() {
    var prikaziPravila = document.getElementById('pravila');
    prikaziPravila.style.display = 'block';
}

function napustiIgru() {
    document.getElementById('pocetnaStrana');
    location.reload();
}
function klikDugme(slovo) {
    var vidljivaSlova = document.getElementsByClassName('linijeSlova');
    pozicijaSlova = randomRijec.indexOf(slovo);
    console.log(slovo);
    document.getElementById(slovo).disabled = true;
    console.log(pozicijaSlova);
    if(pozicijaSlova === -1) {
        slajdoviSlika();
        return;
    }
    while (pozicijaSlova > -1) {
    console.log(slovo);
    vidljivaSlova[pozicijaSlova].classList.add('vidljivaSlova');
    pozicijaSlova = randomRijec.indexOf(slovo, pozicijaSlova + 1);
    console.log(slovo);
    pogodjenoSlovo.play();

    brojacSlova++;
        if (brojacSlova >= randomRijec.length - brojRazmaka) {
            // postavlja se uslov da se pokrene funkcija Win kada igrac pogodi sva slova u rijeci
            prikaziWin();
        }
    }
}
function slajdoviSlika() {
    if (redniBrojSlike >= nizSlika.length -2) {
        prikaziLose();
        redniBrojSlike = -1;
    }
    redniBrojSlike++;
    sledecaSlika.src = nizSlika[redniBrojSlike];
}

function prikaziLose() {
    var poraz = document.getElementById('poraz');
    poraz.style.display = 'block';
}

function zatvoriLose() {
    document.getElementById('poraz').style.display = "none";
}

function prikaziWin() {
    var pobjeda = document.getElementById('pobjeda')
    pobjeda.style.display = 'block';
}

function zatvoriWin() {
    document.getElementById('pobjeda').style.display = 'none';
}

function zaigrajIgru() {
    var velikiDiv = document.getElementById('velikiDiv');
    var abcSlova = document.getElementsByClassName('abcSlovo');
    randomRijec = nizRijeci[Math.floor(Math.random() * nizRijeci.length)];

    for (i=0; i < abcSlova.length; i++) {
        abcSlova[i].disabled = false;
    
    }
    while (velikiDiv.lastElementChild) {
        velikiDiv.removeChild(velikiDiv.lastElementChild);
    }

    for (i = 0; i < randomRijec.length; i++) {
        var privremeniDiv = document.createElement('div');
        privremeniDiv.className = 'linijeSlova';
        privremeniDiv.appendChild(document.createTextNode(randomRijec.charAt(i)));
        velikiDiv.appendChild(privremeniDiv);
        console.log(randomRijec);
    }

    brojRazmaka = randomRijec.split(" ").length - 1;
    console.log("Rijec ima " + brojRazmaka + " razmak.");

    redniBrojSlike = 0;
    sledecaSlika.src = nizSlika[redniBrojSlike]

    // resetujemo brojac slova za novu rijec

    brojacSlova = 0;

    zatvoriWin();
    zatvoriLose();
}

function pokreniZvuk() {
    var muzikaPozadina =  document.getElementById('audiotag1');
    muzikaPozadina.play();
}