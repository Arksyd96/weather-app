import axios from 'axios'

const API_URL = 'http://api.openweathermap.org/data/2.5'
const API_KEY = '4f33192f189291b1ae2c499905d9da81'
const IMG_URL = 'http://openweathermap.org/img/w';


export default class WeatherClient {

    timeFormat = (date : Date) => {
		const hour = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padEnd(2, '0');
		return `${hour}:${minutes}`;
	}

    getCurrentWeather(latitude: any, longitude: any) {
        if (!latitude || !longitude) {
            console.log('lat/lon wrong')
        }
        const url = `${API_URL}/weather?appid=${API_KEY}&lat=${latitude}&lon=${longitude}&units=metric`;
        return new Promise((resolve, reject) => {
            axios.get(url).then(reponse => {
                if (reponse && reponse.status === 200) {
                    const { main, icon } = reponse.data.weather[0];
                    const { temp, temp_min, temp_max, humidity } = reponse.data.main;
                    const { lon, lt } = reponse.data.coord;
                    const { dt, name } = reponse.data;
                    resolve({
                        condition: main,
                        date: this.timeFormat(new Date(dt * 1000)),
                        icon: `${IMG_URL}/${icon}.png`,
                        location: {
                            origin: name,
                            longitude: lon,
                            latitude: lt
                        },
                        temperature: {
                            current: temp,
                            min: temp_min,
                            max: temp_max,
                            humid: humidity
                        }
                    });
                } else {
                    reject('weather data not found');
                }
            }).catch(error => reject(error.message))
        })
    }
    getDailyWeather(latitude: any, longitude: any) {
        const url = `${API_URL}/forecast?appid=${API_KEY}&lat=${latitude}&lon=${longitude}&units=metric&cnt=7`;
        if (!latitude || !longitude) {
            console.log('lat/lon wrong')
        }
        return new Promise((resolve, reject) => {
            axios.get(url).then(reponse => {
                if (reponse && reponse.status === 200) {
                    const hourlyForecasts : any[] = []
                    reponse.data.list.map((fc: any, key: number) => {
                        hourlyForecasts.push({
                            condition : fc.weather[0].description,
                            date : this.timeFormat(new Date(fc.dt * 1000)),
                            icon: `${IMG_URL}/${fc.weather[0].icon}.png`,
                            temperature: {
                                current: fc.main.temp
                            }
                        })
                    })
                    console.log(hourlyForecasts)
                    resolve(hourlyForecasts)
                } else {
                    reject('Data not found')
                }
            }).catch(error => reject(error.message))
        })
    }
}