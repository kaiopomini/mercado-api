import S3Storage from "../../utils/S3Storage";

export class ProductImageServices {
  async upload( file: Express.Multer.File ) {
    const s3Storage = new S3Storage();
    let res;
    try {
     res = await s3Storage.saveFile(file.filename)
    } catch {
      throw new Error("Erro ao salvar imagem");
    } 
    
    return res;

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