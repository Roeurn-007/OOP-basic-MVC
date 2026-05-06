import User from '../models/User.js';

type ServiceResult<T> = {
  statusCode: number;
  data?: T;
  error?: string;
};

class UserService {
  private isValidId(id: number) {
    return Number.isInteger(id) && id > 0;
  }

  private validateUserInput(name: unknown, email: unknown): string | null {
    if (typeof name !== 'string' || name.trim() === '') {
      return 'Name is required';
    }

    if (typeof email !== 'string' || email.trim() === '') {
      return 'Email is required';
    }

    if (!email.includes('@')) {
      return 'Email is invalid';
    }

    return null;
  }

  async getAllUsers(): Promise<ServiceResult<User[]>> {
    const users = await User.findAll();
    return { statusCode: 200, data: users };
  }

  async getUserById(id: number): Promise<ServiceResult<User>> {
    if (!this.isValidId(id)) {
      return { statusCode: 400, error: 'Invalid user id' };
    }

    const user = await User.findById(id);
    if (!user) {
      return { statusCode: 404, error: 'User not found' };
    }

    return { statusCode: 200, data: user };
  }

  async createUser(name: unknown, email: unknown): Promise<ServiceResult<User>> {
    const validationError = this.validateUserInput(name, email);
    if (validationError) {
      return { statusCode: 400, error: validationError };
    }

    const user = await User.create((name as string).trim(), (email as string).trim());
    return { statusCode: 201, data: user };
  }

  async updateUser(id: number, name: unknown, email: unknown): Promise<ServiceResult<{ message: string }>> {
    if (!this.isValidId(id)) {
      return { statusCode: 400, error: 'Invalid user id' };
    }

    const validationError = this.validateUserInput(name, email);
    if (validationError) {
      return { statusCode: 400, error: validationError };
    }

    const success = await User.update(id, (name as string).trim(), (email as string).trim());
    if (!success) {
      return { statusCode: 404, error: 'User not found' };
    }

    return { statusCode: 200, data: { message: 'User updated successfully' } };
  }

  async deleteUser(id: number): Promise<ServiceResult<{ message: string }>> {
    if (!this.isValidId(id)) {
      return { statusCode: 400, error: 'Invalid user id' };
    }

    const success = await User.delete(id);
    if (!success) {
      return { statusCode: 404, error: 'User not found' };
    }

    return { statusCode: 200, data: { message: 'User deleted successfully' } };
  }
}

export default UserService;
