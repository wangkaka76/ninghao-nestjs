import { Category } from "./category.entity";

export class CategoryDto {
    readonly name: string;
    readonly alias: string;
    readonly category: Category;
}