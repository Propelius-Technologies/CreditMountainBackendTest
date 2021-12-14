import { validationResult } from 'express-validator';

export default async (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({
    success: false,
    ...errors,
  });
};
