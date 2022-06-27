import { Request, Response } from "express";
import { AuthenticateServices } from "../../services/auth/AuthenticateServices";

class AuthenticateUserController {
  async store(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateServices();

    const token = await authenticateUserService.authUser({
      email,
      password,
    });

    return response.status(200).json({
      success: true,
      payload: token,
      message: "Login realizado com sucesso.",
    });
  }

  async show(request: Request, response: Response) {
    const { user_id } = request;

    const authenticateUserService = new AuthenticateServices();

    const user = await authenticateUserService.me(user_id);

    return response.status(200).json({
      success: true,
      payload: user,
      message: "Dados resgatados com sucesso.",
    });
  }
}

export { AuthenticateUserController };
