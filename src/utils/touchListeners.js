export const addTouchListeners = (element, activeClass = 'touch-active') => {
    element.addEventListener('touchstart', () => {
      element.classList.add(activeClass);
      setTimeout(() => {
        element.classList.remove(activeClass);
      }, 300);
    });
  };
  