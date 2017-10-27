const icon = $('#add_new i');
const addPokemonForm = $('table > tbody > tr:last-child');

$(document).ready(() => {
  $('.nav-wrapper > ul > li:nth-child(2)').addClass('active');
  $('select').material_select();

  $("#add_new").click(toggleForm);
  $('tr:not(:last-child)').click(viewPokemon);
  $('td.edit > i:first-child').click(editPokemon);
  $('td.edit > i:last-child').click(deletePokemon);

  toggleForm();
});

function toggleForm() {
  icon.text((icon.text() === 'expand_more') ? 'expand_less' : 'expand_more');
  addPokemonForm.toggle();
};

function viewPokemon(ev) {
  let pokemonId = ev.target.parentNode.id;
  // console.log('view pokemon', pokemonId);
  window.location.href = `/pokemon/${pokemonId}`;
}

function editPokemon(ev) {
  ev.stopPropagation();
  let pokemonId = ev.target.parentNode.parentNode.id;
  // console.log('edit pokemon', pokemonId);
  window.location.href = `/pokemon/edit/${pokemonId}`;
}

function deletePokemon(ev) {
  ev.stopPropagation();
  let pokemonId = ev.target.parentNode.parentNode.id;
  // console.log('delete pokemon', pokemonId);
  window.location.href = `/pokemon/del/${pokemonId}`;
}
