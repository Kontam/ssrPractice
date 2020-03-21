const BFFConst = {
    API_ENDPOINT: '/api',
    BACKEND_ENDPOINT: process.env.BACKEND_ENDPOINT,
    SESSION_SECRET: process.env.SESSION_SECRET,
} as const;
export default BFFConst;
