import { Request, Response } from 'express';
import BaseController from './BaseController.js';
import UserService from '../services/UserService.js';

class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.getAllUsers();
      return this.success(res, result.data, result.statusCode);
    } catch (error) {
      console.error(error);
      return this.error(res, 'Internal server error');
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await this.userService.getUserById(Number(id));
      if (result.error) {
        return this.error(res, result.error, result.statusCode);
      }

      return this.success(res, result.data, result.statusCode);
    } catch (error) {
      console.error(error);
      return this.error(res, 'Internal server error');
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;
      const result = await this.userService.createUser(name, email);
      if (result.error) {
        return this.error(res, result.error, result.statusCode);
      }

      return this.success(res, result.data, result.statusCode);
    } catch (error) {
      console.error(error);
      return this.error(res, 'Internal server error');
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const result = await this.userService.updateUser(Number(id), name, email);
      if (result.error) {
        return this.error(res, result.error, result.statusCode);
      }

      return this.success(res, result.data, result.statusCode);
    } catch (error) {
      console.error(error);
      return this.error(res, 'Internal server error');
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await this.userService.deleteUser(Number(id));
      if (result.error) {
        return this.error(res, result.error, result.statusCode);
      }

      return this.success(res, result.data, result.statusCode);
    } catch (error) {
      console.error(error);
      return this.error(res, 'Internal server error');
    }
  };
}

export default UserController;
