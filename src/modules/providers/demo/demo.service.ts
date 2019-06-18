import { Injectable } from '@nestjs/common';
import { Post } from './node_modules/src/modules/interfaces/post.interface';

@Injectable()
export class DemoService {
    private readonly posts: Post[] = [];

    findAll(): Post[] {
        return this.posts;
    }

    create(post: Post) {
        this.posts.push(post);
    }
}
