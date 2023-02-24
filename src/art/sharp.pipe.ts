import { Injectable, PipeTransform } from '@nestjs/common';
import { Express } from 'express';
import * as sharp from 'sharp';

@Injectable()
export class SharpPipe implements PipeTransform<Express.Multer.File> {
  async transform(images) {
    const sharpedImages = [];
    for (const image of images) {
      const buffer = await sharp(image.buffer)
        .resize(800)
        .webp({ effort: 3 })
        .toBuffer();
      const thumbBuffer = await sharp(image.buffer)
        .resize(200)
        .webp({ effort: 3 })
        .toBuffer();
      sharpedImages.push([buffer, thumbBuffer]);
    }
    return sharpedImages;
  }
}
