import { Controller, Get, Req, Query, Headers, Param, Body, Post} from '@nestjs/common';
import bodyParser = require('body-parser');
import { CreatePostDto } from './posts.dto';
import {DemoService} from './providers/demo/demo.service';

@Controller('posts')
export class PostsController {
    private readonly demoService;

    constructor(demoService: DemoService) {
        this.demoService = demoService;
    }

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
    Store(@Body() post: CreatePostDto) {
        this.demoService.create(post);
    }
}
