import './App.css'
import { useState } from 'react'
import { LocationAndWeatherDetails } from './LocationAndWeatherDetails'
import { LocationForm } from './LocationForm'


const getWeatherDetails = async function (cityName) {
  const resp = await fetch('http://localhost:4000/', {
    headers: {
      "Content-Type": 'application/json',
      "Access-Control-Allow-Origin": "https://localhost:3000"
    },
    method: 'POST',
    body: JSON.stringify({
      variables: {
        city: cityName
      },
      query: `# Write your query or mutation here
        query GetLocationAndWeather($city: String!) {
          location(city: $city) {
            Key
            Type
            LocalizedName
            EnglishName
            AdministrativeArea {
              ID
              LocalizedName
              EnglishName
              CountryID
            }
          }
        
          weather(city: $city) {
            LocalObservationDateTime
            WeatherText
            HasPrecipitation
            PrecipitationType
            IsDayTime
            Temperature {
              Metric {
                Unit
                Value
              }
              Imperial {
                Unit
                Value
              }
            }
            RealFeelTemperature {
              Metric {
                Unit
                Value
              }
              Imperial {
                Unit
                Value
              }
            }
            Wind {
              Speed {
                Metric {
                  Value
                  Unit
                }
              }
            }
            WindGust {
              Speed {
                Metric {
                  Value
                  Unit
                }
              }
            }
            Visibility {
              Metric {
                Value
                Unit
              }
            }
            DewPoint {
              Metric {
                Value
                Unit
              }
            }
            TemperatureSummary {
              Past6HourRange {
                Minimum {
                  Metric {
                    Value
                    Unit
                  }
                }
                Maximum {
                  Metric {
                    Value
                    Unit
                  }
                }
              }
              Past12HourRange {
                Minimum {
                  Metric {
                    Value
                    Unit
                  }
                }
                Maximum {
                  Metric {
                    Value
                    Unit
                  }
                }
              }
              Past24HourRange {
                Minimum {
                  Metric {
                    Value
                    Unit
                  }
                }
                Maximum {
                  Metric {
                    Value
                    Unit
                  }
                }
              }
            }
            Pressure {
              Metric {
                Value
                Unit
              }
            }
            PressureTendency {
              LocalizedText
            }
          }
        }`
    })
  })

  const data = await resp.json();
  return data;
}

function App() {
  const [ data, setData ] = useState({ location: [], weather: [], error: false });

  const onSubmit = async (evt) => {
    evt.preventDefault()

    const value = evt.currentTarget && evt.currentTarget.children && evt.currentTarget.children[0].value;
    if ( !value ) {
      return;
    }

    const resp = await getWeatherDetails(value)

    setData({
      ...data,
      ...resp.data,
      error: !!resp.data.length
    })
  }

  const location = data.location[0],
    weather = data.weather[0];

  return (
    <div className="weather-app" role="application-wrapper">
      <LocationForm onSubmit={onSubmit}/>

      <div className="weather-info-area">
        <LocationAndWeatherDetails location={location} weather={weather} error={data.error}/>
      </div>
    </div>
  );
}

export default App;
