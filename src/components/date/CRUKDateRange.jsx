import React from 'react';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import {
  QueryAccessor,
  SearchkitComponent,
  SearchkitComponentProps,
  ReactComponentType,
  renderComponent
} from 'searchkit';

import { CRUKDateRangeAccessor } from './CRUKDateRangeAccessor'

const defaults = require('lodash/defaults')
const throttle = require("lodash/throttle")
const assign = require("lodash/assign")
const isUndefined = require("lodash/isUndefined")

class CRUKDateRange extends SearchkitComponent {
  accessor:CRUKDateRangeAccessor

  constructor(props) {
    const startDate = (props.startDate) ? props.startDate : null
    const endDate = (props.endDate) ? props.endDate : null
    super(props)
    this.state = {
      focusedInput: null,
      startDate: startDate,
      endDate: endDate
    };
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate })

    if (startDate && endDate) {
      if ((startDate == this.state.startDate) && (endDate == this.state.endDate)){
        this.accessor.state = this.accessor.state.clear()
      } else {
        this.accessor.state = this.accessor.state.setValue({
          min: startDate.format("YYYY-MM-DD"),
          max: endDate.format("YYYY-MM-DD")
        })
      }

      this.searchkit.performSearch()
    }
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput })
  }

  defineAccessor() {
    const { id, title, field, startDate, endDate,
      interval, showHistogram } = this.props
    return new CRUKDateRangeAccessor(id,{
      id, startDate, endDate, title, field, interval
    })
  }

  render() {
    const argState = this.accessor.getQueryObject()
    let { focusedInput, startDate, endDate } = this.state

    if (!isUndefined(argState[this.props.id]) && Object.keys(argState[this.props.id]).length > 0) {
      startDate = (!isUndefined(argState[this.props.id].min)) ? moment(argState[this.props.id].min) : null
      endDate = (!isUndefined(argState[this.props.id].max)) ? moment(argState[this.props.id].max) : null
    }

    return (
      <div>
        <DateRangePicker
          {...this.props}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          visibleMonthOnOpen={true}
        />
      </div>
    )
  }
}

CRUKDateRange.defaultProps = {
  isOutsideRange: () => false
}

export default CRUKDateRange
