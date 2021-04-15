import { Request } from 'express';

class SessionController {
  signIn(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
  }
}

export { SessionController };
