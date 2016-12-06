import React from 'react';

/**
 * Export our CRUKSearchkitAlert component.
 */
export default class CRUKSearchkitAlert extends React.Component {
  static propTypes = {
    type: React.PropTypes.string,
    text: React.PropTypes.string.isRequired,
    dismissable: React.PropTypes.bool,
    animation: React.PropTypes.string
  }

  static defaultProps = {
    type: 'warning',
    dismissable: false
  }

  render() {
    const dismissableClass = this.props.dismissable ? ' cr-hu-alert--dismissible' : ''
    const animationClass = this.props.animation ? ` cr-animated-${this.props.animation}` : ''
    const cssClasses = `cr-hu-alert cr-hu-alert--${this.props.type}${dismissableClass}${animationClass}`; 
    return (
      <div className={cssClasses} role="alert">
        <i className="cr-hu-alert__icon" aria-hidden="true"></i>
        <div className="cr-hu-alert__text">
          {this.props.text}
        </div>
        { this.props.dismissable && <button type="button" className="cr-hu-alert__dismiss" aria-label="Dismiss"></button> }
      </div>
    );
  }
}
