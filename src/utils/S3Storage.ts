import aws, { S3 } from 'aws-sdk';
import path from 'path';
import mime from 'mime';
import fs from 'fs';

import multerConfig from '../config/multer';

class S3Storage {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REAGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
  }

  async saveFile(filename: string): Promise<String> {
    const originalPath = path.resolve(multerConfig.directory, filename)

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('Arquivo não encontrado')
    }

    const fileContent = await fs.promises.readFile(originalPath);

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `products/images/${filename}`,
      Body: fileContent,
      ContentType,
    }
    try {
      await this.client.upload(uploadParams).promise()
      const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REAGION}.amazonaws.com/products/images/${filename}`
      return url
    } catch (error) {
      throw new Error("MESSAGE:Erro ao salvar imagem");
    } finally {
      await fs.promises.unlink(originalPath);
    }
  }
}

export default S3Storage;