import { InfoPanel } from './InfoPanel'

export const LocationAndWeatherDetails = function (props) {
  const { location, weather } = props

  if ( props.error ) {
    return (<h1>Looks like our servers are unable get Weather data. Stay tuned! We'll get back shortly!</h1>)
  }

  if (!location || !weather) {
    return <div role="location-weather-details-empty"/>;
  }

  return (
    <div className="weather-details" role="location-weather-details">
      <h2 className="weather-header">{location.EnglishName} ({location.AdministrativeArea.ID})</h2>

      <div className="weather-details-inner">
        <h3>Current weather is {weather.WeatherText}</h3>
        <h3>Currently it's {weather.IsDayTime ? 'Day' : 'Night'}</h3>

        <InfoPanel name="Temperature"
                   value={`${weather.Temperature.Metric.Value} ${weather.Temperature.Metric.Unit}`}/>
        <InfoPanel name="Real Feel"
                   value={`${weather.RealFeelTemperature.Metric.Value} ${weather.RealFeelTemperature.Metric.Unit}`}/>
        <InfoPanel name="Wind"
                   value={`${weather.Wind.Speed.Metric.Value} ${weather.Wind.Speed.Metric.Unit}`}/>
        <InfoPanel name="WindGust"
                   value={`${weather.WindGust.Speed.Metric.Value} ${weather.WindGust.Speed.Metric.Unit}`}/>
        <InfoPanel name="Visibility"
                   value={`${weather.Visibility.Metric.Value} ${weather.Visibility.Metric.Unit}`}/>
        <InfoPanel name="Pressure"
                   value={`${weather.PressureTendency.LocalizedText} ${weather.Pressure.Metric.Value} ${weather.Pressure.Metric.Unit}`}/>
        <span className="observed-on">Observed on {weather.LocalObservationDateTime}</span>
      </div>
    </div>
  )
}