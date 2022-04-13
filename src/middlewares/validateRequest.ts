import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export function validateRequest(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    const errorsArr = errors.array();
    errorsArr.forEach((error) => {
      delete error.value;
    });
    
    return response.status(400).json({
      success: false,
      message: "informações inválidas",
      errors: errorsArr,
    });
  }

  return next();
}
