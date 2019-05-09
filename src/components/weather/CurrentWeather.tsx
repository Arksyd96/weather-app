import React, { useState, useEffect } from 'react'
import WeatherClient from '../../clients/WeatherClient'
import LocationClient from '../../clients/LocationClient'

const weatherClient = new WeatherClient

const currentWeather = () => {
    const [ data, setData ] = useState({
        location : 'Loading',
        minTemp : '', maxTemp : '',
        currentTemp : '',
        currentWeather : '',
        date : ''
    })

    const loadData = (pos : any) => {
        weatherClient.getCurrentWeather(pos.latitude, pos.longitude).then((response : any) => {
            const { location, temperature, condition } = response
            setData({
                location : location.origin,
                minTemp : temperature.min,
                maxTemp : temperature.max,
                currentTemp : temperature.current,
                currentWeather : condition,
                date : 'date aleatoir'
            })
        })
    }

    useEffect(() => {
        LocationClient.getGeolocation(loadData)
    });

    return (
        <div style={{ backgroundColor: '#ECEFF1', textAlign: 'center' }}>
            <div>{data.location}</div>
            <div>{data.minTemp}° | {data.maxTemp}°</div>
            <div>{data.currentTemp}° C</div>
            <div>{data.currentWeather}</div>
            <div>{data.date}</div>
        </div>
    )
}

export default currentWeather;