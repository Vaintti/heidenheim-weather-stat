export default function WeatherDescriptionComponent (props: { weather: Weather }) {
    return (
        <i className="weather-description">
            {props.weather.description}
        </i>
    )
};