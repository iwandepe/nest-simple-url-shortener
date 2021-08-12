import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

@Controller()
export class UrlController {

  constructor(private readonly urlService: UrlService) { }

  @Post('/createTiny')
  createTiny(@Body() createUrlDto: CreateUrlDto) {
    try {
      return this.urlService.createTiny(createUrlDto);
    } catch(e) {
      console.log(e.message);
      return e.message;
    }
  }

  @Get('/getLong/:tinyUrl')
  getLong(@Param('tinyUrl') tinyUrl: string) {
    return this.urlService.getLong(tinyUrl);
  }
}
