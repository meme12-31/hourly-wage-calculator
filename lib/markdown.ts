import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost, BlogPostMeta } from './types';
import { BLOG_POSTS_META } from '@/data/hourly-wage-columns';

const columnsDirectory = path.join(process.cwd(), 'content', 'hourly-wage-calculator', 'column');

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(columnsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    const meta = BLOG_POSTS_META.find((p) => p.slug === slug) || {
      slug,
      title: data.title || '',
      description: data.description || '',
      publishedAt: data.publishedAt || '',
      updatedAt: data.updatedAt || '',
      category: data.category,
      readTime: data.readTime,
    };

    return {
      ...meta,
      title: data.title || meta.title,
      description: data.description || meta.description,
      publishedAt: data.publishedAt || meta.publishedAt,
      updatedAt: data.updatedAt || meta.updatedAt,
      contentHtml,
    };
  } catch (err) {
    console.error(`Error loading markdown post for slug: ${slug}`, err);
    return null;
  }
}

export function getAllPosts(): BlogPostMeta[] {
  return BLOG_POSTS_META;
}
