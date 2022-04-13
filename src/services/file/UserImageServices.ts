import S3Storage from "../../utils/S3Storage";

export class UserImageServices {
  async upload( file: Express.Multer.File ) {

    const s3Storage = new S3Storage();

    try {
     return await s3Storage.saveFile(file.filename, 'users/images');
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