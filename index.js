const otherHover = ({
  selector,
  otherClass = 'oh-other',
  hoveredClass = 'oh-hovered',
}) => {
  const items = document.querySelectorAll(selector);
  if (items.length) {
    items.forEach((item) => {
      item.addEventListener('mouseover', (e) => {
        const otherItems = Array.from(items).filter((i) => i !== e.target);
        otherItems.forEach((i) => {
          i.classList.remove(hoveredClass);
          i.classList.add(otherClass);
        });
        e.target.classList.remove(otherClass);
        e.target.classList.add(hoveredClass);
      });
      item.addEventListener('mouseout', (e) => {
        items.forEach((i) => {
          i.classList.remove(otherClass);
          i.classList.remove(hoveredClass);
        });
      });
    });
  } else {
    console.warn(`otherHover.js no elements match selector: "${selector}"`);
  }
};

export default otherHover;
