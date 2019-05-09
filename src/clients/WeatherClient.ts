import axios from 'axios'

const API_URL = 'http://api.openweathermap.org/data/2.5'
const API_KEY = '4f33192f189291b1ae2c499905d9da81'
const IMG_URL = 'http://openweathermap.org/img/w';


export default class WeatherClient{
    getCurrentWeather(latitude : any, longitude : any){
        if (!latitude || !longitude) {
            console.log('lat/lon wrong')
        }
        const url = `${API_URL}/weather?appid=${API_KEY}&lat=${latitude}&lon=${longitude}&units=metric`;
        return new Promise((resolve, reject) => {
            axios.get(url).then( response => {
                if ( response && response.status === 200 ){
                    const { main , icon } = response.data.weather[0];
                    const { temp, temp_min, temp_max } = response.data.main;
                    const { lon, lt } = response.data.coord;
                    const { dt, name } = response.data;
                    resolve({
                        condition : main,
                        date : new Date(dt * 1000),
                        icon : `${IMG_URL}/${icon}.png`,
                        location : {
                            origin : name,
                            longitude : lon,
                            latitude : lt
                        },
                        temperature : {
                            current : temp,
                            min : temp_min,
                            max : temp_max
                        }
                    });
                } else {
                    reject('weather data not found');
                }
            }).catch( error => reject( error.message ))
        })
    }
}