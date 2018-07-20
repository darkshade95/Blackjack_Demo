/* jshint browser: true */

var cardDeckId = 'suloshp0kimd';

/* Create new deck every 2 weeks using the following link:
   https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1 
   and replace cardDeckId with newly generated deck_id
*/

var newCardUser;
var newCardUserImage;
var newCardUserCode;
var newCardUserValue;

var newCardDealer;
var newCardDealerImage;
var newCardDealerCode;
var newCardDealerValue;

var pileTotalAmountUser = 0;
var pileTotalAmountDealer = 0;

var buttonBeginGame = document.getElementById("buttonBeginGame");

var betAmount = 0;


var bet5 = document.getElementById("bet5");
bet5.addEventListener("click", SetBetAmount, false);

var bet10 = document.getElementById("bet10");
bet10.addEventListener("click", SetBetAmount, false);

var bet20 = document.getElementById("bet20");
bet20.addEventListener("click", SetBetAmount, false);

function SetBetAmount() {
    buttonBeginGame.style.display = "inline-block";

    betAmount = this.value;
    //console.log(betAmount);
}
// Fills pot
if (window.localStorage) {
    var potAmount = document.getElementById("potAmount");

    if (localStorage.getItem('potAmount') === null) {

        localStorage.setItem('potAmount', 50);
        //console.log("New Key");
    } else {
        //console.log("Existing Key");
    }
    potAmount.innerHTML = "Your Money: £" + localStorage.getItem('potAmount');

    if (localStorage.getItem('potAmount') <= 0) {

        localStorage.setItem('potAmount', 50);
        potAmount.innerHTML = "No Money Left! Refilling Money...<br/>Your Money: £" + localStorage.getItem('potAmount');
    }

    //console.log("Your Money: £" + localStorage.getItem('potAmount'));
}

var hitStandC = document.getElementById("hitStandC");

var buttonHit = document.getElementById("buttonHit");
var buttonStand = document.getElementById("buttonStand");

buttonBeginGame.addEventListener("click", Shuffle, false);

buttonBeginGame.addEventListener("click", ClearPilesUser, false);
buttonBeginGame.addEventListener("click", ClearPilesDealer, false);

buttonHit.addEventListener("click", Hit, false);
buttonStand.addEventListener("click", Stand, false);

var pileCardsUser = document.getElementById("pileCardsUser");
var pileCardsDealer = document.getElementById("pileCardsDealer");

var pileTotalUser = document.getElementById("pileTotalUser");
var pileTotalDealer = document.getElementById("pileTotalDealer");


var resultMessageC = document.getElementById("resultMessageC");
var resultMessage = document.getElementById("resultMessage");

var buttonRestart = document.getElementById("buttonRestart");

buttonRestart.addEventListener("click", Restart, false);

var userStandTimeout;

//Shuffles deck so that cards are in random order
function Shuffle() {

    var shuffleDeckRequest = new XMLHttpRequest();

    var shuffleDeckRequestUrl = 'https://deckofcardsapi.com/api/deck/' + cardDeckId + '/shuffle/';

    shuffleDeckRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

        }
    };

    shuffleDeckRequest.open("GET", shuffleDeckRequestUrl, true);

    shuffleDeckRequest.send();

    var introC = document.getElementById("introC");
    var gameC = document.getElementById("gameC");


    introC.style.display = "none";
    gameC.style.display = "block";
    document.getElementById("header").style.display = "none";
    
    //Initial deal for game
    Hit();
}

//Resets user pile at start of game
function ClearPilesUser() {


    var listPilesUserRequest = new XMLHttpRequest();


    var listPilesUserRequestUrl = 'https://deckofcardsapi.com/api/deck/' + cardDeckId + '/pile/userPile/list';

    listPilesUserRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var pilesList = JSON.parse(listPilesUserRequest.response);

            var pilesListUserLength = pilesList.piles.userPile.cards.length;


            var clearPilesUserRequest = new XMLHttpRequest();

            var clearPilesUserRequestUrl = 'https://deckofcardsapi.com/api/deck/' + cardDeckId + '/pile/userPile/draw/?count=' + pilesListUserLength;

            //console.log(clearPilesUserRequestUrl);

            clearPilesUserRequest.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {


                }
            };

            clearPilesUserRequest.open("GET", clearPilesUserRequestUrl, true);
            //myRequest.setRequestHeader("Access

            clearPilesUserRequest.send();

        }
    };

    listPilesUserRequest.open("GET", listPilesUserRequestUrl, true);

    listPilesUserRequest.send();


}

//Resets dealer pile at start of game
function ClearPilesDealer() {


    var listPilesDealerRequest = new XMLHttpRequest();

    var listPilesDealerRequestUrl = 'https://deckofcardsapi.com/api/deck/' + cardDeckId + '/pile/dealerPile/list';

    listPilesDealerRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var pilesList = JSON.parse(listPilesDealerRequest.response);

            var pilesListDealerLength = pilesList.piles.dealerPile.cards.length;

            var clearPilesDealerRequest = new XMLHttpRequest();

            var pilesListDealerLengthUrl = 'https://deckofcardsapi.com/api/deck/' + cardDeckId + '/pile/dealerPile/draw/?count=' + pilesListDealerLength;

            //console.log(pilesListDealerLengthUrl);

            clearPilesDealerRequest.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {



                }
            };

            clearPilesDealerRequest.open("GET", pilesListDealerLengthUrl, true);

            clearPilesDealerRequest.send();

        }
    };

    listPilesDealerRequest.open("GET", listPilesDealerRequestUrl, true);

    listPilesDealerRequest.send();


}
//Disables Ht and Stand buttons
function DisableButton() {
    buttonHit.disabled = true;
    buttonStand.disabled = true;
    buttonHit.style.cursor = 'not-allowed';
    buttonStand.style.cursor = 'not-allowed';
}
//Enables Ht and Stand buttons
function EnableButton() {
    buttonHit.disabled = false;
    buttonStand.disabled = false;
    buttonHit.style.cursor = 'pointer';
    buttonStand.style.cursor = 'pointer';
}

buttonHit.disabled = false
buttonStand.disabled = false

//Random card is added to user pile from deck
function Hit() {
    DisableButton();
    

    /*document.getElementById("buttonStandDisabled").style.display = "none";*/

    buttonStand.style.display = "inline-block";

    var getCardUserRequest = new XMLHttpRequest();

    var getCardUserRequestUrl = 'https://deckofcardsapi.com/api/deck/' + cardDeckId + '/draw/?count=1';

    getCardUserRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            newCardUser = JSON.parse(getCardUserRequest.responseText);

            newCardUserImage = newCardUser.cards["0"].image;

            newCardUserCode = newCardUser.cards["0"].code;

            newCardUserValue = newCardUser.cards["0"].value;

            //console.log(newCardUserValue + " OF " + newCardUser.cards["0"].suit);

            if (newCardUserValue == "JACK") {
                newCardUserValue = 10;
            } else if (newCardUserValue == "QUEEN") {
                newCardUserValue = 10;
            } else if (newCardUserValue == "KING") {
                newCardUserValue = 10;
            } else if (newCardUserValue == "ACE") {
                newCardUserValue = 11;
            } else {
                newCardUserValue = parseInt(newCardUser.cards["0"].value);
            }



            pileTotalAmountUser += newCardUserValue;

            pileTotalUser.innerHTML = 'Your Total: ' + pileTotalAmountUser;

            pileCardsUser.style.margin = "0px";

            if (document.body.clientWidth < 768) {
                pileCardsUser.innerHTML = '<img class="gameCards" data-aos="flip-left" data-aos-delay="300" src=' + newCardUserImage + '>';
            } else {

                pileCardsUser.innerHTML += '<img class="gameCards" data-aos="flip-left" data-aos-delay="300" src=' + newCardUserImage + '>';
            }



            var userPileRequest = new XMLHttpRequest();

            var userPileRequestUrl = 'https://deckofcardsapi.com/api/deck/' + cardDeckId + '/pile/userPile/add/?cards=' + newCardUserCode;


            userPileRequest.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                    //var userPile = JSON.parse(userPileRequest.responseText);

                    //console.log(pileTotalAmountUser);

                    if (pileTotalAmountUser == 21) {
                        DisableButton();

                        betAmount = betAmount * 2;

                        resultMessage.innerHTML = "You hit 21! You win £" + betAmount + "!";

                        betAmount = parseInt(localStorage.getItem('potAmount')) + parseInt(betAmount);
                        localStorage.setItem('potAmount', betAmount);



                        hitStandC.style.display = "none";



                        resultMessageC.style.display = "block";
                    } else if (pileTotalAmountUser > 21) {
                        DisableButton();

                        resultMessage.innerHTML = "You lose £" + betAmount + "!";

                        betAmount = parseInt(localStorage.getItem('potAmount')) - parseInt(betAmount);
                        localStorage.setItem('potAmount', betAmount);


                        hitStandC.style.display = "none";

                        resultMessageC.style.display = "block";
                    } else {
                    setTimeout(EnableButton, 500);
                    }
                    

                }
            };

            userPileRequest.open("GET", userPileRequestUrl, true);

            userPileRequest.send();

        }
    };

    getCardUserRequest.open("GET", getCardUserRequestUrl, true);

    getCardUserRequest.send();
    
    

}

//Random card is added to dealer pile from deck until game winning or losing conditions are met

function Stand() {

    DisableButton();

    var getCardDealerRequest = new XMLHttpRequest();

    var getCardDealerRequestUrl = 'https://deckofcardsapi.com/api/deck/' + cardDeckId + '/draw/?count=1';

    getCardDealerRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            newCardDealer = JSON.parse(getCardDealerRequest.responseText);

            newCardDealerImage = newCardDealer.cards["0"].image;

            newCardDealerCode = newCardDealer.cards["0"].code;

            newCardDealerValue = newCardDealer.cards["0"].value;

            //console.log(newCardDealerValue + " OF " + newCardDealer.cards["0"].suit);

            if (newCardDealerValue == "JACK") {
                newCardDealerValue = 10;
            } else if (newCardDealerValue == "QUEEN") {
                newCardDealerValue = 10;
            } else if (newCardDealerValue == "KING") {
                newCardDealerValue = 10;
            } else if (newCardDealerValue == "ACE") {
                newCardDealerValue = 11;
            } else {
                newCardDealerValue = parseInt(newCardDealer.cards["0"].value);
            }



            pileTotalAmountDealer += newCardDealerValue;

            pileTotalDealer.innerHTML = 'Dealer&#39;s Total: ' + pileTotalAmountDealer;

            pileCardsDealer.style.margin = "0px";

            if (document.body.clientWidth < 768) {
                pileCardsDealer.innerHTML = '<img class="gameCards" data-aos="flip-left" data-aos-delay="300" src=' + newCardDealerImage + '>';
            } else {
                pileCardsDealer.innerHTML += '<img class="gameCards" data-aos="flip-left" data-aos-delay="300" src=' + newCardDealerImage + '>';
            }



            var dealerPileRequest = new XMLHttpRequest();

            var dealerPileRequestUrl = 'https://deckofcardsapi.com/api/deck/' + cardDeckId + '/pile/dealerPile/add/?cards=' + newCardDealerCode;


            dealerPileRequest.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                    //var dealerPile = JSON.parse(dealerPileRequest.responseText);

                    //console.log(pileTotalAmountDealer);



                    if (pileTotalAmountDealer == 21) {

                        betAmount = betAmount * 2;

                        resultMessage.innerHTML = "Dealer hits 21! You lose £" + betAmount + "!";

                        betAmount = parseInt(localStorage.getItem('potAmount')) - parseInt(betAmount);
                        localStorage.setItem('potAmount', betAmount);

                        DisableButton();
                        hitStandC.style.display = "none";

                        stopStandFunction();

                        resultMessageC.style.display = "block";

                    } else if (pileTotalAmountDealer > 21) {

                        resultMessage.innerHTML = "You win £" + betAmount + "!";

                        betAmount = parseInt(localStorage.getItem('potAmount')) + parseInt(betAmount);
                        localStorage.setItem('potAmount', betAmount);

                        DisableButton();
                        hitStandC.style.display = "none";

                        stopStandFunction();

                        resultMessageC.style.display = "block";

                    } else if (pileTotalAmountDealer > pileTotalAmountUser) {

                        resultMessage.innerHTML = "Dealer Stands! You lose £" + betAmount + "!";

                        betAmount = parseInt(localStorage.getItem('potAmount')) - parseInt(betAmount);
                        localStorage.setItem('potAmount', betAmount);

                        DisableButton();
                        hitStandC.style.display = "none";

                        stopStandFunction();


                        resultMessageC.style.display = "block";

                    } else {
                        //Adds 0.7 second interval to each stand move
                        userStandTimeout = setTimeout(function () {
                            Stand();
                        }, 700);
                    }

                }
            };

            dealerPileRequest.open("GET", dealerPileRequestUrl, true);

            dealerPileRequest.send();

        }
    };

    getCardDealerRequest.open("GET", getCardDealerRequestUrl, true);

    getCardDealerRequest.send();

}

//Clears stand interval
function stopStandFunction() {
    clearTimeout(userStandTimeout);
    //console.log("End Of Timeout");
}
//Restarts game with added or reducted amount of money
function Restart() {
    location.reload();
}
