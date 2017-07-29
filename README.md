# Smooth Scroll Module

A simple module that allows smooth scrolling to a specified element.

## Basic Setup

Initialize the module like this:

```javascript
  (function(){
    var scroller = new ScrollModule();
    var target = $('.selector');
    scroller.scrollTo(target);
  });
```

## Configuration
```javascript
new ScrollModule({
  easing: this._easeInOutQuad,
  callback: function(){},
  offset: 0,
  duration: 400,
});
```

`easing`

Easing is a function that will describe the easing of the scrollTo() operation. It is in this format:

```javascript
function _easeInOutQuad(t, b, c, d) {
  t /= d / 2
  if (t < 1) return c / 2 * t * t + b
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}
```

`callback`

The callback is a function that will be called when the scrollTo() function is complete.

`offset`

The offset is the number of pixels from the top of the target that scroll will end on.

`duration`

The duration is the number of milliseconds that scrollTo() operation will last unless the scroll is set to instant.

## Methods

`ScrollModule.scrollTo(target, [instant])`

The scrollTo method is used to scroll smoothly to the specified target. As of version 1.0.0, the target must be a JavaScript DOM selector. The smooth scrolling will take place over the amount of time specified by the `duration` parameter using the `easing` function to define its easing curve. Upon completion, it will execute the `callback` function.

The `instant` parameter is an optional boolean flag. If it is true, `duration` will be ignored and the scroll will complete immediately. 

## Future Plans

1. ScrollTo should return a promise when scrolling is complete instead of executing a callback.
2. Instant will be removed as a parameter of .scrollTo() and instead will be its own method.
3. Allow .scrollTo() to supply a selector string as a target.
