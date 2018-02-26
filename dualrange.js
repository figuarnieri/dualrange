class DualRange {
  constructor(element, callback){
    document.querySelectorAll(element).forEach(item => {
      const _parent = item.parentNode,
      _inputClass = item.className;
      item.className="";
      item.classList.add('dualrange__input-max');
      if(!item.max){item.max=100;}
      if(!item.min){item.min=0;}
      item.setAttribute('value', item.max||100);
      item.setAttribute('step', item.step||1);
      item.setAttribute('data-dualrange-max', '');
      item.outerHTML = `<div class="dualrange ${_inputClass}" data-dualrange-valmin="${item.min}" data-dualrange-valmax="${item.max}"><input data-dualrange-min step="0.1" type="range" min="${item.min}" max="${item.max}" value="${item.min}" class="dualrange__input-min">${item.outerHTML}<div class="dualrange__min" style="left: 0%; transform: translate(0%, -50%);"></div><div class="dualrange__max" style="left: 100%; transform: translate(-100%, -50%);"></div><div class="dualrange__range"></div></div>`;
      this.init(_parent, callback);
    });
  }
  init(element, callback){
    element.querySelectorAll('.dualrange input').forEach((item, i) => {
      item.step = (i===0) ? item.nextElementSibling.step : item.step;
      this.range(item, callback);
    });
  }
  range(tag, callback){
    const _parent = tag.parentNode,
    _child = _parent.children;
    tag.addEventListener('input', event => {
      const _left = 100 / (tag.max - tag.min) * (tag.value-tag.min),
      _min = parseFloat(_child[0].value),
      _max = parseFloat(_child[1].value),
      _steps = parseFloat(_child[0].step),
      _event = new Event('input');
      if(_min > _max){
        _child[0].value = _min - Math.max(1, _steps);
        _child[1].value = _max + Math.max(1, _steps);
        _child[0].dispatchEvent(_event);
        _child[1].dispatchEvent(_event);
        return false;
      }
      _child[tag.hasAttribute('data-dualrange-max') ? 3 : 2].style.left = `${_left}%`;
      _child[tag.hasAttribute('data-dualrange-max') ? 3 : 2].style.transform = `translate(-${_left}%, -50%)`;
      if(callback){
        clearTimeout(window.dualRangeCallback);
        window.dualRangeCallback = setTimeout(() => {
          callback({
            min: parseFloat(tag.parentNode.children[0].value),
            max: parseFloat(tag.parentNode.children[1].value)
          });
        }, 10);
      }
    });

    tag.name = tag.className==='dualrange__input-min' ? `${tag.nextElementSibling.name}[]` : `${tag.name}[]`;

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
  callback(input, fn){
    fn();
  }
}