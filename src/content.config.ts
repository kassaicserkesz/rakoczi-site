import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const beszamolok = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/beszamolok' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),                          // ÉÉÉÉ-HH-NN
    endDate: z.string().optional(),            // ÉÉÉÉ-HH-NN
    place: z.string().optional(),
    cover: z.string().optional(),// borítókép útvonala
    photos: z.array(z.string()).default([]),
    photoCount: z.number().optional(), // ha több fotó van, mint amennyi feltöltve
  }),
});

const esemenyek = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/esemenyek' }),
  schema: z.object({
    title: z.string(),
    start: z.string(),           // ÉÉÉÉ-HH-NN
    end: z.string().optional(),
    time: z.string().optional(),
    place: z.string().optional(),
    ics: z.string().optional(),
    meghivo: z.string().optional(),
    urlap: z.string().optional(),
  }),
});

export const collections = { beszamolok, esemenyek };
