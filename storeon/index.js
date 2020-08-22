const createStoreon = (modules) => {
    const events = {};
    let state = {};

    const store = {
        dispatch(event, data) {
            if (event !== '@dispatch') {
                store.dispatch('@dispatch', [event, data, events[event]]);
            }

            if (events[event]) {
                let changes = {};
                let changed;
                events[event].forEach((i) => {
                    const diff = i(state, data);
                    if (diff && typeof diff.then !== 'function') {
                        state = { ...state, ...diff };
                        changed = state;
                        changes = { ...changes, ...diff };
                    }
                });
                if (changed) store.dispatch('@changed', changes);
            }
        },

        get: () => state,

        on(event, cb) {
            (events[event] || (events[event] = [])).push(cb);

            return () => {
                events[event] = events[event].filter((i) => i !== cb);
            };
        },
    };

    modules.forEach((i) => {
        if (i) i(store);
    });
    store.dispatch('@init');

    return store;
};

module.exports = { createStoreon };
