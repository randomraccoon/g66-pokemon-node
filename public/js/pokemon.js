const addBtnText = $('#add_new > span');
const icon = $('#add_new > i');
const addPokemonForm = $('.form-row');

$(document).ready(() => {
  $('.nav-wrapper > ul > li:nth-child(2)').addClass('active');
  $('select').material_select();

  $("#add_new").click(toggleForm);
  $('tr:not(:last-child)').click(viewPokemon);
  $('td.edit > i:first-child').click(editPokemon);
  $('td.edit > i:last-child').click(deletePokemon);
  $('i.gym-add').click(gymAdd);
  $('i.gym-remove').click(gymRemove);

  let autocompleteData = {};

  for (let s of species) {
    autocompleteData[`${s.id}. ${s.name} (${s.description})`] = null;
  }

  $('input.autocomplete').autocomplete({
    data: autocompleteData,
    limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
    onAutocomplete: function(val) {},
    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
  });
});

function viewPokemon(ev) {
  let pokemonId = ev.target.parentNode.id;
  window.location.href = `/pokemon/${pokemonId}`;
}

function editPokemon(ev) {
  ev.stopPropagation();
  let pokemonId = ev.target.parentNode.parentNode.id;
  window.location.href = `/pokemon/edit/${pokemonId}`;
}

function deletePokemon(ev) {
  ev.stopPropagation();
  let pokemonId = ev.target.parentNode.parentNode.id;
  window.location.href = `/pokemon/del/${pokemonId}`;
}

function gymAdd(ev) {
  ev.stopPropagation();
  let pokemonId = ev.target.parentNode.parentNode.id;
  window.location.href = `/gym/add/${pokemonId}`;
}

function gymRemove(ev) {
  ev.stopPropagation();
  let pokemonId = ev.target.parentNode.parentNode.id;
  window.location.href = `/gym/del/${pokemonId}`;
}

function toggleForm() {
  if (icon.text() === 'expand_more') {
    icon.text('expand_less');
    addBtnText.text('Hide');
    addPokemonForm.show();
    addPokemonForm.find('input[name="name"]').focus();
  } else {
    icon.text('expand_more');
    addBtnText.text('Add new Pokémon');
    addPokemonForm.hide();
  }
};
