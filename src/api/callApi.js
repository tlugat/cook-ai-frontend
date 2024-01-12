const BASE_URL = import.meta.env.VITE_API_URL;

export const callApi = async (url, options) => {
    let URL = BASE_URL + url;

    if (options?.query) {
        const queryParams = new URLSearchParams();
        Object.entries(options.query).forEach(([key, value]) => {
            if (!value) return;
            queryParams.append(key, value);
        });
        const pageParam = queryParams.get('page');

        queryParams.append('pagination', !!pageParam);

        const queryString = queryParams.toString();
        URL = `${URL}?${queryString}`;
    }

    const fetchOptions = {
        method: options?.method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader(),
            ...options?.headers,
        },
    };

    if (options?.data) {
        fetchOptions.body = JSON.stringify(options.data);
    }

    const response = await fetch(URL, fetchOptions);

    if (!response.ok) {
        throw new Error('Network request failed');
    }

    let responseData;
    try {
        responseData = await response.json();
    } catch (error) {
        responseData = null;
    }

    return responseData;
};

const authHeader = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return {};
    return { Authorization: 'Bearer ' + token };
};


