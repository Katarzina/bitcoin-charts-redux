import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import BitcoinCurrent from './Bitcoin'
import {Loading} from '../components/Loading/Loading'
import {Error} from '../components/Error/Error'
import {isLoaded} from '../reducer/loading'
import {fetchApi} from '../action/index'
import {BASE_URL, BITCOIN} from '../constants'

class BitcoinLoad extends Component {

  static propTypes = {
    bitcoin: PropTypes.object.isRequired
  }

  componentDidMount() {
    const {isLoaded, bitcoin: {isLoading} = {}, fetchApi} = this.props
    if (!isLoaded && !isLoading) fetchApi(BASE_URL, BITCOIN )
  }

  render() {
    const {isLoaded, bitcoin: {error, current, isInvalid, isLoading} = {}} = this.props
    if (isLoading) {
      return (
        <h2><Loading /></h2>
      )
    }

    if (isInvalid) {
      return (
        <div><Error error={error} /></div>
      )
    }

    if ((!current) && !isLoaded ) {
      return null
    }

    return (
      <div className="Bitcoin">
        <BitcoinCurrent />
      </div>
    );
  }
}

export default connect(({loading, bitcoin }) => ({
  isLoaded : isLoaded(loading),
  bitcoin
}),{fetchApi})(BitcoinLoad)

