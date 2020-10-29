const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const sortWR = document.querySelector('#update-WR')
const messageDiv = document.querySelector('#message')
var fname = document.getElementById("fname").value;
var position = document.getElementById("pos").value;


console.log(fname)
console.log(position)


deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Darth Vadar'
      })
    })
    .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'No quote to delete') {
          messageDiv.textContent = 'No Darth Vadar quote to delete'
        } else {
          window.location.reload(true)
        }
      })
      .catch(console.error)
  })

update.addEventListener('click', _ => {
  // Send PUT Request here
  fetch('/players', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      FirstName: fname,
      Pos: position
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    window.location.reload(true)
  })
})