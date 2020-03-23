import { Request, Response } from 'firebase-functions';


type AuthorityReadParams = {
  email?: string,
}

async function authorityAPIfunc(req: Request, res: Response) :Promise<void> {
  const params: AuthorityReadParams = req.query;
  console.log(params);
  res.send(`I got ${params.email}`);
}

export default authorityAPIfunc;
