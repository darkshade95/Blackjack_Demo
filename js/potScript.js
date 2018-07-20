/* jshint browser: true */


var buttonBeginGame = document.getElementById("buttonBeginGame");

var betAmount = 0;


var bet5 = document.getElementById("bet5");
bet5.addEventListener("click", SetBetAmount, false);

var bet10 = document.getElementById("bet10");
bet10.addEventListener("click", SetBetAmount, false);

var bet20 = document.getElementById("bet20");
bet20.addEventListener("click", SetBetAmount, false);

//Sets bet amount for game
function SetBetAmount() {
    buttonBeginGame.style.display = "inline-block";
    
    betAmount = this.value;
    //console.log(betAmount);
}

//Checks if pot amount already exists in local storage
if (window.localStorage) {
    var potAmount = document.getElementById("potAmount");

    if (localStorage.getItem('potAmount') === null) {

        localStorage.setItem('potAmount', 50);
        //console.log("New Key");
    } else {
        //console.log("Existing Key");
    }
    potAmount.innerHTML = "Your Money: £" + localStorage.getItem('potAmount');
    
    if (localStorage.getItem('potAmount') <= 0 ) {
        
        localStorage.setItem('potAmount', 50);
        potAmount.innerHTML = "No Money Left! Refilling Money...<br/>Your Money: £" + localStorage.getItem('potAmount');
    }

    console.log("Your Money: £" + localStorage.getItem('potAmount'));
}