const { gql } = require('apollo-server')
const { RESTDataSource } = require('apollo-datasource-rest')

const API_KEY="jNPrgHu3RizDM2CCwlkeZlx4XGWMLxab"

class LocationAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://dataservice.accuweather.com/locations/v1/cities`
  }

  async getLocationData(city) {
    return this.get(`/search`, {
      apikey: API_KEY,
      q: city
    });
  }
}

class WeatherAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://dataservice.accuweather.com/currentconditions/v1/`
  }

  async getWhetherForLocation(locationKey) {
    return this.get(`/${locationKey}`, {
      apikey: API_KEY,
      language: 'en-in',
      details: true
    });
  }
}

const typeDefs = gql`    
    type AdminArea {
        ID: String
        LocalizedName: String
        EnglishName: String
        CountryID: String
    }
    
    type Location {
        Key: String
        Type: String
        LocalizedName: String
        EnglishName: String
        AdministrativeArea: AdminArea
    }

    type Query {
        location(city: String!): [Location]
        weatherByLocation(locationKey: String!): [Weather]
        weather(city: String!): [Weather]
    }

    type UnitWiseValue {
        Value: String
        Unit: String
        UnitType: String
    }

    type Temperature {
        Metric: UnitWiseValue
        Imperial: UnitWiseValue
    }

    type RealFeelTemperature {
        Metric: UnitWiseValue
        Imperial: UnitWiseValue
    }
    
    type DewPoint {
        Metric: UnitWiseValue
        Imperial: UnitWiseValue
    }

    type WindSpeed {
        Metric: UnitWiseValue
        Imperial: UnitWiseValue
    }
    
    type Wind {
        Speed: WindSpeed
    }
    
    type WindGust {
        Speed: WindSpeed
    }

    type Visibility {
        Metric: UnitWiseValue
    }
    
    type MinTemperature {
        Metric: UnitWiseValue
    }

    type MaxTemperature {
        Metric: UnitWiseValue
    }
    
    type TemperatureRange {
        Minimum: MinTemperature
        Maximum: MaxTemperature
    }
    
    type TemperatureSummary {
        Past6HourRange: TemperatureRange
        Past12HourRange: TemperatureRange
        Past24HourRange: TemperatureRange
    }
    
    type Pressure {
        Metric: UnitWiseValue
    }
    
    type PressureTendency {
        LocalizedText: String
        Code: String
    }
    
    type Weather {
        LocalObservationDateTime: String
        WeatherText: String
        HasPrecipitation: Boolean
        PrecipitationType: String
        IsDayTime: Boolean
        Temperature:  Temperature
        RealFeelTemperature: RealFeelTemperature
        DewPoint: DewPoint
        Wind: Wind
        WindGust: WindGust
        Visibility: Visibility
        TemperatureSummary: TemperatureSummary
        Pressure: Pressure
        PressureTendency: PressureTendency
    }
`

const resolvers = {
  Query: {
    location: async (_, { city }, { dataSources }) => {
      return dataSources.locationAPI.getLocationData(city)
    },

    weather: async (_, { city }, { dataSources }) => {
      const cityDetails = await dataSources.locationAPI.getLocationData(city)

      if ( cityDetails && cityDetails.length ) {
        return dataSources.weatherAPI.getWhetherForLocation(cityDetails[0].Key);
      }

      throw new UserInputError('Invalid city name');
    }
  }
}

module.exports = {LocationAPI, WeatherAPI, typeDefs, resolvers}