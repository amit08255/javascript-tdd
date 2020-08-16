import * as React from 'react';
import { ProppyContext } from './ProppyContext';

export class ProppyProvider extends React.Component {

  render() {
    return (
      <ProppyContext.Provider value={this.props.providers}>
        {this.props.children}
      </ProppyContext.Provider>
    );
  }
}
