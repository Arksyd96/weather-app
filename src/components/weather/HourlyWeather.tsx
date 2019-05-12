import React from 'react'
import styled from '@emotion/styled'

const Image = styled.img({
    height: '4rem',
    verticalAlign: 'middle',
    width : '4rem',
    margin : '0 auto'
})

const Container  = styled.div({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#CFD8DC', 
    height: '150px',
    width : '98vw',
    margin : '0 auto',
    textAlign: 'center',
})

const Card = styled.div({
    display : 'flex',
    flexDirection : 'column',
    width : '14vw',
    border : '1px solid gray'
})


const hourlyWeather = (props: any) => {

    return (
        <Container>
            {props.hours.map((fc: any, key: number) => {
                return (
                    <Card key={key.toString()}>
                        <span>{fc.temperature.current.toFixed(0)} °C</span>
                        <Image src={fc.icon} />
                        <span>{fc.condition}</span>
                        <span>{fc.date}</span>
                    </Card>
                )
            })}
        </Container>
    )
}

export default hourlyWeather;