import { MDCRipple } from '@material/ripple';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import '@material/fab/mdc-fab.scss';

class Fab extends React.Component {
  constructor(props) {
    super(props);
    this.elementRoot = undefined;
    this.ripple = undefined;
    this.getClassNames = this.getClassNames.bind(this);
    this.rippleCreate = this.rippleCreate.bind(this);
    this.rippleDestroy = this.rippleDestroy.bind(this);
  }
  componentDidMount() {
    if (this.props.ripple) {
      this.rippleCreate();
    }
  }
  componentDidUpdate({ ripple: previousRipple }) {
    if (this.props.ripple !== previousRipple) {
      if (previousRipple) {
        this.rippleDestroy();
      } else {
        this.rippleCreate();
      }
    }
  }
  componentWillUnmount() {
    if (this.props.ripple) {
      this.rippleDestroy();
    }
  }
  getClassNames() {
    const { className, exited, mini } = this.props;
    return classnames({
      'material-icons': true,
      'mdc-fab': true,
      'mdc-fab--exited': exited,
      'mdc-fab--mini': mini,
      [className]: !!className,
    });
  }
  rippleCreate() {
    this.ripple = new MDCRipple(this.elementRoot);
  }
  rippleDestroy() {
    this.ripple.destroy();
  }
  render() {
    const { getClassNames, props: { icon, onClick } } = this;
    return (
      <button
        className={getClassNames()}
        onClick={onClick}
        ref={(elementRoot) => { this.elementRoot = elementRoot; }}
      >
        <span className="mdc-fab__icon">
          {icon}
        </span>
      </button>
    );
  }
}

Fab.propTypes = {
  className: PropTypes.string,
  exited: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  mini: PropTypes.bool,
  onClick: PropTypes.func,
  ripple: PropTypes.bool,
};

Fab.defaultProps = {
  className: undefined,
  exited: false,
  mini: false,
  onClick: undefined,
  ripple: false,
};

export default Fab;
