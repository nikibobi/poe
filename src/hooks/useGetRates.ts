import { useApi } from './useApi';

export interface IGetRatesParams {
    user: string;
    rates?: number[];
    league?: string;
    item?: string;
    lr?: number;
}

const defaultParams = {
    league: 'Standard',
    item: 'Perandus Coin',
};

export const useGetRates = (params: IGetRatesParams) => {
    const data = Object.assign(defaultParams, params);
    const query = new URLSearchParams(data as any).toString();
    const { isLoading, data: rates } = useApi(`https://func-poe.azurewebsites.net/api/GetRates?${query}`);
    return { isLoading, rates };
};
