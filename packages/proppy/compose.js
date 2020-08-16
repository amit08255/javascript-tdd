export function compose(...funcs) {
  if (funcs.length === 0) {
    throw new Error('Cannot compose without any ProppyJS factories');
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return function (providers = {}, parent = null) {
    let f = funcs[0](providers, parent);

    for (let i = 1; i < funcs.length; i++) {
      f = funcs[i](providers, f);
    }

    return f;
  };
}
