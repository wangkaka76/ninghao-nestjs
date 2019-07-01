import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { puts } from 'util';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('posts')
export class PostController {
    constructor(
        private readonly postService: PostService
    ) { }

    @Post()
    async store(@Body() data) {
        return await this.postService.store(data);
    }

    @Get()
    async index() {
        return await this.postService.index();
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data) {
        return await this.postService.update(id, data);
    }

    @Delete(':id')
    async destroy(@Param('id') id: string) {
        return await this.postService.destroy(id);
    }
}
