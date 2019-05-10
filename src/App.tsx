import React from 'react';
import styled from '@emotion/styled'
import Header from './components/Header'
import WeatherDashboard from './components/WeatherDashboard';

const Container = styled.div({
	height: '100vh', width: '100vw', display: 'block'
})

class App extends React.PureComponent<any, any>{
	state = {
		title : ''
	}
	handleChildDate = (Title : string) => {
		this.setState({
			title : Title
		})
	}

	render() {
		return (
			<Container>
				<Header title={this.state.title}/>
				<div style={{ paddingTop: '100px' }}>
					<WeatherDashboard callback={this.handleChildDate}/>
				</div>
			</Container>
		);
	}
}

export default App;
