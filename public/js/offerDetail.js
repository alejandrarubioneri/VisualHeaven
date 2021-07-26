
const applyButton = document.getElementById('apply'); // Dónde está el botón

// Aplicar a ofertas
if (applyButton) {
    applyButton.onclick = () => {
        applyButton.classList.add('disabled') // Deshabilitar botón para evitar más peticiones mientr
        const offerId = applyButton.value;
    
        axios.post(`http://localhost:3000/offers/${offerId}/apply`) // Dónde apunta Axios
            .then((response) => {
                // Cambiar las clases
                applyButton.classList.toggle('btn-outline-dark')
                applyButton.classList.toggle('btn-dark')
    
                // Cambiar los textos
                applyButton.querySelector('span').textContent = !response.data.applied ? 'Already applied' : 'Apply now'
            })
            .catch(e => console.error(e))
            .finally(() => { // Quitar clase al botón
                applyButton.classList.remove('disabled')
            })
    }
}


// Borrar ofertas
const deleteButton = document.getElementById('delete');
if (deleteButton) {
    deleteButton.onclick = () => {
    const offerId = deleteButton.value;
    axios.delete(`http://localhost:3000/offers/${offerId}`) // Dónde apunta Axios
        .then((response) => {
            if (response.data.deleted) {
                window.location.href = '/offers'
            }
        })
        .catch(e => console.error(e))
    }
}