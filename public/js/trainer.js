$(document).ready(() => {
  $('tr').click(viewPokemon);
  $('td.edit > i:first-child').click(editPokemon);
  $('td.edit > i:last-child').click(deletePokemon);
  $('i.gym-add').click(gymAdd);
  $('i.gym-remove').click(gymRemove);
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
