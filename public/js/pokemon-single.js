const path = window.location.pathname
const deletePath = '/pokemon/del/' + pokemon.id;
// if (typeof species === undefined) window.location.replace(path);

$(document).ready(() => {

  $('select').material_select();

  $("#edit").click(toggleForm);
  $('#delete').click((ev)=>{
    window.location.href = deletePath;
  });

  $('form').hide();
  if (editMode) toggleForm();

  let autocompleteData = {};

  for (let s of species) {
    autocompleteData[`${s.id}. ${s.name} (${s.description})`] = null;
  }

  $('input.autocomplete').autocomplete({
    data: autocompleteData,
    limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
    onAutocomplete: function(val) {},
    minLength: 1 // The minimum length of the input for the autocomplete to start. Default: 1.
  });

  $('tr:not(.form-row)').click((ev)=>{
    let href = $(ev.target).attr("href");
    if (href) window.location.href = href;
  });
});

function toggleForm() {
  $('form').toggle();
  $('.info').toggle();
}

function validate() {
  return madeChange();
  //more validation?
  //clean up species to species_id?
}

function madeChange() {
  let foundChange = (
    ($('input[name="name"]').val() !== pokemon.name)
    || ($('input[name="species"]').val() !== `${pokemon.species_id}. ${pokemon.species} (${pokemon.description})`)
    || ($('select[name="trainer_id"]').parent().find('input').val() !== pokemon.trainer)
    || ($('input[name="cp"]').val() != pokemon.cp));
  if (!foundChange) toggleForm();
  return foundChange;
}
