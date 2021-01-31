const BFFConst = {
    SESSION_SECRET: process.env.SESSION_SECRET,
    CSRF_SECRET: process.env.CSRF_SECRET,
    // パス関連
    API_ENDPOINT: '/api',
    BACKEND_BASE_URL: process.env.FIREBASE_ENV === "development"
      ? process.env.BACKEND_BASE_URL_DEV || ""
      : process.env.BACKEND_BASE_URL || "",
    API_LONGOS: "/longoAPI",
    API_AUTHORITY: "/authorityAPI",
    API_CHOICEGROUPS: "/choiceGroupsAPI",

    // 権限レベル(制限が強い順番に並べる)
    AUTHORITY_ADMIN: "administrator",
    AUTHORITY_MEMBER: "member",
    AUTHORITY_FREE: "free",
    AUTHORITY_NONE: "none",

    // 認証ステータス
    AUTHSTATUS_UNAUTHRIZED: "unauthrized",
    AUTHSTATUS_ENOUGH: "enough",
    AUTHSTATUS_NOT_ENOUGH: "not_enough",


    // Cookies
    COOKIE_EXPIREIN: 60 * 60 * 24 * 5 * 1000,
    TOKEN_COOKIE: 'token',

    // 通信関連
    API_SECRET: process.env.API_SECRET,
    API_KEY: process.env.API_KEY,
    
    // データサービス名
    LONGOS_SERVICE: 'Longos',
    LOGIN_SERVICE: 'Login',
    CHOICEGROUPS_SERVICE: 'ChoiceGroups',

    // Firebase認証情報
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_PROJECT_EMAIL: process.env.FIREBASE_PROJECT_EMAIL,
    // .envであれば問題ないが、環境変数に改行コードが入っているとパースに失敗するので文字列に置換する
    FIREBASE_PROJECT_KEY: process.env.FIREBASE_PROJECT_KEY && process.env.FIREBASE_PROJECT_KEY.replace(/\\n/g, '\n'),
} as const;
export default BFFConst;
