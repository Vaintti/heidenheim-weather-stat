export default function TemperatureComponent(props: {temperature: number}) {
    return (
        <div className="temperature-main">
            {props.temperature} °C
        </div>
    )
}