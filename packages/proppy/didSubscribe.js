import { create } from './create';

export function didSubscribe(fn) {
  return create({
    didSubscribe: function () {
      this._u = fn(this.props, this.providers);
    },

    willDestroy() {
      if (typeof this._u === 'function') {
        this._u(this.props, this.providers);
      }
    }
  });
}
