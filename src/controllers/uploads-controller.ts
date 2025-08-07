import { Request, Response } from "express";
import uploadConfig from "@/configs/upload"
import z from "zod";

class UploadsController {
  async create(request: Request, response: Response) {
    try {
      const fileSchema = z.object({
        filename: z.string().min(1, 'Arquivo é obrigatório'),
        mimetype: z.string().refine((type) => {
          uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type),
          `Formato de arquivo inválido. Formatos permitidos: ${uploadConfig.ACCEPTED_IMAGE_TYPES}`
        }),
        size: z.number().positive().refine((size) => {
          size <= uploadConfig.MAX_FILE_SIZE,
          `O arquivo excede ao tamanho máximo de ${uploadConfig.MAX_FILE_SIZE}`
        })
      }).passthrough()

      const { file } = fileSchema.parse(request.file)

      response.json({message: 'Validação da imagem ok'})

    } catch (error) {
      throw error
    }
  }
}

export { UploadsController }