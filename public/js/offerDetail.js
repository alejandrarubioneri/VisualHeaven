const button = document.getElementById('apply'); // Dónde está el botón

button.onclick = () => {
    button.classList.add('disabled') // Deshabilitar botón para evitar más peticiones mientr
    const offerId = button.value;

    axios.post(`http://localhost:3000/offers/${offerId}/apply`) // Dónde apunta Axios
        .then((response) => { 
            // Cambiar las clases
            button.classList.toggle('btn-outline-dark')
            button.classList.toggle('btn-dark')

            // Cambiar los textos
            button.querySelector('span').textContent = !response.data.applied ? 'Already applied' : 'Apply now'
        })
        .catch(e => console.error(e))
        .finally (() => { // Quitar clase al botón
            button.classList.remove('disabled')
        })
}