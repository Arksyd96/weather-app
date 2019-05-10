import React from 'react';
import styled from '@emotion/styled'
import Header from './components/Header'
import WeatherDashboard from './components/WeatherDashboard';

const Container = styled.div({
	height: '100vh', width: '100vw', display: 'block'
})

class App extends React.Component<any, any>{
	render() {
		return (
			<Container>
				<Header />
				<div style={{ paddingTop: '100px' }}>
					<WeatherDashboard />
				</div>
			</Container>
		);
	}
}

export default App;
