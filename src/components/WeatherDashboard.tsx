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
	
	const timeFormat = (date : Date) => {
		const hour = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padEnd(2, '0');
		return `${hour}:${minutes}`;
	}
    
    const loadData = (pos: any) => {
		weatherClient.getCurrentWeather(pos.latitude, pos.longitude).then((response: any) => {
            const { location, temperature, condition } = response
			setWeather({
				location: location.origin,
				minTemp: temperature.min,
				maxTemp: temperature.max,
				currentTemp: temperature.current,
				currentWeather: condition,
				date: timeFormat(new Date(response.date)),
				icon : response.icon,
				humidity : temperature.humid
			})
		});
		weatherClient.getDailyWeather(pos.latitude, pos.longitude).then((response : any) => {
			setHours(response);	
		})
	}

    useEffect(() => {
		LocationClient.getGeolocation(loadData)
	}, [])

	props.callback(weather.location);

    return (
        <div style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
            <CurrentWeather weather={weather} />
			<HourlyWeather hours={hours}/>
            <div style={{ backgroundColor: 'lightSteelBlue', height: '170px', textAlign: 'center' }}>
                météo par heures
			</div>
        </div>
    )
}

export default weatherDashboard;