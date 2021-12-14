declare interface Weather {
    temperature: number;
    category: string;
    description: string;
    dt: number;
};

declare interface OneCallWeather {
    current: Weather,
    hourly: Weather[],
};