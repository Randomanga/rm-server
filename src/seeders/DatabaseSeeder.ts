import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Manga } from '~/entities';
import { MangaSeeder } from '~/seeders/MangaSeeder';

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        return this.call(em, [MangaSeeder]);
    }
}
