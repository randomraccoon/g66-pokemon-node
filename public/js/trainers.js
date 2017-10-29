const icon = $('#add_new i');
const addTrainerForm = $('table > tbody > tr:last-child');

$(document).ready(() => {
  $('.nav-wrapper > ul > li:nth-child(1)').addClass('active');
  $('select').material_select();

  $("#add_new").click(toggleForm);
  $('tr:not(:last-child)').click(viewTrainer);
  $('td.edit > i:first-child').click(editTrainer);
  $('td.edit > i:last-child').click(deleteTrainer);

  toggleForm();
});

function toggleForm() {
  icon.text((icon.text() === 'expand_more') ? 'expand_less' : 'expand_more');
  addTrainerForm.toggle();
};

function viewTrainer(ev) {
  let trainerId = ev.target.parentNode.id;
  // console.log('view trainer', trainerId);
  window.location.href = `/trainers/${trainerId}`;
}

function editTrainer(ev) {
  ev.stopPropagation();
  let trainerId = ev.target.parentNode.parentNode.id;
  // console.log('edit trainer', trainerId);
  window.location.href = `/trainers/edit/${trainerId}`;
}

function deleteTrainer(ev) {
  ev.stopPropagation();
  let trainerId = ev.target.parentNode.parentNode.id;
  // console.log('delete trainer', trainerId);
  window.location.href = `/trainers/del/${trainerId}`;
}
