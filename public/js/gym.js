$(document).ready(() => {
  $('.nav-wrapper > ul > li:nth-child(3)').addClass('active');
  $('select').material_select();
});

function gymReset(ev) {
  window.location.href = `/gym/reset`;
}

function battle(ev) {
  $('#battle-button').hide();
  let battleSlots = $('#battle-slots');
  battleSlots.hide();
  if (+players[0].cp > +players[1].cp) {
    $('#player1Win').show();
  } else if (+players[1].cp > +players[0].cp){
    $('#player2Win').show();
  } else {
    $('#draw').show();
  }
}
