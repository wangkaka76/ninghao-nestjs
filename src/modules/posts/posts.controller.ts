import { Controller, Get, Req, Query, Headers, Param, Body, Post, HttpException, HttpStatus, ForbiddenException, UseFilters} from '@nestjs/common';
import bodyParser = require('body-parser');
import { CreatePostDto } from './posts.dto';
import {DemoService} from './providers/demo/demo.service';
import { DemoFilter } from '../../core/filters/demo.filter';

@Controller('posts')
// @UseFilters(DemoFilter)
export class PostsController {
    constructor(private readonly demoService: DemoService) {}

    @Get()
    index() {
        return this.demoService.findAll();
    }
    @Get(':id')
    Show(@Param() params) {
        return{
            title: `Post ${params.id}`
        }
    }

    @Post()
    // @UseFilters(DemoFilter)
    Store(@Body() post: CreatePostDto) {
        // throw new HttpException('没有权限！', HttpStatus.FORBIDDEN);
        throw new ForbiddenException('没有权限！');
        // this.demoService.create(post);
    }
}
