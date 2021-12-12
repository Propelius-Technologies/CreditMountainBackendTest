import { validationResult } from 'express-validator';

export default async (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  res.status(422).json({
    success: false,
    ...errors,
  });
};
