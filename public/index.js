let loading = document.getElementById('load')
loading.style.display = 'None'

let button = document.getElementById('button')
button.addEventListener('click', async () => {
    let url = document.getElementById('text').value
    let link = await fetch('/download', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({url})
    })
    link = await link.text()
    console.log(link)
    loading.style.display = 'inline-block'
    setTimeout(() => {
        fetch(link)
        loading.style.display = 'None'
        fetch(link, {method: 'DELETE'})
    }, 7000)
})