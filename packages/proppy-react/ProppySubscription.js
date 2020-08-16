import * as React from 'react';
import { create } from '../proppy';

export class ProppySubscription extends React.Component {

  constructor(props, ...args) {
    super(props, ...args);

    const {
      providers,
      proppyFactory,
      parentProps,
    } = props;

    this._parent = create({
      initialize() {
        this.set(parentProps);
      },
    })(providers);
    this._p = props.proppyFactory(providers, this._parent);

    this.state = {
      proppyProps: this._p.props,
    };
  }

  // @TODO: this needs attention
  UNSAFE_componentWillReceiveProps(nextProps) {
    this._parent.set(nextProps.parentProps);
  }

  componentDidMount() {
    this._p.subscribe(
      proppyProps => this.setState({
        proppyProps,
      })
    );
  }

  componentWillUnmount() {
    this._p.destroy();
  }

  render() {
    return this.props.children(this.state.proppyProps);
  }
}
