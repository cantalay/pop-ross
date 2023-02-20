import { Injectable, PipeTransform } from '@nestjs/common';
import { Express } from 'express';
import * as sharp from 'sharp';

@Injectable()
export class SharpPipe implements PipeTransform<Express.Multer.File> {
  async transform(images): Promise<Array<Uint8Array>> {
    const sharpedImages: Uint8Array[] = [];
    for (const image of images) {
      const buffer = await sharp(image.buffer)
        .resize(800)
        .webp({ effort: 3 })
        .toBuffer();
      sharpedImages.push(buffer);
    }
    return sharpedImages;
  }
}
