import axios from 'axios';

export default class Api {
    static apiKey = '3e022e368de4fa619ce42a2136be8fce';
    static baseUrl = 'https://api.openweathermap.org/data/2.5';

    static getWeather = async (): Promise<OneCallWeather> => new Promise(async (resolve, reject) => {
        const url = `${this.baseUrl}/onecall?lat=48.6783393665903&lon=10.151018802639353&appid=${this.apiKey}&units=metric&exclude=minutely,daily,alerts`;
        try {
            const response = await axios.get(url);
            const json = response.data;
            resolve({
                current: {
                    temperature: parseInt(json.current.temp.toFixed(0)),
                    category: json.current.weather[0].main,
                    description: json.current.weather[0].description,
                    dt: json.current.dt,
                },
                hourly: json.hourly
                    .filter((weather: any) => weather.dt * 1000 > Date.now() - (60*1000))
                    .slice(0, 24)
                    .map((weather: any): Weather => ({
                        temperature: parseInt(weather.temp.toFixed(0)),
                        category: weather.weather[0].main,
                        description: weather.weather[0].description,
                        dt: weather.dt,
                    })),
            });
        } catch (error) {
            reject(error);
        };
    });
};