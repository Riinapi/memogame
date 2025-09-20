// pelin aloitus animaatio, menee pois asteittain
function startAnimation() {
    return anime({
      targets: '#start',
      opacity: 0,
      duration: 1000,
      easing: 'easeInOutQuad'
    });
  };

// pelin lopetus animaatio, tulee esiin asteittain
  function endAnimation() {
    return anime({
      targets: '#end',
      opacity: 1,   // css oltava 0
      duration: 1000,
      easing: 'easeInOutQuad'
    });
  };

// korttien animaatio, kortti sykähtää
  function flipCardAnimation(card) {
    return anime({
      targets: card[0], // dom elementti
      scale: [1, 1.1, 1], 
      easing: 'easeInOutQuad',
      duration: 200
    });
  }

 
  