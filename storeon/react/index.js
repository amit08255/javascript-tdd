const {
    useMemo,
    useContext,
    useState,
    useLayoutEffect,
    useEffect,
    createContext,
    createElement,
    forwardRef,
} = require('react');

const StoreContext = createContext();

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const customContext = (context) => (...keys) => {
    const store = useContext(context);
    if (process.env.NODE_ENV !== 'production' && !store) {
        throw new Error(
            'Could not find storeon context value.'
        + 'Please ensure the component is wrapped in a <StoreContext.Provider>',
        );
    }

    const rerender = useState({});

    useIsomorphicLayoutEffect(() => store.on('@changed', (_, changed) => {
        const changesInKeys = keys.some((key) => key in changed);
        if (changesInKeys) rerender[1]({});
    }), []);

    return useMemo(() => {
        const state = store.get();
        const data = {};
        keys.forEach((key) => {
            data[key] = state[key];
        });
        data.dispatch = store.dispatch;
        return data;
    }, [rerender[0]]);
};

const useStoreon = customContext(StoreContext);

const connectStoreon = (...keys) => {
    const Component = keys.pop();

    return forwardRef((originProps, ref) => {
        const props = { ...originProps, ...useStoreon(...keys), ref };
        return createElement(Component, props);
    });
};

module.exports = {
    useStoreon, StoreContext, connectStoreon, customContext,
};
