import { create } from './create';

export function emit(fn) {
  return create({
    didSubscribe() {
      const cb = (...args) => this.set(...args);

      this._cancel = fn(cb, this.props, this.providers);
    },

    willDestroy() {
      if (typeof this._cancel === 'function') {
        this._cancel(this.props);
      }
    }
  });
}
