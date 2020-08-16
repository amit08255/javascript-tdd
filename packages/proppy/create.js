function notify(callbacks, props) {
  callbacks.forEach(cb => cb(props));
}

function defaultParentHandler() {
  this.set.apply(this, arguments);
}

function getParentHandler(parent, options) {
  if (
    !parent ||
    options.handleReceivedProps === false
  ) {
    return;
  }

  if (
    options.handleReceivedProps === true ||
    options.handleReceivedProps === undefined
  ) {
    return defaultParentHandler;
  }

  return options.handleReceivedProps;
}

export function create(options) {
  return function (providers = {}, parent) {
    let callbacks = [];
    let hasSubscribed = false;
    const parentHandler = getParentHandler(parent, options);
    let parentSubscription;

    const p = {
      props: parent
        ? Object.assign({}, parent.props)
        : {},
      parent,
      providers,
    };

    p.set = function (props, replace = false) {
      p.props = replace
        ? Object.assign({}, props)
        : Object.assign({}, p.props, props);

      return notify(callbacks, p.props);
    };

    p.subscribe = function (cb) {
      if (!hasSubscribed) {
        hasSubscribed = true;

        if (options.didSubscribe) {
          options.didSubscribe.apply(p);
        }
      }

      callbacks.push(cb);
      cb(p.props);

      return function () {
        callbacks = callbacks.filter(callback => cb !== callback);
      };
    };

    p.destroy = function () {
      if (options.willDestroy) {
        options.willDestroy.apply(p);
      }

      if (parentSubscription) {
        parentSubscription();
        parent.destroy();
      }

      callbacks = [];
    };

    if (options.initialize) {
      options.initialize.apply(p);
    }

    if (parentHandler) {
      parentSubscription = parent.subscribe(
        props => parentHandler.apply(p, [props]),
      );
    }

    return p;
  };
}
