# DualRange.js
A javascript library, *without dependencies* like jQuery, Zepto and etc ... Adds double values in an input range, with a callback to facilitate implementation of Min and Max values of the input, and with a minimum support for mobile

## Install / Usage

### Javascript
Add Dualrange javascript library
```html
<script src="https://cdn.rawgit.com/figuarnieri/dualrange/master/dualrange.min.js"></script> // CDN
or
<script src="path/js/dualrange.min.js"></script> // Relative path
```

### CSS
Add Dualrange stylesheet
```html
<link rel="stylesheet" href="https://cdn.rawgit.com/figuarnieri/dualrange/master/dualrange.min.css" /> // CDN
or
<link rel="stylesheet" href="path/css/dualrange.min.css" /> // Relative path
```

### Init / Callback
```javascript
  new DualRange('.selector', (e) => {
    document.querySelector('.min').textContent = e.min;
    document.querySelector('.max').textContent = e.max;
  });
```

## Request / Response
To retrieve input range values on the server, the concatenated name will be sent with a "[]". So, if you write <input type="range" name="RangeValues">, the name RangeValues will be converted to RangeValues[]. This makes it easy for some languages to retrieve multiple values on the server

## Examples
### Simple
#### HTML
```html
<input type="range" name="Range" />
```

### Min and Max
#### HTML
```html
<input type="range" name="Range" min="-10" max="175" />
```

### Steps
#### HTML
```html
<input type="range" name="Range" step="10" />
```

### Decimal Steps
#### HTML
```html
<input type="range" name="Range" step="0.01" />
```

### Custom Style Class
#### HTML
```html
<input type="range" name="Range" class="custom-class" />
```
#### CSS
```css
.custom-class .dualrange__range {
  background-color: #09f;
}
.custom-class .dualrange__min, .custom-class .dualrange__max {
  border-radius: 6px;
  border-color: #09f;
}
.custom-class .dualrange__min:before, .custom-class .dualrange__max:before {
  background-color: #059;
  box-shadow: 0 0 4px #059;
}
.custom-class .dualrange__min:after, .custom-class .dualrange__max:after {
  border-color: #09f;
}
```

## Source
[Github](https://github.com/figuarnieri/dualrange) | [@figuarnieri](https://twitter.com/figuarnieri)

## License
The MIT License
Copyright 2018 © [Filipe Guarnieri](https://figuarnieri.github.io/)
