export default function TemperatureComponent(props: { weather: Weather }) {
    return (
        <div className="temperature-main">
            {props.weather.temperature} °C
        </div>
    )
};