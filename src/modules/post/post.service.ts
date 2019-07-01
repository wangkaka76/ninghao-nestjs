import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>
    ) { }

    async store(data) {
        const entity = await this.postRepository.create(data);
        await this.postRepository.save(entity);
        return entity;
    }

    async index() {
        const entities = await this.postRepository.find();
        return entities;
    }

    async update(id: string, data) {
        const result = await this.postRepository.update(id, data);
        return result;
    }

    async destroy(id: string) {
        const result = await this.postRepository.delete(id);
        return result;
    }
}
