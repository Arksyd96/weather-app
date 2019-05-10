import React from 'react'
import styled from '@emotion/styled'

const Image = styled.img({
    height: '4rem',
    verticalAlign: 'middle'
})

const currentWeather = (props: any) => {
    const { weather } = props
    return (
        <div style={{ backgroundColor: '#ECEFF1', textAlign: 'center' }}>
            <div>Temperature : {weather.minTemp}° | {weather.maxTemp}° - Humidity : {weather.humidity}%</div>
            <div>
                <div style={{fontSize : '30px', fontStyle : 'bold'}}>{weather.currentTemp}° C</div>
                <Image src={weather.icon} />
            </div>
            <div>{weather.currentWeather}</div>
            <div>{weather.date}</div>
        </div>
    )
}

export default currentWeather;