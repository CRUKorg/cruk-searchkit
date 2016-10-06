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
      endDate: endDate,
      initialVisibleMonth: null
    }

    this.noArgs = true

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate })
    this.noArgs = false
    
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
    let { focusedInput, startDate, endDate, initialVisibleMonth } = this.state

    if (this.noArgs && argState[this.props.id] !== undefined && Object.keys(argState[this.props.id]).length > 0) {
      if (typeof argState[this.props.id].min !== undefined) {
        startDate =  moment(argState[this.props.id].min)
        initialVisibleMonth = () => startDate
      }
      endDate = (typeof argState[this.props.id].max !== undefined) ? moment(argState[this.props.id].max) : null
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
          initialVisibleMonth={initialVisibleMonth}
        />
      </div>
    )
  }
}

CRUKDateRange.defaultProps = {
  isOutsideRange: () => false
}

export default CRUKDateRange
