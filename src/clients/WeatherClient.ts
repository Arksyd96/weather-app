import axios from 'axios'

const API_URL = 'http://api.openweathermap.org/data/2.5'
const API_KEY_CURRENT = '4f33192f189291b1ae2c499905d9da81'
const IMG_URL = 'http://openweathermap.org/img/w';


export default class WeatherClient{
    getCurrentWeather(latitude : any, longitude : any){
        if (!latitude || !longitude) {
            console.log('lat/lon wrong')
        }
        const url = `${API_URL}/weather?appid=${API_KEY_CURRENT}&lat=${latitude}&lon=${longitude}&units=metric`;
        return new Promise((resolve, reject) => {
            axios.get(url).then( reponse => {
                if ( reponse && reponse.status === 200 ){
                    const { main , icon } = reponse.data.weather[0];
                    const { temp, temp_min, temp_max, humidity } = reponse.data.main;
                    const { lon, lt } = reponse.data.coord;
                    const { dt, name } = reponse.data;
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
                            max : temp_max,
                            humid : humidity
                        }
                    });
                } else {
                    reject('weather data not found');
                }
            }).catch( error => reject( error.message ))
        })
    }
    getDailyWeather(latitude : any , longitude : any) {
        const url = `${API_URL}/forecast?appid=${API_KEY_CURRENT}&lat=${latitude}&lon=${longitude}&units=metric`;
        if (!latitude || !longitude) {
            console.log('lat/lon wrong')
        }
        return new Promise( (resolve, reject) => {
            axios.get(url).then(reponse => {
                if ( reponse && reponse.status === 200 ){                  
                    const hourlyForecasts = reponse.data.list
                    resolve(hourlyForecasts)
                } else {
                    reject('Data not found')
                }
            }).catch( error => reject(error.message))
        }) 
    }
}