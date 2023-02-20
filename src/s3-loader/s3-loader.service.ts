import { Injectable } from '@nestjs/common';
import * as process from 'process';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

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
            Body: artFiles[i],
          }),
        ),
      );
    }
    await Promise.all(concurrentRequest);
  }
}
