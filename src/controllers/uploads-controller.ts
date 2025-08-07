import { Request, Response } from "express";

class UploadsController {
  async create(request: Request, response: Response) {
    response.json({message:'Uploads controller ok'})
  }
}

export { UploadsController }