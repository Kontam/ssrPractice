const BFFConst = {
    SESSION_SECRET: process.env.SESSION_SECRET,
    CSRF_SECRET: process.env.CSRF_SECRET,

    // パス関連
    API_ENDPOINT: '/api',
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL || "",
    API_LONGOS: process.env.API_LONGOS || "",
    API_AUTHORITY: process.env.API_AUTHORITY || "",
    
    // データサービス名
    LONGOS_SERVICE: 'Longos',
    LOGIN_SERVICE: 'Login',

    // Firebase認証情報
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_PROJECT_EMAIL: process.env.FIREBASE_PROJECT_EMAIL,
    FIREBASE_PROJECT_KEY: process.env.FIREBASE_PROJECT_KEY,
} as const;
export default BFFConst;
