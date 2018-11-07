/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
} 
// Reference for game timer
var interval;
var createNewGame = function() {
    var moves = 0;
    var cards = document.getElementsByClassName("card");

    var deck = document.getElementsByClassName("deck")[0];
    var time = new Date;
    var stars = 3;
// Set timer 
    interval = setInterval(function() {
        var seconds = (new Date - time)/1000;
        var minutes = Math.floor(seconds/60);
        seconds = Math.floor(seconds % 60);
        document.getElementsByClassName("timer")[0].innerHTML = minutes + " mins " + seconds + "sec";
    }, 1000);
// Create new card deck elements
    var newCards = [];
    for (var i = 0; i < cards.length; i++) {
        // Copying existing cards 
        var node = cards[i].cloneNode(true);
        node.classList.remove("open", 'show', 'match');
	   newCards.push(node);
    }
    document.getElementsByClassName("moves")[0].innerHTML = moves;
    var starElements = document.getElementsByClassName("fa-star");
    starElements[2].style.display = '';
    starElements[1].style.display = '';
    // Empty deck
    deck.innerHTML = "";
    shuffle(newCards);
    for (var i = 0; i<newCards.length; i++) {
        // Add new cards
        deck.appendChild(newCards[i]);

        var openCards = [];
        // Create click event handler for cards 
        newCards[i].addEventListener("click" , function(){
            if (this.classList.contains("open") || openCards.length > 1) {
                // Return from handler when card is already open or 2 cards have already been clicked
                return;
            }
	        this.classList.add("open","show");
            // Track current showing cards 
            openCards.push(this); 
            if (openCards.length > 1) {
                // Second card for match clicked
                moves++;
                document.getElementsByClassName("moves")[0].innerHTML = moves;
                // Adjust score value 
                if (moves === 15) {
                    starElements[2].style.display = 'none';
                    stars = 2;
                } else if (moves === 30) {
                    starElements[1].style.display = 'none';
                    stars = 1;
                }
                // Check for match 
                if (openCards[0].dataset.icon === openCards[1].dataset.icon) {
                    this.classList.add("match");
                    openCards[0].classList.add("match");

                    if (document.getElementsByClassName("open").length === cards.length) {
                        // Winning game
                        $('.modal').modal("show");
                        // Stop timer
                        clearInterval(interval);
                        $('.final-time').text(document.getElementsByClassName("timer")[0].innerHTML);
                        $('.final-score').text($(".stars").text())
                        for(var i = 0; i<stars; i++ ) {
                            // Generate star icons
                            var span = $('<span>');
                            var s = $('<i>');
                            s.addClass('fa fa-star');
                            li.append(s);
                            $('.final-score').append(li);
                        }

                    }
                    openCards = [];
                } else {
                    // No match, hide cards after timeout
                    setTimeout(function() {
                        openCards[0].classList.remove("open", 'show');
                        openCards[1].classList.remove("open", 'show');
                        openCards = [];
                    }, 2000);
                }
            }
        });
    }
}
// Add click handler for restart
$(".restart").on("click", function() {
    clearInterval(interval);
    $('.modal').modal('hide');
    createNewGame();
});


var cardsOpen = 0;
// Call new game on page load
window.onload = createNewGame;




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
