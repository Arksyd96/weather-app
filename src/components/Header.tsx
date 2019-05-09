import React from 'react'
import styled from '@emotion/styled'

const Header = styled.header({
    backgroundColor: 'grey', height: '100px', position: 'fixed', width: '100%', alignItems: 'center'
})
const StyledTitle = styled.span({
    display: 'block', textAlign: 'center', fontSize: '32px', margin: '15px'
})


const header = () => {
    return (
        <Header>
            <StyledTitle>Weather</StyledTitle>
        </Header>
    )
}

export default header;