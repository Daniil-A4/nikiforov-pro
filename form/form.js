form.onsubmit = handleSubmit

function handleSubmit() {
  const data = Object.fromEntries(new FormData(form))

  console.log(data)

  fetch('/api/data', {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify(data)})
}