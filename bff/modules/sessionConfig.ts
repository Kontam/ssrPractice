import BFFConst from '../../src/shared/modules/const';
import session from 'express-session';

const sessionConfig :session.SessionOptions = {
  secret: BFFConst.SESSION_SECRET || "",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
  }
};

export default sessionConfig;
