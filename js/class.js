

// let cards = [{}]  // pop2 cards when "clickevent" occurs
// let player = []   // starts with 2 cards // value
// let dealer = []   //

var suits = ['hearts', 'clubs', 'diamonds', 'spades'];
var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king','ace'];
var deck = [];
var playerHand = [];
var dealerHand = [];
var handReveal = [];


function createDeck(){
for(let i = 0; i < suits.length; i++){
    for(let x = 0; x < ranks.length; x++){
        var cardPoint = parseInt(ranks[x]);
        if (ranks[x] == 'jack' || ranks[x] == 'queen' || ranks[x] == 'king'){
            cardPoint = 10
        }
        if (ranks[x] == 'ace'){
                cardPoint = 11;
            }
        var card = {
            Rank: ranks[x],
            Suit: suits[i],
            Image:`images/${ranks[x]}_of_${suits[i]}.png`,
            Points: cardPoint
        }
    deck.push(card);
    }
}
return deck
}
createDeck();

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
deck = shuffleArray(deck);

function displayDealerCards(tempCard){
    var faceImage = document.createElement('img');
    faceImage.setAttribute("src", tempCard.Image);

    var imageHolder = document.getElementById('dealer-card-image');
    imageHolder.append(faceImage);    
}

function displayPlayerCards(tempCard){
    var faceImage = document.createElement('img');
    faceImage.setAttribute("src", tempCard.Image);
    
    var imageHolder = document.getElementById('player-card-image');
    imageHolder.append(faceImage);
}

function dealPlayerCards(num){
    var tempCard = {};
    for(i = 0; i < num; i++){
        tempCard = deck.pop();
        playerHand.push(tempCard);
        displayPlayerCards(tempCard);
    }
}

function dealDealerCards(num){
    var tempCard = {};
    for(i = 0; i < num; i++){
        tempCard = deck.pop();
        dealerHand.push(tempCard);
        displayDealerCards(tempCard);
    }
}

var playerNumOfCards = 0;
var playerTotalPoints = 0;
var dealerTotalPoints = 0;
var dealerNumOfCards = 0;

function countPoints(){
    // for player //
    if(playerNumOfCards == 2){
        playerTotalPoints = playerHand[0].Points + playerHand[1].Points; 
    }
    if(playerNumOfCards == 3){
        playerTotalPoints = playerHand[0].Points + playerHand[1].Points + playerHand[2].Points; 
    }
    if(playerNumOfCards == 4){
        playerTotalPoints = playerHand[0].Points + playerHand[1].Points + playerHand[2].Points + playerHand[3].Points;
    }
    if(playerNumOfCards == 5){
        playerTotalPoints = playerHand[0].Points + playerHand[1].Points + playerHand[2].Points + playerHand[3].Points; playerHand[4].Points;
    }
    // for dealer //
    if(dealerNumOfCards == 2){
        dealerTotalPoints = dealerHand[0].Points + dealerHand[1].Points;
    }
    if(dealerNumOfCards == 3){
        dealerTotalPoints = dealerHand[0].Points + dealerHand[1].Points + dealerHand[2].Points;
    }
    if(dealerNumOfCards == 4){
        dealerTotalPoints = dealerHand[0].Points + dealerHand[1].Points + dealerHand[2].Points + dealerHand[3].Points;
    }
    if(dealerNumOfCards == 5){
        dealerTotalPoints = dealerHand[0].Points + dealerHand[1].Points + dealerHand[2].Points + dealerHand[3].Points + dealerHand[4].Points;
    }
    // dealerTotalPoints = 0;
    // for(i = 0; i < dealerNumOfCards; i++){
    //     dealerTotalPoints += dealerHand[i].Points;
    // }

    // playerTotalPoints = 0;
    // for(i = 0; i < playerNumOfCards; i++){
    //     playerTotalPoints += playerHand[i].Points;
    // }
}


function displayPoints(){
    var showPlayer = document.getElementById('player-points');
    showPlayer.innerText = playerTotalPoints;
}

function displayDealerPoints(){
    var showDealer = document.getElementById('dealer-points');
    showDealer.innerText = dealerTotalPoints;
}

let newGameButton = document.getElementById('newGame');
newGameButton.addEventListener('click', e=>{
    location.reload();
})

function hideCard(){
    dealerHand[0].Image = hiddenCard;
}


// let hiddenCard = dealerHand.map(i =>{
//     i.Image = images/hiddenCard.jpg;
//     return i
// })
// dealerHand = hiddenCard;
// console.log(dealerHand)

let dealButton = document.getElementById('deal');
    dealButton.addEventListener('click', e=>{
    hitButton.disabled = false;
    standButton.disabled = false;
    dealPlayerCards(2);
    playerNumOfCards += 2;
    
    let tempCard = {};
    tempCard = deck.pop();
    dealerHand.push(tempCard);
    let faceImage = document.createElement('img');
    faceImage.setAttribute("src", "images/hiddenCard.jpg");
    let imageHolder = document.getElementById('dealer-card-image');
    imageHolder.append(faceImage); 

    dealDealerCards(1);
    dealerNumOfCards += 2;
    countPoints();
    displayPoints();
    dealButton.setAttribute('disabled', true);
})


let hitButton = document.getElementById('hitMe');
hitButton.addEventListener('click', e=>{
    countPoints();
    if(playerTotalPoints > 21){
        displayPoints();
        alert("You Bust!");
        hitButton.setAttribute('disabled', true);
        standButton.setAttribute('disabled', true);
    }    
    else if(playerTotalPoints < 21){
        dealPlayerCards(1);
        playerNumOfCards+=1;
        countPoints();
        displayPoints();
        if(playerTotalPoints > 21){
            standButton.setAttribute('disabled', true);
            hitButton.setAttribute('disabled', true);
            displayPoints();
            displayDealerPoints();
            alert("You Bust!");
        }
    }
    else{
        displayPoints();
        alert("You got 21! Blackjack!");
        hitButton.setAttribute('disabled', true);
    }
})

let standButton = document.getElementById('stand');
standButton.addEventListener('click', e=>{
    hitButton.setAttribute('disabled', true);
    standButton.setAttribute('disabled', true);
    countPoints();
    if (dealerTotalPoints <= 21){
        countPoints();
        while (dealerTotalPoints <= 16){
            countPoints();
            dealDealerCards(1);
            dealerNumOfCards += 1;
            countPoints();
        }
        if (dealerTotalPoints < 21){
            if(playerTotalPoints > dealerTotalPoints){
            displayDealerPoints();
            alert('You win!');
            }
            else if(playerTotalPoints == dealerTotalPoints){
            displayDealerPoints();
            alert("We have a draw!")
            }
            else{
            displayDealerPoints();
            alert('House wins!');
            }
        }
        if (dealerTotalPoints > 21){
        displayDealerPoints();
        alert('Dealer Busts! You win!');
        }
    }
})

hitButton.disabled = true;
standButton.disabled = true;

function append(){

}