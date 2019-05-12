import React, { useState, useEffect } from 'react'
import LocationClient from '../clients/LocationClient'
import WeatherClient from '../clients/WeatherClient'

import CurrentWeather from './weather/CurrentWeather'
import HourlyWeather from './weather/HourlyWeather';

const weatherClient = new WeatherClient

const weatherDashboard = (props : any) => {
    const [weather, setWeather] = useState({
		location: 'Loading',
		minTemp: '', maxTemp: '',
		currentTemp: '',
		currentWeather: '',
		date: '',
		icon : '',
		humidity : ''
	})

	const [ hours, setHours ] = useState([])
    
    const loadData = (pos: any) => {
		weatherClient.getCurrentWeather(pos.latitude, pos.longitude).then((response: any) => {
            const { location, temperature, condition } = response
			setWeather({
				location: location.origin,
				minTemp: temperature.min,
				maxTemp: temperature.max,
				currentTemp: temperature.current,
				currentWeather: condition,
				date: response.date,
				icon : response.icon,
				humidity : temperature.humid
			})
		});
		weatherClient.getDailyWeather(pos.latitude, pos.longitude).then((response : any) => {
			setHours(response);	
			console.log(hours)
		})
	}

    useEffect(() => {
		LocationClient.getGeolocation(loadData)
	}, [])

	props.callback(weather.location);

    return (
        <div style={{ width: '100%', display : 'block' }}>
            <CurrentWeather weather={weather} />
			<HourlyWeather hours={hours}/>
        </div>
    )
}

export default weatherDashboard;