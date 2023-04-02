export const config = {
    apiUrl: `${import.meta.env.VITE_API_URL || process.env.VITE_API_URL}/api`,
    baseUrl: import.meta.env.VITE_API_URL || process.env.VITE_API_URL
}