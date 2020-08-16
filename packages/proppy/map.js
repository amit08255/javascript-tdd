import { create } from './create';

export function map(mapperFn) {
  return create({
    initialize() {
      this.set(mapperFn(this.props, this.providers), true);
    },

    handleReceivedProps(parentProps) {
      this.set(mapperFn(parentProps, this.providers), true);
    },
  });
}
