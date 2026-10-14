```javascript
document.addEventListener("DOMContentLoaded", () => {
    // Detectar enlaces internos
    document.querySelectorAll("a[href]").forEach(enlace => {
        enlace.addEventListener("click", evento => {
            const destino = new URL(enlace.href, location.href);

            // No intervenir en enlaces externos,
            // anclas o nuevas pestañas
            if (
                destino.origin !== location.origin ||
                destino.pathname === location.pathname &&
                destino.search === location.search ||
                enlace.target === "_blank" ||
                evento.ctrlKey ||
                evento.metaKey ||
                evento.shiftKey ||
                evento.altKey ||
                evento.button !== 0
            ) {
                return;
            }

            evento.preventDefault();
            document.body.classList.add("desvanecer");

            setTimeout(() => {
                location.href = destino.href;
            }, 300);
        });
    });
});
```
