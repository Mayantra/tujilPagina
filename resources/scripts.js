document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-items'); // Selecciona el contenedor de los ítems del carrusel
    const items = Array.from(carousel.children); // Convierte los elementos hijos del carrusel en un array
    const prevBtn = document.getElementById('prevBtn'); // Botón de navegación anterior
    const nextBtn = document.getElementById('nextBtn'); // Botón de navegación siguiente

    const itemsToShow = 4; // Número de elementos a mostrar simultáneamente
    let index = itemsToShow; // Índice inicial para la posición del carrusel

    // Duplicar los elementos al inicio y al final para el efecto infinito
    items.slice(-itemsToShow).reverse().forEach(item => {
        carousel.insertBefore(item.cloneNode(true), carousel.firstChild);
    });
    items.slice(0, itemsToShow).forEach(item => {
        carousel.appendChild(item.cloneNode(true));
    });

    // Función para actualizar la posición del carrusel
    const updateCarousel = () => {
        const width = carousel.children[0].clientWidth + 20; // Añadimos 20px por el margen
        carousel.style.transition = 'transform 0.5s ease'; // Añade transición suave
        carousel.style.transform = `translateX(-${index * width}px)`; // Mueve el carrusel
    };

    // Función para verificar y ajustar el índice del carrusel en caso de desbordamiento
    const checkIndex = () => {
        const width = carousel.children[0].clientWidth + 20; // Añadimos 20px por el margen
        if (index >= items.length + itemsToShow) {
            index = itemsToShow;
            carousel.style.transition = 'none'; // Elimina la transición para evitar el salto visible
            carousel.style.transform = `translateX(-${index * width}px)`; // Ajusta la posición del carrusel
        } else if (index <= 0) {
            index = items.length;
            carousel.style.transition = 'none'; // Elimina la transición para evitar el salto visible
            carousel.style.transform = `translateX(-${index * width}px)`; // Ajusta la posición del carrusel
        }
    };

    // Función para mover al siguiente ítem automáticamente
    const autoMove = () => {
        index += 1; // Incrementa el índice en 1
        updateCarousel(); // Actualiza la posición del carrusel
        setTimeout(checkIndex, 500); // Verifica y ajusta el índice después de la transición
    };

    // Configurar el desplazamiento automático cada 5 segundos
    let interval = setInterval(autoMove, 10000);

    // Event listener para el botón de siguiente
    nextBtn.addEventListener('click', () => {
        index += 1; // Incrementa el índice en 1
        updateCarousel(); // Actualiza la posición del carrusel
        setTimeout(checkIndex, 500); // Verifica y ajusta el índice después de la transición
        resetInterval(); // Reiniciar el intervalo para evitar solapamientos
    });

    // Event listener para el botón de anterior
    prevBtn.addEventListener('click', () => {
        index -= 1; // Decrementa el índice en 1
        updateCarousel(); // Actualiza la posición del carrusel
        setTimeout(checkIndex, 500); // Verifica y ajusta el índice después de la transición
        resetInterval(); // Reiniciar el intervalo para evitar solapamientos
    });

    // Reinicia el intervalo cuando se hace clic en los botones
    const resetInterval = () => {
        clearInterval(interval);
        interval = setInterval(autoMove, 10000);
    };

    // Inicializa la posición del carrusel
    const initialWidth = carousel.children[0].clientWidth + 20; // Añadimos 20px por el margen
    carousel.style.transition = 'none'; // Elimina la transición para evitar el salto visible
    carousel.style.transform = `translateX(-${index * initialWidth}px)`; // Ajusta la posición inicial del carrusel
});

