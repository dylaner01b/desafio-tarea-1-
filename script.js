window.addEventListener('DOMContentLoaded', () => {
    
    // ASIGNACIÓN DE EVENTOS
    document.getElementById('btn-calor').addEventListener('click', calcularLeyCalor);
    document.getElementById('btn-combinaciones').addEventListener('click', calcularSorteo);

    // 1. LEY DE ENFRIAMIENTO
    function calcularLeyCalor() {
        const t0 = parseFloat(document.getElementById('t0').value);
        const ts = parseFloat(document.getElementById('ts').value);
        const k = parseFloat(document.getElementById('k').value);
        const tiempo = parseFloat(document.getElementById('tiempo').value);

        if (isNaN(t0) || isNaN(ts) || isNaN(k) || isNaN(tiempo)) {
            mostrarResultado('res-calor', 'Por favor, llene todos los campos con valores válidos.', true, 'calor');
            return;
        }

        if (tiempo < 0) {
            mostrarResultado('res-calor', 'El tiempo no puede ser negativo.', true, 'calor');
            return;
        }

        const exponente = -k * tiempo;
        const temperaturaFinal = ts + (t0 - ts) * Math.exp(exponente);
        const resultadoRedondeado = Math.round(temperaturaFinal);

        mostrarResultado('res-calor', `🔥 ¡Cálculo Exitoso! Temperatura Final: ${resultadoRedondeado} °C`, false, 'calor');
    }

    // 2. COMBINACIONES
    function calcularSorteo() {
        const n1 = parseInt(document.getElementById('n1').value);
        const r1 = parseInt(document.getElementById('r1').value);
        const n2 = parseInt(document.getElementById('n2').value);
        const r2 = parseInt(document.getElementById('r2').value);

        if (isNaN(n1) || isNaN(r1) || isNaN(n2) || isNaN(r2)) {
            mostrarResultado('res-combinaciones', 'Por favor, complete todos los campos.', true, 'comb');
            return;
        }

        if (n1 < 0 || r1 < 0 || n2 < 0 || r2 < 0) {
            mostrarResultado('res-combinaciones', 'Los valores no pueden ser números negativos.', true, 'comb');
            return;
        }

        if (r1 > n1) {
            mostrarResultado('res-combinaciones', `⚠️ Error Grupo 1: r₁ (${r1}) no puede ser mayor que n₁ (${n1}).`, true, 'comb');
            return;
        }

        if (r2 > n2) {
            mostrarResultado('res-combinaciones', `⚠️ Error Grupo 2: r₂ (${r2}) no puede ser mayor que n₂ (${n2}).`, true, 'comb');
            return;
        }

        const combGrupo1 = calcularCombinacionIndividual(n1, r1);
        const combGrupo2 = calcularCombinacionIndividual(n2, r2);
        const productoTotal = combGrupo1 * combGrupo2;

        const totalFormateado = productoTotal.toLocaleString('es-BO');

        mostrarResultado('res-combinaciones', `🎲 Combinaciones Totales: ${totalFormateado}`, false, 'comb');
    }

    // LÓGICA MATEMÁTICA PROPIA
    function calcularFactorial(numero) {
        if (numero === 0 || numero === 1) return 1;
        let resultado = 1;
        for (let i = 2; i <= numero; i++) {
            resultado *= i;
        }
        return resultado;
    }

    function calcularCombinacionIndividual(n, r) {
        const numerador = calcularFactorial(n);
        const denominador = calcularFactorial(r) * calcularFactorial(n - r);
        return numerador / denominador;
    }

    // CONTROL DINÁMICO DE ESTILOS EN RESULTADOS
    function mostrarResultado(idContenedor, mensaje, esError, tipoEjercicio) {
        const contenedor = document.getElementById(idContenedor);
        contenedor.innerText = mensaje;
        
        if (esError) {
            // Estilo de alerta universal para errores
            contenedor.style.backgroundColor = '#fef2f2';
            contenedor.style.borderColor = '#fca5a5';
            contenedor.style.color = '#991b1b';
        } else {
            // Estilos de éxito diferenciados por ejercicio
            if (tipoEjercicio === 'calor') {
                contenedor.style.backgroundColor = '#ffedd5';
                contenedor.style.borderColor = '#fdba74';
                contenedor.style.color = '#c2410c';
            } else {
                contenedor.style.backgroundColor = '#f3e8ff';
                contenedor.style.borderColor = '#d8b4fe';
                contenedor.style.color = '#6d28d9';
            }
        }
    }
});