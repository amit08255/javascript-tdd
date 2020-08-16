import { create } from './create';

export function withObservable(stream$) {
  return create({
    didSubscribe() {
      const observable = typeof stream$ === 'function'
        ? stream$(this.props, this.providers)
        : stream$;

      this._observableSubscription = observable.subscribe(
        props => this.set(props),
      );
    },

    willDestroy() {
      this._observableSubscription.unsubscribe();
    },
  });
}
