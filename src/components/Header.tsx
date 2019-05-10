import React from 'react'
import styled from '@emotion/styled'

const Header = styled.header({
    backgroundColor: 'grey', height: '100px', position: 'fixed', width: '100%', alignItems: 'center'
})
const StyledTitle = styled.span({
    display: 'block', textAlign: 'center', fontSize: '32px', margin: '15px'
})


const header = (props : any) => {
    return (
        <Header>
            <StyledTitle>{props.title}</StyledTitle>
        </Header>
    )
}

export default header;