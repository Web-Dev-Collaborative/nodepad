import React from 'react'
import PropTypes from 'prop-types'

function Welcome(props) {

  return (
    <div>Welcome!</div>
  )
}

Welcome.propTypes = {
  createRoot: PropTypes.func.isRequired
}

export default Welcome