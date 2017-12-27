import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {stateSelector, currentSelector} from '../reducer/bitcoin'
import TimeSeriesLine from '../components/TimeSeriesLine';
import {MULTIPLIER, INPUT_ARRAY, FILTER_ARRAY} from '../constants'
import {updatePeriod, updateMap} from '../action/index'

export const dateToString = (date, multiplier = 1) => {
  return new Date(date * multiplier).toDateString();
}

export const getDateFormat = (date, multiplier = 1) => {
  return new Date(date * multiplier);
}

const formatData = (values, lapse) => {
  if (values) {
    let tomorrow = dateToString(values[0].x, MULTIPLIER);
    return values.filter(({x}, index) => {
      let previousDay = tomorrow;
      let today = dateToString(x, MULTIPLIER);
      tomorrow = today;
      return (today.indexOf(previousDay) < 0 || index === 0)
    })
    .map((day) => {
      day.x = getDateFormat(day.x, MULTIPLIER)
      return day
    });
  }
  return false
}

const filteredData = (data, lapse) => {
  if (data) {
    let firstDayX = getDateFormat(Date.parse(data[0].x))
    const condition = firstDayX.setMonth(firstDayX.getMonth() + lapse)
    return data.filter(({x}) => {
      return Date.parse(x) > condition
    })
  }
  return false
}

class Bitcoin extends Component {
  static propTypes = {
    current: PropTypes.object,
    data: PropTypes.array,
  }

  componentDidMount() {
    const { updateMap, bitcoin: {data}, current: {values} } = this.props
    if (!data) updateMap(formatData(values))
  }

  onChangeHandler = (ev) => {
    const period = INPUT_ARRAY.indexOf(ev.target.value)
    this.props.updatePeriod(FILTER_ARRAY[period])
    return false
  }

  render() {
    const {bitcoin: {lapse, data}}  = this.props
    let dataFiltered = []
    if (data) dataFiltered = filteredData(data, lapse)
      return (
        <div>
          <h2>Bitcoin rate</h2>
          <form onClick={this.onChangeHandler}>
            {INPUT_ARRAY.map( (period) =>
              <input type="button" key={period} value={period} />
            )}
          </form>
          <TimeSeriesLine
            data={ dataFiltered }
            height={400}
            margin={40}
            selectX={datum => datum.x}
            selectY={datum => datum.y}
            width={900}
          />
        </div>
      )
  }

}

export default connect((state) => ({
  bitcoin: stateSelector(state),
  current : currentSelector(state)
}),{updatePeriod, updateMap})(Bitcoin)