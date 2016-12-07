import React from 'react';
import cookie from 'react-cookie';

/**
 * Export our CRUKSearchkitAlert component.
 */
export default class CRUKSearchkitAlert extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    text: React.PropTypes.string.isRequired,
    dismissable: React.PropTypes.bool,
    animation: React.PropTypes.string
  }

  static defaultProps = {
    type: 'warning',
    dismissable: false
  }

  constructor(props) {
    super(props);
    this.state = {
      invisible: cookie.load(`cru-hu-alert-${this.props.id}`)
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({invisible: true});
    cookie.save(`cru-hu-alert-${this.props.id}`, true);
  }

  render() {
    const dismissableClass = this.props.dismissable ? ' cr-hu-alert--dismissible' : '';
    const animationClass = this.props.animation ? ` cr-animated-${this.props.animation}` : '';
    const hiddenClass = this.state.invisible ? ' hidden' : '';
    const cssClasses = `cr-hu-alert cr-hu-alert--${this.props.type}${dismissableClass}${animationClass}${hiddenClass}`; 
    return (
      <div className={cssClasses} role="alert">
        <i className="cr-hu-alert__icon" aria-hidden="true"></i>
        <div className="cr-hu-alert__text">
          {this.props.text}
        </div>
        { this.props.dismissable && <button type="button" className="cr-hu-alert__dismiss" onClick={this.handleClick} aria-label="Dismiss"></button> }
      </div>
    );
  }
}
