import * as allCurves from '@visx/curve';
import { ScaleSVG } from '@visx/responsive';
import { LinePath } from '@visx/shape';

export default function TemperatureGraphComponent(props: { hourlyWeather: Weather[] }) {
    const height = 100;
    const width = 500;
    const dtFloor = props.hourlyWeather[0].dt;
    const dtCeil = props.hourlyWeather[props.hourlyWeather.length - 1].dt;
    const multiplier = width / (dtCeil - dtFloor);
    const minTemp = Math.min(...props.hourlyWeather.map(w => w.temperature));
    const maxTemp = Math.max(...props.hourlyWeather.map(w => w.temperature));
    const tempMultiplier = height / (maxTemp - minTemp) * 0.8;

    const data = props.hourlyWeather.map((weather): [number, number] => ([
        (weather.dt - dtFloor) * multiplier,
        height - ((weather.temperature - minTemp) * tempMultiplier + 0.1 * height),
    ]));

    return (
        <div id='temperature-graph'>
            <h3>Temperature for the next 24 hours</h3>
            <div>{maxTemp} °C</div>
            <ScaleSVG width={width} height={height}>
                <LinePath
                    curve={allCurves.curveBasis}
                    data={data}
                    x={(d) => d[0]}
                    y={(d) => d[1]}
                    stroke='white'
                    strokeWidth={2}
                    shapeRendering='geometricPrecision'
                    width={width}
                    height={height}
                />
            </ScaleSVG>
            <div>{minTemp} °C</div>
        </div>
    );
};