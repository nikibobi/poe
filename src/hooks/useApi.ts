import { useState, useEffect } from 'react';

interface ApiState {
    isLoading: boolean
    data: any
}

export const useApi = (url: string) => {
    const [data, setData] = useState<ApiState>({
        isLoading: true,
        data: null,
    });

    useEffect(() => {
        setData({
            isLoading: true,
            data: null
        });
        fetch(url)
            .then((response: Response) => response.json())
            .then((data) => {
                setData({ isLoading: false, data });
            })
            .catch(() => {
                setData({ isLoading: false, data: null });
            });
    }, [url]);

    return data;
};
