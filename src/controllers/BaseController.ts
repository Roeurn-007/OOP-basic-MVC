import { Response } from 'express';

class BaseController {
  protected success(res: Response, data: unknown, statusCode = 200) {
    return res.status(statusCode).json(data);
  }

  protected error(res: Response, message: string, statusCode = 500) {
    return res.status(statusCode).json({ error: message });
  }
}

export default BaseController;
