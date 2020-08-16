import { create } from './create';

export function handleReceivedProps(fn) {
  return create({
    handleReceivedProps: fn,
  });
}
