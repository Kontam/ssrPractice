const BFFConst = {
    API_ENDPOINT: '/api',
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL || "",
    SESSION_SECRET: process.env.SESSION_SECRET,
    CSRF_SECRET: process.env.CSRF_SECRET,

    API_LONGOS: process.env.API_LONGOS || "",
    API_AUTHORITY: process.env.API_AUTHORITY || "",
    
    LONGOS_SERVICE: 'Longos',
    LOGIN_SERVICE: 'Login',

    FIREBASE_ACCOUNT_PATH: '../../serviceAccount.json',
} as const;
export default BFFConst;
