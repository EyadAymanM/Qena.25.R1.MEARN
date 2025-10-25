import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUser, User } from 'src/types/user.type';

@Injectable()
export class UserService {
  users: User[] = [];
  create(body: User) {
    this.users.push(body);
    return { message: 'User created successfully', user: body };
  }

  createMany(users: User[]) {
    this.users.push(...users);
    return { message: 'Many users added', users };
  }

  getAllUser(): User[] {
    return this.users;
  }

  getUser(id: number) {
    const user = this.users.find((u) => u.id == id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  update(id: number, updateUser: UpdateUser) {
    const index = this.users.findIndex((u) => u.id == id);
    this.users[index] = { ...this.users[index], ...updateUser };
    return {
      message: 'User Updated Succeessfully',
      updatedUser: this.users[index],
    };
  }

  deleteUser(id: number) {
    this.users = this.users.filter((u) => u.id != id);
    return { message: 'User Deleted' };
  }
}
