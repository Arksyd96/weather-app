import React from 'react'
import { Carousel } from 'antd'
import styled from '@emotion/styled'

const Image = styled.img({
    height: '4rem',
    verticalAlign: 'middle'
})


const hourlyWeather = (props: any) => {
    return (
        <div style={{ backgroundColor: '#CFD8DC', height: '170px', textAlign: 'center' }}>
            <Carousel>
                {props.hours.map((fc: any, key: any) => {
                    const link = `http://openweathermap.org/img/w/${fc.weather[0].icon}.png`
                    return (
                        <div key={key.toString()}>
                            {new Date(fc.dt * 1000).toString()} <br />
                            <Image src={link} />
                            {fc.weather[0].main}
                        </div>
                    )
                })}
            </Carousel>
        </div>
    )
}

export default hourlyWeather;