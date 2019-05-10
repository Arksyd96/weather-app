import React from 'react'

const currentWeather = (props : any) => {
    const { weather } = props
    return (
        <div style={{ backgroundColor: '#ECEFF1', textAlign: 'center' }}>
            <div>{weather.location}</div>
            <div>{weather.minTemp}° | {weather.maxTemp}°</div>
            <div>{weather.currentTemp}° C</div>
            <div>{weather.currentWeather}</div>
            <div>{weather.date}</div>
        </div>
    )
}

export default currentWeather;