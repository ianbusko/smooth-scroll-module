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
  easing: this._easing,
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

`offset`

The offset is the number of pixels from the top of the target that scroll will end on.

`duration`

The duration is the number of milliseconds that scrollTo() operation will last unless the scroll is set to instant.

## Methods

`ScrollModule.scrollTo(target, [instant = false])`

The scrollTo method is used to scroll smoothly to the specified target. The smooth scrolling will take place over the amount of time specified by the `duration` parameter using the `easing` function to define its easing curve. This method returns a promise when scrolling is complete.

The `target` parameter must be a JavaScript DOM selector, a valid selector string, or an integer value for the amount of distance to scroll.

The `instant` parameter is an optional boolean flag. If it is true, `duration` will be ignored and the scroll will complete immediately.
