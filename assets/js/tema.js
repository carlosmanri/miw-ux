/* ECMAScript 2025. Única interacción programada: preferencia de color. */
(() => {
  'use strict';
  const clave = 'ecw-tema';
  const temas = ['sistema', 'claro', 'oscuro'];
  let tema = 'sistema';

  try {
    const guardado = localStorage.getItem(clave);
    if (temas.includes(guardado)) tema = guardado;
  } catch {
    // La lectura puede estar bloqueada. La preferencia del sistema sigue activa.
  }

  const aplicar = (valor) => {
    document.documentElement.dataset.tema = valor;
  };
  aplicar(tema);

  document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('tema');
    const control = document.getElementById('control-tema');
    if (!selector || !control) return;
    selector.value = tema;
    control.hidden = false;
    selector.addEventListener('change', () => {
      tema = temas.includes(selector.value) ? selector.value : 'sistema';
      aplicar(tema);
      try {
        localStorage.setItem(clave, tema);
      } catch {
        // El cambio funciona en esta página aunque no pueda conservarse.
      }
    });
    window.addEventListener('storage', (evento) => {
      if (evento.key !== clave && evento.key !== null) return;
      tema = temas.includes(evento.newValue) ? evento.newValue : 'sistema';
      aplicar(tema);
      selector.value = tema;
    });
  });
})();
