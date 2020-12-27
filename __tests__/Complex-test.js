import otherHover from '..';

document.body.innerHTML = `
<div class="wrapper">
  <p class="menu-item">Test 1</p>
  <p class="menu-item">Test 2</p>
  <p class="menu-item">Test 3</p>
  <p class="menu-item">Test 3</p>
</div>
`;

otherHover({
  selector: '.wrapper .menu-item', // (required) used to select the group of elements
  otherClass: 'custom-other', // (optional) the class to add to non-hovered elements in the group
  hoveredClass: 'custom-hovered', // (optional) the class to add to hovered element (default: selected)
});

const testElements = document.querySelectorAll('.wrapper .menu-item');

describe('on hover', () => {
  beforeAll(() => {
    const hover = new MouseEvent('mouseover', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    testElements[1].dispatchEvent(hover);
  });
  test('hovered element gets clustom class', () => {
    expect(testElements[1].classList.contains('custom-hovered')).toBeTruthy();
  });
  test('other elements get custom other class', () => {
    testElements.forEach((el) => {
      if (el !== testElements[1]) {
        expect(el.classList.contains('custom-other')).toBeTruthy();
      }
    });
  });
});

describe('on unhover', () => {
  beforeAll(() => {
    const hover = new MouseEvent('mouseover', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    testElements[1].dispatchEvent(hover);

    const unHover = new MouseEvent('mouseout', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    testElements[1].dispatchEvent(unHover);
  });
  test('no elements have custom hovered class', () => {
    testElements.forEach((el) => {
      expect(el.classList.contains('custom-hovered')).toBeFalsy();
    });
  });
  test('no elements have custom other class', () => {
    testElements.forEach((el) => {
      expect(el.classList.contains('custom-other')).toBeFalsy();
    });
  });
});
