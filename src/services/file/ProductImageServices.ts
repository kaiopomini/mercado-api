import S3Storage from "../../utils/S3Storage";

export class ProductImageServices {
  async upload( file: Express.Multer.File ) {

    const s3Storage = new S3Storage();

    try {
     return await s3Storage.saveFile(file.filename, 'products/images');
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