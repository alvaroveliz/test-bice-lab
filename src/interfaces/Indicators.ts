export interface IndicatorValue {
    key: string;
    name: string;
    unit: string;
    date: number;
    value?: number;
    values?: [];
}

export interface Indicators {
    cobre: IndicatorValue;
    dolar: IndicatorValue;
    euro: IndicatorValue;
    ipc: IndicatorValue;
    ivp: IndicatorValue;
    oro: IndicatorValue;
    plata: IndicatorValue;
    uf: IndicatorValue;
    utm: IndicatorValue;
    yen: IndicatorValue;
}
