const BFFConst = {
    API_ENDPOINT: '/api',
    BACKEND_ENDPOINT: process.env.BACKEND_ENDPOINT,
    SESSION_SECRET: process.env.SESSION_SECRET,
    CSRF_SECRET: process.env.CSRF_SECRET,
    
    LONGOS_SERVICE: 'Longos',
    LOGIN_SERVICE: 'Login',
} as const;
export default BFFConst;
