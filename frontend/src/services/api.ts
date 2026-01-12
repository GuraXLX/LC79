import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const tripApi = {
    start: (data: { vehicle_id: string; user_id: string; start_odometer: number }) =>
        api.post('/trip', data),

    end: (id: string, data: any) =>
        api.patch(`/trip/${id}`, data), // Assuming PATCH/PUT for end
};

export const ocrApi = {
    scan: (formData: FormData) =>
        api.post('/ocr/scan', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
};

export default api;
