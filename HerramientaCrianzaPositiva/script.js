document.addEventListener('DOMContentLoaded', () => {
    let data = {};

    // --- ELEMENTOS DEL DOM ---
    const semaforoLights = document.querySelectorAll('.semaforo-light');
    const semaforoInfo = document.getElementById('semaforo-info');

    const escenarioCard = document.getElementById('escenario-card');
    const btnEscenario = document.getElementById('btn-escenario');

    const valorCard = document.getElementById('valor-card');
    const btnValor = document.getElementById('btn-valor');

    // --- CARGA DE DATOS ---
    fetch('data.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            console.log('Datos cargados:', data);
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
            // Mostrar error en la UI
            escenarioCard.innerHTML = '<p>Error al cargar el contenido. Por favor, intente de nuevo más tarde.</p>';
            valorCard.innerHTML = '<p>Error al cargar el contenido. Por favor, intente de nuevo más tarde.</p>';
        });

    // --- LÓGICA DEL SEMÁFORO ---
    semaforoLights.forEach(light => {
        light.addEventListener('click', () => {
            const color = light.dataset.color;
            const info = data.semaforo.find(item => item.color === color);

            if (info) {
                // Actualizar contenido
                semaforoInfo.innerHTML = `
                    <h3>${info.titulo}</h3>
                    <p>${info.descripcion}</p>
                    <p class="accion">${info.accion}</p>
                `;
                
                // Actualizar estilo visual
                const activeColor = getComputedStyle(light).backgroundColor;
                semaforoInfo.style.borderLeftColor = activeColor;

                // Gestionar clase activa para el brillo
                semaforoLights.forEach(l => l.classList.remove('active'));
                light.classList.add('active');
                light.style.setProperty('--color', activeColor);
            }
        });
    });

    // --- LÓGICA DE ESCENARIOS ---
    btnEscenario.addEventListener('click', () => {
        if (data.escenarios && data.escenarios.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.escenarios.length);
            const escenario = data.escenarios[randomIndex];
            escenarioCard.innerHTML = `
                <p><strong>Situación:</strong> ${escenario.situacion}</p>
                <hr>
                <p>${escenario.solucion}</p>
            `;
        }
    });

    // --- LÓGICA DE VALORES ---
    btnValor.addEventListener('click', () => {
        if (data.valores && data.valores.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.valores.length);
            const valor = data.valores[randomIndex];
            valorCard.innerHTML = `
                <h3>${valor.nombre}</h3>
                <p><em>${valor.definicion}</em></p>
                <hr>
                <p><strong>${valor.accion}</strong></p>
            `;
        }
    });
});
