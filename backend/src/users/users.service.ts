import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  private readonly users = [
    { id: 1, name: "Nguyen Van An" },
    { id: 2, name: "Le Ngoc Anh" },
    { id: 3, name: "Vu Ngoc Dang" },
  ];

  findOneById(id: number): any {
    return this.users.find((user) => user.id === id);
  }
}
