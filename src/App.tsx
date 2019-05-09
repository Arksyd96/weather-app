import React from 'react';
import styled from '@emotion/styled'
import Header from './components/Header'
import CurrentWeather from './components/weather/CurrentWeather'

const Container = styled.div({
	height : '100vh', width : '100vw', display : 'block'
})



class App extends React.Component<any, any>{
	public render() {
		return (
			<Container>
				<Header />
				<div style={{paddingTop : '100px'}}>
					<div style={{width : '50%',marginLeft : 'auto', marginRight : 'auto'}}>
						<CurrentWeather />
						<div style={{backgroundColor : '#CFD8DC', height : '170px', textAlign : 'center'}}>
							météo par jours
						</div>
						<div style={{backgroundColor : 'lightSteelBlue', height : '170px', textAlign : 'center'}}>
							météo par heures
						</div>
					</div>
				</div>
			</Container>
		);
	}
}

export default App;
