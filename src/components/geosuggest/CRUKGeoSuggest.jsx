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
      placeId: null,
      searchedAddress: null
    }

    this.preformedSearch = false

    this.onSuggestSelect = this.onSuggestSelect.bind(this)
    this.getSelectedLocation = this.getSelectedLocation.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.getSuggestLabel = this.getSuggestLabel.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
  }

  /**
   * When a suggest got selected
   * @param  {Object} suggest The suggest
   */
  onSuggestSelect(suggest) {
    const { searchedAddress } = this.state
    this.setState({
      lat: suggest.lat,
      lng: suggest.lng,
      placeId: suggest.placeId,
      searchedAddress: searchedAddress
    })
    this.refs.g_wrapper.className = 'cr-geosuggest-wrapper'
    this.preformSearch(suggest)
  }

  onChange(suggest) {
    this.refs.geoLoader.className = 'geoSuggestLoader activated'
    if (suggest === '') {
      this.refs.geoLoader.className = 'geoSuggestLoader'
      const latLng = {
        lat: null,
        lng: null,
        placeId: null,
        searchedAddress: null
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

  getSuggestLabel(suggest) {
    this.refs.geoLoader.className = 'geoSuggestLoader'
    return suggest.description
  }

  onKeyPress() {
    console.log('key press')
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
    const { lat, lng } = this.state

    if ((query.location.lat == lat) && (query.location.lng == lng)){
      this.accessor.state = this.accessor.state.clear()
    } else {
      this.accessor.state = this.accessor.state.setValue({
        lat: query.location.lat,
        lng: query.location.lng,
        placeId: query.placeId,
      })
    }

    this.searchkit.performSearch()
  }

  buildAddressFormattedString(locations) {
    
    return locations
            .map((v, i, a) => v.long_name)
            .filter((v, i, a) => a.indexOf(v) === i && a.length > i + 1)
            .filter(function (v, i, a) {
              return a.filter(val => v !== val)
                      .map(val => v.indexOf(val) === -1)
                      .join("")
                      .indexOf("false") === -1
            })
            .join(", ")
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
    const { searchedAddress } = this.state
    const argState = this.accessor.getQueryObject()

    if (!this.preformedSearch && argState[this.props.id] !== undefined && Object.keys(argState[this.props.id]).length > 0) {
      this.getSelectedLocation(argState)
    }


    return (
      <div className="cr-geosuggest-wrapper" ref="g_wrapper">
        <Geosuggest
          ref="geoSuggest"
          placeholder={this.props.placeholder}
          initialValue={searchedAddress || this.props.initialValue}
          fixtures={this.props.fixtures}
          onSuggestSelect={this.onSuggestSelect}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyPress={this.onKeyPress}
          getSuggestLabel={this.getSuggestLabel}
          location={this.props.location}
          radius={this.props.radius}
          country={this.props.country}
          />
          <div className="geoSuggestLoader" ref="geoLoader"></div>
      </div>
    )
  }
}
