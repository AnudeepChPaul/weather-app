import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { setupServer } from 'msw/node';
import { graphql, rest } from 'msw'

const server = setupServer(
  rest.post('http://localhost:4000/', (req, res, ctx) => {
    return res(ctx.json({
        "data": {
          "location": [ {
            "Key": "2877682",
            "Type": "City",
            "LocalizedName": "Kolaghat",
            "EnglishName": "Kolaghat",
            "AdministrativeArea": {
              "ID": "WB",
              "LocalizedName": "West Bengal",
              "EnglishName": "West Bengal",
              "CountryID": "IN"
            }
          } ], "weather": [ {
            "LocalObservationDateTime": "2021-06-13T07:35:00+05:30",
            "WeatherText": "Cloudy",
            "HasPrecipitation": false,
            "PrecipitationType": null,
            "IsDayTime": true,
            "Temperature": { "Metric": { "Unit": "C", "Value": "29.1" }, "Imperial": { "Unit": "F", "Value": "84" } },
            "RealFeelTemperature": {
              "Metric": { "Unit": "C", "Value": "35.5" },
              "Imperial": { "Unit": "F", "Value": "96" }
            },
            "Wind": { "Speed": { "Metric": { "Value": "8.5", "Unit": "km/h" } } },
            "WindGust": { "Speed": { "Metric": { "Value": "11.3", "Unit": "km/h" } } },
            "Visibility": { "Metric": { "Value": "16.1", "Unit": "km" } },
            "DewPoint": { "Metric": { "Value": "26.1", "Unit": "C" } },
            "TemperatureSummary": {
              "Past6HourRange": {
                "Minimum": { "Metric": { "Value": "27", "Unit": "C" } },
                "Maximum": { "Metric": { "Value": "29.1", "Unit": "C" } }
              },
              "Past12HourRange": {
                "Minimum": { "Metric": { "Value": "27", "Unit": "C" } },
                "Maximum": { "Metric": { "Value": "29.1", "Unit": "C" } }
              },
              "Past24HourRange": {
                "Minimum": { "Metric": { "Value": "26.7", "Unit": "C" } },
                "Maximum": { "Metric": { "Value": "32.9", "Unit": "C" } }
              }
            },
            "Pressure": { "Metric": { "Value": "998", "Unit": "mb" } },
            "PressureTendency": { "LocalizedText": "Steady" }
          } ]
        }
      }
    ))
  })
)

test('Application is rendered', () => {
  render(<App/>);
  const linkElement = screen.queryByRole('application-wrapper');
  expect(linkElement).toBeInTheDocument();
});

test('Application renders Search box and Submit button', () => {
  render(<App/>);
  const searchBox = screen.queryByRole('location-input');
  const submitButton = screen.queryByRole('location-submit-button');
  expect(searchBox).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('Application should render Weather Details without input', () => {
  render(<App/>);
  fireEvent.click(screen.queryByRole('location-submit-button'))


  const emptyDetails = screen.queryByRole('location-weather-details-empty')
  expect(emptyDetails).toBeInTheDocument();

  const details = screen.queryByRole('location-weather-details')
  expect(details).toBe(null);
});