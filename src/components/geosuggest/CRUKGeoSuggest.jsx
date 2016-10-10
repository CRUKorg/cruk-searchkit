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

import { CRUKGeoSuggestAccessor } from './CRUKGeoSuggestAccessor'

export default class CRUKGeoSuggest extends SearchkitComponent {
  accessor:CRUKGeoSuggestAccessor

  constructor(props) {
    super(props)

    this.state = {
      lat: null,
      lng: null,
      searchedAddress: null
    }

    this.onSuggestSelect = this.onSuggestSelect.bind(this)
    this.getSelectedLocation = this.getSelectedLocation.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  /**
   * When a suggest got selected
   * @param  {Object} suggest The suggest
   */
  onSuggestSelect(suggest) {
    // Save exact suggest selection label to use after reload.
    sessionStorage.setItem('cr-geosuggest-label', suggest.label);
    this.refs.g_wrapper.className = 'cr-geosuggest-wrapper'
    this.preformSearch(suggest)
  }

  onChange(suggest) {
    if (suggest === '') {
      const latLng = {
        lat: null,
        lng: null
      }
      this.setState(latLng)
      this.preformSearch({ location: latLng })
    }
  }

  onFocus(suggest) {
    this.refs.g_wrapper.className = 'cr-geosuggest-wrapper cr-geosuggest-wrapper--active'
  }

  onBlur(suggest) {
    this.refs.g_wrapper.className = 'cr-geosuggest-wrapper'
  }

  getSelectedLocation() {
    const geocoder = new window.google.maps.Geocoder()
    const argState = this.accessor.getQueryObject()
    const self = this
    const { searchedAddress } = this.state

    if (argState[this.props.id] !== undefined && Object.keys(argState[this.props.id]).length > 0) {
      const latLng = {
        lat: parseFloat(argState[this.props.id].lat),
        lng: parseFloat(argState[this.props.id].lng)
      }
      geocoder.geocode( { 'location' : latLng }, function( results, status ) {
        self.googeSearch = true
        console.log(results)
        if( status == google.maps.GeocoderStatus.OK ) {
          self.setState({ searchedAddress: results[0].formatted_address })
          self.forceUpdate()
        }
      } );
    }
  }


  preformSearch(query) {
    const { lat, lng } = this.state

    if ((query.location.lat == lat) && (query.location.lng == lng)){
      this.accessor.state = this.accessor.state.clear()
    } else {
      this.accessor.state = this.accessor.state.setValue({
        lat: query.location.lat,
        lng: query.location.lng
      })
    }

    this.searchkit.performSearch()
  }

  defineAccessor() {
    const { id, title, field, resultDistance } = this.props
    return new CRUKGeoSuggestAccessor(id, {
      id, title, field, resultDistance
    })
  }

  /**
   * Render the example app
   */
  render() {
    let { searchedAddress } = this.state
    const argState = this.accessor.getQueryObject()

    if (argState[this.props.id] !== undefined && Object.keys(argState[this.props.id]).length > 0) {
      searchedAddress = sessionStorage.getItem('cr-geosuggest-label')
    }

    return (
      <div className="cr-geosuggest-wrapper" ref="g_wrapper">
        <Geosuggest
          placeholder={this.props.placeholder}
          initialValue={searchedAddress || this.props.initialValue}
          fixtures={this.props.fixtures}
          onSuggestSelect={this.onSuggestSelect}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          location={this.props.location}
          radius={this.props.radius}
          country={this.props.country}
          />
      </div>
    )
  }
}
