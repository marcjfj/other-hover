import otherHover from '..';
// jest.mock("../otherHover");
document.body.innerHTML = `
<div class="wrapper">
  <p class="menu-item">Test 1</p>
  <p class="menu-item">Test 2</p>
  <p class="menu-item">Test 3</p>
</div>
`;
otherHover({
  selector: '.wrapper .menu-item',
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
  test('hovered element gets class .oh-hovered added to it', () => {
    expect(testElements[1].classList.contains('oh-hovered')).toBeTruthy();
  });

  test('other elements get class .oh-other', () => {
    expect(testElements[0].classList.contains('oh-other')).toBeTruthy();
    expect(testElements[2].classList.contains('oh-other')).toBeTruthy();
  });
  test('hovered element does not gey .oh-other class', () => {
    expect(testElements[1].classList.contains('oh-other')).toBeFalsy();
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
  test('no elements have .oh-hovered class', () => {
    testElements.forEach((el) => {
      expect(el.classList.contains('oh-hovered')).toBeFalsy();
    });
  });
  test('no elements have .oh-other class', () => {
    testElements.forEach((el) => {
      expect(el.classList.contains('oh-other')).toBeFalsy();
    });
  });
});
