import rippleFoundation from '@materialr/ripple';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import '@material/fab/mdc-fab.scss';

class Fab extends React.Component {
  constructor(props) {
    super(props);
    this.fab = undefined;
    this.componentIsMounted = undefined;
    this.rippleFoundation = undefined;
    this.state = {
      classNames: [],
      cssVariables: {},
    };
    this.getClassNames = this.getClassNames.bind(this);
    this.getClassNamesAsString = this.getClassNamesAsString.bind(this);
    this.getClassNamesFromProps = this.getClassNamesFromProps.bind(this);
    this.rippleCreate = this.rippleCreate.bind(this);
    this.rippleDestroy = this.rippleDestroy.bind(this);
    this.updateClassNames = this.updateClassNames.bind(this);
    this.updateCssVariables = this.updateCssVariables.bind(this);
  }
  componentDidMount() {
    this.componentIsMounted = true;
    if (this.props.rippleEnabled) {
      this.rippleCreate();
    }
  }
  componentDidUpdate({ rippleEnabled: wasRippleEnabled, rippleCentered: wasRippleCentered }) {
    const { rippleEnabled, rippleCentered } = this.props;
    if (wasRippleEnabled && !rippleEnabled) {
      this.rippleDestroy();
    }
    if (!wasRippleEnabled && rippleEnabled) {
      this.rippleCreate();
    }
    if (wasRippleEnabled && rippleEnabled && (wasRippleCentered !== rippleCentered)) {
      this.rippleDestroy();
      this.rippleCreate();
    }
  }
  componentWillUnmount() {
    this.componentIsMounted = false;
    if (this.props.rippleEnabled && this.rippleFoundation) {
      this.rippleDestroy();
    }
  }
  getClassNamesAsString() {
    return `${this.getClassNamesFromProps()} ${this.getClassNames()} ${this.props.className}`
      .replace('  ', ' ').trim();
  }
  getClassNamesFromProps() {
    const { exited, mini } = this.props;
    return classnames({
      'material-icons': true,
      'mdc-fab': true,
      'mdc-fab--exited': exited,
      'mdc-fab--mini': mini,
    });
  }
  getClassNames() {
    return this.state.classNames.join(' ');
  }
  rippleCreate() {
    const { rippleCentered } = this.props;
    this.rippleFoundation = rippleFoundation({
      centered: rippleCentered,
      disabled: false,
      element: this.fab,
      self: this,
      updateClassNames: this.updateClassNames,
      updateCssVariables: this.updateCssVariables,
    });
    this.rippleFoundation.init();
  }
  rippleDestroy() {
    this.rippleFoundation.destroy();
    this.rippleFoundation = undefined;
  }
  updateClassNames(classNames) {
    if (this.componentIsMounted) {
      this.setState({ classNames });
    }
  }
  updateCssVariables(cssVariables) {
    if (this.componentIsMounted) {
      this.setState({ cssVariables });
    }
  }
  render() {
    const { icon, onClick } = this.props;
    return (
      <button
        className={this.getClassNamesAsString()}
        onClick={onClick}
        ref={(fab) => { this.fab = fab; }}
        style={this.state.cssVariables}
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
  rippleCentered: PropTypes.bool,
  rippleEnabled: PropTypes.bool,
};

Fab.defaultProps = {
  className: '',
  exited: false,
  mini: false,
  onClick: undefined,
  rippleCentered: false,
  rippleEnabled: false,
};

export default Fab;
