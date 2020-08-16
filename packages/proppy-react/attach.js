import * as React from 'react';
import { ProppyContext } from './ProppyContext';
import { ProppySubscription } from './ProppySubscription';

export function attach(P) {
  return function (Component) {
    return function (props) {
      return (
        <ProppyContext.Consumer>
          {providers => (
            <ProppySubscription
              parentProps={props}
              providers={providers || {}}
              proppyFactory={P}
            >
              {proppyProps => <Component {...proppyProps} />}
            </ProppySubscription>
          )}
        </ProppyContext.Consumer>
      );
    };
  };
}
