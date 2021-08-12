import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url, UrlDocument } from './schemas/url.schema';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>){};

  async createTiny(createUrlDto: CreateUrlDto) {

    var base62 = require("base62/lib/ascii");

    var counter = await this.urlModel.estimatedDocumentCount();

    const longUrl = createUrlDto['longUrl'];
    
    const tinyUrl = base62.encode(counter)

    const createdUrl = new this.urlModel({ tinyUrl: tinyUrl, longUrl: longUrl});

    return createdUrl.save();
  }

  getLong(tinyUrl: string) {
    return this.urlModel.where('tinyUrl').equals(tinyUrl).select('longUrl');
  }
}
