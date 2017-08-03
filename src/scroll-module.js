class ScrollModule{
  constructor(options){
    this.settings = Object.assign({
      easing: this._easeInOutQuad,
      callback: function(){},
      offset: 0,
      duration: 400,
    }, options);

    this.start,
    this.distance,
    this.duration,
    this.timeStart,
    this.timeElapsed;
  }

  scrollTo(target, instant = false){

    if (typeof target === 'object'){
      this.distance = this.settings.offset + target.getBoundingClientRect().top;
    } else if (typeof target === 'string'){
      this.distance = this.settings.offset + document.querySelector(target).getBoundingClientRect().top;
    } else{
      this.distance = target;
    }

    this.start = window.pageYOffset;
    this.duration = instant ? 0 : this.settings.duration;

    requestAnimationFrame((time) => {
      this.timeStart = time;
      this._loop(time);
    });
  }

  _loop(time){
    this.timeElapsed = time - this.timeStart;

    window.scrollTo(0, this.settings.easing(this.timeElapsed, this.start, this.distance, this.duration));

    if (this.timeElapsed < this.duration)
      requestAnimationFrame((time) => this._loop(time));
    else
      this._end();
  }

  _end(){
    window.scrollTo(0, this.start + this.distance);

    if (typeof this.settings.callback === 'function')
      this.settings.callback();
  }

  _easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
}
