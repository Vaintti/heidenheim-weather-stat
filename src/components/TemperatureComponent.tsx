export default function TemperatureComponent(props: {temperature: number}) {
    return (
        <div>
            {props.temperature} °C
        </div>
    )
}