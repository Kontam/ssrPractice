import { Request, Response } from 'firebase-functions';


async function authorityAPIfunc(request: Request, response: Response) :Promise<void> {
  response.send("authorityAPI");
}

export default authorityAPIfunc;
