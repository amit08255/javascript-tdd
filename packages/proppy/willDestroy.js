import { create } from './create';

export function willDestroy(fn) {
  return create({
    willDestroy: function () {
      fn(this.props, this.providers);
    },
  });
}
