document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const items = Array.from(track.children);

    // Duplicamos los ítems para un bucle perfecto
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });
});
