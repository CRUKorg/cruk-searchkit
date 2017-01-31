import React from 'react';
import ReactDOM from 'react-dom';
import Geosuggest from 'react-geosuggest';

import {
  QueryAccessor,
  SearchkitComponent,
  SearchkitComponentProps,
  ReactComponentType,
  renderComponent
} from 'searchkit';

import { CRUKSearchkitLocationAccessor } from './CRUKSearchkitLocationAccessor';

export default class CRUKSearchkitLocationInput extends SearchkitComponent {
  accessor:CRUKSearchkitLocationAccessor

  constructor(props) {
    super(props);

    this.state = {
      lat: null,
      lng: null,
      placeId: null,
      searchedAddress: null
    };

    this.preformedSearch = false;

    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    this.getSelectedLocation = this.getSelectedLocation.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.getSuggestLabel = this.getSuggestLabel.bind(this);
    this.onSuggestNoResults = this.onSuggestNoResults.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.updateParentState = this.updateParentState.bind(this);
    this.resetState = this.resetState.bind(this);
    this.locationSort = this.locationSort.bind(this);
    this.handleEmptyLabel = this.handleEmptyLabel.bind(this);
  }

  /**
   * When a suggest got selected
   * @param  {Object} suggest The suggest
   */
  onSuggestSelect(suggest) {
    const { searchedAddress } = this.state;
    this.setState({
      lat: suggest.lat,
      lng: suggest.lng,
      placeId: suggest.placeId,
      searchedAddress: searchedAddress
    }, () => this.preformSearch(suggest));
    this.refs.g_wrapper.className = 'cr-geosuggest-wrapper';
    this.preformSearch(suggest);
    this.removeEmptyLabel();
  }

  onChange(suggest) {
    this.refs.geoLoader.className = 'geoSuggestLoader activated'
    if (suggest === '') {
      this.refs.geoLoader.className = 'geoSuggestLoader'
      this.refs.g_wrapper.className = 'cr-geosuggest-wrapper cr-geosuggest-wrapper--active'
      this.resetState(this.preformSearch({ location: this.state }))
    }
  }

  resetState(callback) {
    const latLng = {
      lat: null,
      lng: null,
      placeId: null,
      searchedAddress: null
    }
    this.setState(latLng, callback)
  }

  onFocus(suggest) {
    this.refs.g_wrapper.className = 'cr-geosuggest-wrapper cr-geosuggest-wrapper--active'
  }

  onBlur(suggest) {
    this.refs.g_wrapper.className = 'cr-geosuggest-wrapper';
    document.querySelector('.geosuggest__suggests').className = 'geosuggest__suggests geosuggest__suggests--hidden';
    const exitingItem = document.getElementsByClassName('geosuggest-item--disabled');
    if (exitingItem[0]) this.refs.geoSuggest.setState({ userInput: '' });
    this.removeEmptyLabel();
  }

  getSuggestLabel(suggest) {
    this.refs.geoLoader.className = 'geoSuggestLoader'
    this.refs.g_wrapper.className = 'cr-geosuggest-wrapper cr-geosuggest-wrapper--dropdown'
    return suggest.description
  }

  onSuggestNoResults(userInputs) {
    const self = this;
    if (this.refs.geoSuggest.refs.input.refs.input.value !== '') {
      setTimeout(function(){
        self.handleEmptyLabel();
      }, 1000);
    }
  }

  handleEmptyLabel() {
    const exitingItem = document.getElementsByClassName('geosuggest-item--disabled');
    const resultList = document.querySelector('.geosuggest__suggests');
    this.removeEmptyLabel();
    const li = document.createElement('li');
    li.className = 'geosuggest-item geosuggest-item--disabled';
    li.innerHTML = 'No results';
    resultList.className = 'geosuggest__suggests';
    this.refs.geoLoader.className = 'geoSuggestLoader'
    resultList.appendChild(li);
  }

  removeEmptyLabel() {
    const resultList = document.querySelector('.geosuggest__suggests');
    const exitingItem = document.getElementsByClassName('geosuggest-item--disabled');
    if (exitingItem[0]) resultList.removeChild(exitingItem[0]);
  }

  updateParentState(argState) {
    if (Object.keys(argState[this.props.id]).length === 0) {
      this.resetState()
    } else {
      this.getSelectedLocation(argState)
    }
  }

  onKeyPress() {
    // this.refs.geoLoader.className = 'geoSuggestLoader activated'
  }

  getSelectedLocation(argState) {
    const geocoder = new window.google.maps.Geocoder()
    const self = this

    this.preformedSearch = true
    geocoder.geocode( { 'placeId' : argState[this.props.id].placeId }, function( results, status ) {
      if( status == google.maps.GeocoderStatus.OK ) {
        self.setState({searchedAddress: self.buildAddressFormattedString(results[0].address_components)})
        self.forceUpdate()
      }
    } );
  }


  preformSearch(query) {
    const { lat, lng } = this.state;
    const sortKey = query.location.lat ? 'location' : 'date';
    this.locationSort(sortKey);
    if ((query.location.lat == lat) && (query.location.lng == lng)) {
      this.accessor.state = this.accessor.state.clear()
    }
    else {
      this.accessor.state = this.accessor.state.setValue({
        lat: query.location.lat,
        lng: query.location.lng,
        placeId: query.placeId,
      })
    }

    this.searchkit.performSearch()
  }

  locationSort(sortValue = 'location') {
    const sortIndex = this.searchkit.accessors.accessors.map((v, i) => { return {i: i, v: v.key} }).filter(v => v.v === 'sort');
    if (sortIndex.length > 0)
      this.searchkit.accessors.accessors[sortIndex[0].i].state = this.searchkit.accessors.accessors[sortIndex[0].i].state.setValue(sortValue);
  }

  buildAddressFormattedString(locations) {
    return locations
            .map((v, i, a) => v.long_name)
            .filter((v, i, a) => a.indexOf(v) === i && a.length > i + 1)
            .filter(function (v, i, a) {
              return a.filter(val => v !== val)
                      .map(val => v.indexOf(val) === -1)
                      .join('')
                      .indexOf('false') === -1
            })
            .join(', ');
  }

  defineAccessor() {
    const { id, title, field, resultRadius } = this.props;
    const updateParentState = this.updateParentState
    return new CRUKSearchkitLocationAccessor(id, {
      id, title, field, resultRadius, updateParentState
    });
  }

  /**
   * Render the example app.
   */
  render() {
    const { searchedAddress } = this.state;
    const argState = this.accessor.getQueryObject();

    if (!this.preformedSearch && argState[this.props.id] !== undefined && Object.keys(argState[this.props.id]).length > 0) {
      this.getSelectedLocation(argState);
    }

    const inputClassName = this.props.inputClassName + ' form-control';

    return (
      <div className="cr-geosuggest-wrapper" ref="g_wrapper">
        <div className="form-group">
          <Geosuggest
            queryDelay={this.props.queryDelay}
            ref="geoSuggest"
            placeholder={this.props.placeholder}
            initialValue={searchedAddress || this.props.initialValue}
            fixtures={this.props.fixtures}
            onSuggestSelect={this.onSuggestSelect}
            onSuggestNoResults={this.onSuggestNoResults}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onKeyPress={this.onKeyPress}
            getSuggestLabel={this.getSuggestLabel}
            location={this.props.location}
            radius={this.props.radius}
            country={this.props.country}
            inputClassName={inputClassName}
          />
          <div className="geoSuggestLoader" ref="geoLoader"></div>
        </div>
      </div>
    )
  }
}
