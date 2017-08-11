class ScrollModule{
  constructor(options){
    this.settings = Object.assign({
      easing: this._easeInOutQuad,
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

    return new Promise((resolve, reject) => {
      requestAnimationFrame((time) => {
        this.timeStart = time;
        this._loop(time, resolve);
      });
    });
  }

  _loop(time, resolve){
    this.timeElapsed = time - this.timeStart;
    window.scrollTo(0, this.settings.easing(this.timeElapsed, this.start, this.distance, this.duration));

    if (this.timeElapsed < this.duration)
      requestAnimationFrame((time) => this._loop(time, resolve));
    else
      this._end(resolve);
  }

  _end(resolve){
    window.scrollTo(0, this.start + this.distance);
    resolve();
  }

  _easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
}
