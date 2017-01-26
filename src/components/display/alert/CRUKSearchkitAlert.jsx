import React from 'react';
import cookie from 'react-cookie';
import {
  SearchkitComponent
} from "searchkit";

/**
 * Export our CRUKSearchkitAlert component.
 */
export default class CRUKSearchkitAlert extends SearchkitComponent {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    text: React.PropTypes.object.isRequired,
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
    this.stopAnimation = false;

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({invisible: true});
    cookie.save(`cru-hu-alert-${this.props.id}`, true);
  }

  componentDidMount() {
    this.searchkit.addResultsListener((result) => {
      this.stopAnimation = true;
    });
  }

  render() {
    if (this.state.invisible || this.isLoading()) return null;
    const dismissableClass = this.props.dismissable ? ' cr-hu-alert--dismissible' : '';
    const animationClass = (this.props.animation && !this.stopAnimation) ? ` cr-animated-${this.props.animation}` : '';
    const cssClasses = `cr-hu-alert cr-hu-alert--${this.props.type}${dismissableClass}${animationClass}`; 
    return (
      <div id={this.props.id} className={cssClasses} role="alert">
        <i className="cr-hu-alert__icon" aria-hidden="true"></i>
        <div className="cr-hu-alert__text">
          {this.props.text}
        </div>
        { this.props.dismissable && <button type="button" className="cr-hu-alert__dismiss" onClick={this.handleClick} aria-label="Dismiss"></button> }
      </div>
    );
  }
}
