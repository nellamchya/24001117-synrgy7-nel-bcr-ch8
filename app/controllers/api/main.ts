import { Request, Response } from 'express';

const onLost = (req: Request, res: Response) => {
  res.status(404).json({
    status: "FAIL",
    message: "Route not found!"
  })
}

const onError = (err: Error, req: Request, res: Response) => {
  res.status(500).json({
    status: "ERROR",
    error: {
      name: err.name,
      message: err.message,
    },
  });
}

export default {
  onLost,
  onError
}