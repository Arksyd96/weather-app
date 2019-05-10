import React, { useState, useEffect } from 'react'
import LocationClient from '../clients/LocationClient'
import WeatherClient from '../clients/WeatherClient'

import CurrentWeather from './weather/CurrentWeather'

const weatherClient = new WeatherClient

const weatherDashboard = () => {
    const [weather, setWeather] = useState({
		location: 'Loading',
		minTemp: '', maxTemp: '',
		currentTemp: '',
		currentWeather: '',
		date: ''
	})
	
	const timeFormat = (date : Date) => {
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padEnd(2, '0');
		return `${hours}:${minutes}`;
	}
    
    const loadData = (pos: any) => {
		weatherClient.getDailyWeather(pos.latitude, pos.longitude).then(() => console.log('fait'))
		weatherClient.getCurrentWeather(pos.latitude, pos.longitude).then((response: any) => {
            const { location, temperature, condition } = response
			setWeather({
				location: location.origin,
				minTemp: temperature.min,
				maxTemp: temperature.max,
				currentTemp: temperature.current,
				currentWeather: condition,
				date: timeFormat(new Date(response.date))
			})
		})
	}

    useEffect(() => {
		LocationClient.getGeolocation(loadData)
	}, [])

    return (
        <div style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
            <CurrentWeather weather={weather} />
            <div style={{ backgroundColor: '#CFD8DC', height: '170px', textAlign: 'center' }}>
                météo par jours
			</div>
            <div style={{ backgroundColor: 'lightSteelBlue', height: '170px', textAlign: 'center' }}>
                météo par heures
			</div>
        </div>
    )
}

export default weatherDashboard;