import { Controller, Get, Req, Query, Headers, Param, Body, Post, HttpException, HttpStatus, ForbiddenException, UseFilters, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, SetMetadata, UseInterceptors} from '@nestjs/common';
import bodyParser = require('body-parser');
import { CreatePostDto } from './posts.dto';
import {DemoService} from './providers/demo/demo.service';
import { DemoFilter } from '../../core/filters/demo.filter';
import { DemoAuthGuard } from '../../core/guards/demo-auth.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { LoggingInterceptor } from '../../../dist/core/interceptors/logging.interceptor';
import { TransformInterceptor } from '../../core/interceptors/transform.interceptor';

@Controller('posts')
// @UseFilters(DemoFilter)
// @UseGuards(DemoAuthGuard)
// @UseInterceptors(LoggingInterceptor)
export class PostsController {
    constructor(private readonly demoService: DemoService) {}

    @Get()
    @UseInterceptors(TransformInterceptor)
    index() {
        return this.demoService.findAll();
    }
    @Get(':id')
    Show(@Param('id', ParseIntPipe) id) {
        console.log('id:',typeof id);

        return{
            title: `Post ${id}`
        }
    }

    @Post()
    // @UseFilters(DemoFilter)
    @UsePipes(ValidationPipe)
    // @SetMetadata('roles', ['member'])
    // @UseGuards(DemoAuthGuard)
    @Roles('member')
    Store(@Body() post: CreatePostDto) {
        // throw new HttpException('没有权限！', HttpStatus.FORBIDDEN);
        // throw new ForbiddenException('没有权限！');
        this.demoService.create(post);
    }
}
