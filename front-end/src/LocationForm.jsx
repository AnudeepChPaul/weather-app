import PropTypes from 'prop-types'

export const LocationForm = (props) => {
  return (
    <form className="location-form" onSubmit={evt => props.onSubmit(evt)} autoComplete="off" role="location-form">
      <input className="location-input" name="location" type="text" role="location-input"/>
      <button className="location-submit-button" type="submit" role="location-submit-button"> Check Weather</button>
    </form>
  )
}

LocationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}