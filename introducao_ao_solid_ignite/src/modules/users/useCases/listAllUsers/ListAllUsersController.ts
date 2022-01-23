import { Request, response, Response } from "express";
import { User } from "modules/users/model/User";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = <{ user_id: string }>request.headers;
    let users: User[];

    try {
      users = this.listAllUsersUseCase.execute({ user_id });
    } catch (error) {
      return response.status(400).json({ error });
    }

    return response.json(users);
  }
}

export { ListAllUsersController };
