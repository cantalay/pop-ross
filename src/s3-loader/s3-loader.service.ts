import { Injectable, StreamableFile } from '@nestjs/common';
import * as process from 'process';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';

@Injectable()
export class S3LoaderService {
  private s3Client: S3Client = new S3Client({
    region: process.env.AWS_REGION,
  });

  async upload(artFiles, artistID, artID) {
    const concurrentRequest: Array<Promise<any>> = [];
    for (let i = 0; i < artFiles.length; i++) {
      concurrentRequest.push(
        this.s3Client.send(
          new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${artistID}/${artID}/art-${i}.${process.env.ART_FILE_TYPE}`,
            Body: artFiles[i][0],
          }),
        ),
      );
      concurrentRequest.push(
        this.s3Client.send(
          new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${artistID}/${artID}/thumb/art-${i}.${process.env.ART_FILE_TYPE}`,
            Body: artFiles[i][1],
          }),
        ),
      );
    }
    await Promise.all(concurrentRequest);
  }

  async getFile(artistID, artID, artKey) {
    const objects = await this.s3Client.send(
      new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${artistID}/${artID}/${artKey}`,
      }),
    );
    const file = await this.streamToBuffer(objects.Body as Readable);
    return new StreamableFile(file);
  }

  private async streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }
}
