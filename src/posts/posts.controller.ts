import { Controller, Get, Req, Query, Headers, Param, Body, Post } from '@nestjs/common';
import bodyParser = require('body-parser');

@Controller('posts')
export class PostsController {
    @Get()
    index(@Headers('authorization') headers) {
        console.log(headers)
        return [
            {
                title:'hello ~'
            }
        ];
    }
    @Get(':id')
    Show(@Param() params) {
        return{
            title: `Post ${params.id}`
        }
    }

    @Post()
    Store(@Body() body) {
        console.log(body)
    }
}
