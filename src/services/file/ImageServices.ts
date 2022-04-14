import S3Storage from "../../utils/S3Storage";

export class ImageServices {
  async upload( file: Express.Multer.File, path: string ) {

    const s3Storage = new S3Storage();
    const filePath = `images/${path}`

    try {
     return await s3Storage.saveFile(file.filename, filePath);
    } catch {
      throw new Error("MESSAGE:Erro ao salvar imagem");
    } 
  }

  async getAll() {

    return;
  }

  async getOne(id: string) {



    return
  }


  async delete(filename: string) {


    return;
  }

}