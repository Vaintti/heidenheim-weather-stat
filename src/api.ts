import axios from 'axios';

export default class Api {
    static apiKey = '3e022e368de4fa619ce42a2136be8fce';
    static baseUrl = 'https://api.openweathermap.org/data/2.5/';

    static getWeather = async (city: string): Promise<Weather> => new Promise(async (resolve, reject) => {
        const url = `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`;
        try {
            const response = await axios.get(url);
            const json = response.data;
            resolve({
                temperature: json.main.temp,
                category: json.weather[0].main,
                description: json.weather[0].description,
            });
        } catch (error) {
            reject(error);
        };
    });
};