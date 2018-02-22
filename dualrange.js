class DualRange {
  constructor(element, fallback){
    document.querySelectorAll(element).forEach(item => {
      item.classList.add('dualrange__input-max');
      item.setAttribute('value', item.max||100);
      item.setAttribute('step', item.step||0.1);
      item.setAttribute('data-dualrange-max', '');
      item.outerHTML = `<div class="dualrange" data-dualrange-valmin="${item.min}" data-dualrange-valmax="${item.max}"><input data-dualrange-min step="0.1" type="range" min="${item.min}" max="${item.max}" value="${item.min}" class="dualrange__input-min">${item.outerHTML}<div class="dualrange__min" style="left: 0%; transform: translate(0%, -50%);"></div><div class="dualrange__max" style="left: 100%; transform: translate(-100%, -50%);"></div><div class="dualrange__range"></div></div>`;
    });
    this.init(element);
    this.fn = fallback;
  }
  init(element){
    document.querySelectorAll('.dualrange input').forEach(item => {
      this.range(item);
    });
  }
  range(tag){
    const _parent = tag.parentNode,
    _child = _parent.children;
    tag.addEventListener('input', event => {
      const _left = 100 / (tag.max - tag.min) * (tag.value-tag.min),
      _min = parseFloat(_child[0].value),
      _max = parseFloat(_child[1].value),
      _event = new Event('input');
      if(_min > _max){
        _child[0].value = _min-0.1;
        _child[1].value = _max+0.1;
        _child[0].dispatchEvent(_event);
        _child[1].dispatchEvent(_event);
        return false;
      }
      _child[tag.hasAttribute('data-dualrange-max') ? 3 : 2].style.left = `${_left}%`;
      _child[tag.hasAttribute('data-dualrange-max') ? 3 : 2].style.transform = `translate(-${_left}%, -50%)`;
      if(this.fn){
        clearTimeout(window.dualRangeFallback);
        window.dualRangeFallback = setTimeout(() => {
          this.fallback(tag, this.fn);
        }, 100);
      }
    });

    _parent.addEventListener('mousemove', event => {
      const _x = event.offsetX,
      _width = _parent.clientWidth,
      _leftMin = parseFloat(_parent.querySelector('.dualrange__min').style.left),
      _leftMax = parseFloat(_parent.querySelector('.dualrange__max').style.left),
      _min = parseInt(_x * 100 / _width) - _leftMin,
      _max = Math.abs((_x * 100 / _width) - _leftMax),
      _minRange = _min < _max;
      _parent.querySelector(_minRange ? '.dualrange__input-min' : '.dualrange__input-max').classList.add('dualrange__zindex');
      _parent.querySelector(_minRange ? '.dualrange__input-max' : '.dualrange__input-min').classList.remove('dualrange__zindex');
    });
  }
  fallback(input, fn){
    fn({
      min: parseFloat(input.parentNode.children[0].value),
      max: parseFloat(input.parentNode.children[1].value)
    });
  }
}