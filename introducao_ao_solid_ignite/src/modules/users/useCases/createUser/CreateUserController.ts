import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, email } = request.body;
    let user;
    try {
      user = this.createUserUseCase.execute({ name, email });
    } catch (error) {
      return response.status(400).json({ error });
    }

    return response
      .status(201)
      .json({ admin: user.admin, email: user.email, name: user.name });
  }
}

export { CreateUserController };
