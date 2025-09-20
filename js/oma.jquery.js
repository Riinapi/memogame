$(document).ready(function() {
  //muuttujat
  const gameContainer = $('#game');
  const endContainer = $('#end');
  const startButton = $('#startButton');
  const startContainer = $('#start');

  // piilotetaan peli ja lopetus 
  gameContainer.hide();
  endContainer.hide();

  startButton.on('click', startGame); // Play napille klikkauksen kuuntelija, aloitetaan peli

  // pelin aloittaminen
  function startGame() {
      startAnimation().finished.then(function() { // anime
      startContainer.hide(); // piilotetaan aloitus
      gameContainer.show(); // näytetään peli
    });
   
    // pelin kortit kuvina
    const images = [
      'panda.jpg', 'parrot.jpg', 'tiger.jpg', 'koala.jpg', 'elephant.jpg', 'monkey.jpg',
      'panda.jpg', 'parrot.jpg', 'tiger.jpg', 'koala.jpg', 'elephant.jpg', 'monkey.jpg'
    ];

    //alustus
    let openCards = []; 
    let matchPairs = 0;

    // kuvien sekoitus
    images.sort(() => Math.random() - 0.5);

   //korttien lisääminen peliin
    cardsToGame(images);

    function cardsToGame(images) {
      $.each(images, function(index) { // kaikki korit
        const card = createCard(index, images[index]); // luodaan uusi kortti
        gameContainer.append(card); //lisätään kortit
      });
    }

    // korttin luominen
    function createCard(index, image) {
      const card = $('<div>', { // uusi elementti
        class: 'card',
        'data-index': index, // atribuutit
        'data-image': image,
        html: '<img src="img/cardback.jpg" class="card-img-top" alt="Card">' // kortin kuva takaa
      }).on('click', function() { // klikkauksen kuuntelija
        flipCard($(this)); // suoritetaan alempi funktio
      });
      return card;
    }

    // kortin kääntäminen
    function flipCard(card) {
      if (openCards.length < 2 && !openCards.includes(card) && !card.hasClass('opened')) { // korttien käännösten ehdot
        flipCardAnimation(card).play(); //anime
        updateCardImage(card); // kortin kuvan päivitys
        openCards.push(card); // lisätään kortti avattuihin

        card.addClass('opened'); // luokan vaihtaminen

        if (openCards.length === 2) { // tarkitus onko kaksi korttia avattu
          setTimeout(checkMatch, 1000); // tarkitus ovatko pari
        }
      }
    }

    // kortin kuvan päivitys, datana kuvan nimi, päivitetään kuva
    function updateCardImage(card) {
      const image = card.data('image');
      card.html(`<img src="img/${image}" class="card-img-top" alt="Card">`);
    }

    // kahden kortin vertailu
    function checkMatch() {
      const [card1, card2] = openCards; //// tallennetaan 2 korttia avatauista
      const index1 = card1.data('index'); // tallennetaan korttien ideksi
      const index2 = card2.data('index');

      if (images[index1] === images[index2]) {
        // kortit ovat pari
        openCards = [];
        matchPairs++;

        if (matchPairs === images.length / 2) { // tarkistetaan onko arvo sama
          // kutsutaan lopetusta
          victory();
        }
      } else {
        // kortit eivät ole vastaavat
        closeCards();
      }
    }

    // korttine sulkeminen
    function closeCards() {    
      $.each(openCards, function() {
        const card = $(this); // jQuery-objekti kortti-elementistä
        card.removeClass('opened'); // poista luokka
        card.html('<img src="img/cardback.jpg" class="card-img-top" alt="Card">'); // näytetään kortin tausta takaa
        flipCardAnimation(card); // anime
      });
      openCards = [];
    }

    // lopetus 
    function victory() {
      gameContainer.hide(); // piilotetaan peli
      endAnimation(); // anime
      endContainer.show(); // näytetään lopetus

      // angular
      var $scope = angular.element($("#game")).scope();
      $scope.$apply(function () { // ang päivitys
      $scope.endGame();
      });
    };
  };
});

