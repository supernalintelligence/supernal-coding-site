import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface Post {
  title: string;
  description: string;
  date: string;
  slug: string;
  author?: string;
  content: string;
  image?: string;
}

export async function getAllPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), 'docs');
  const posts: Post[] = [];

  // Recursive function to get all markdown files
  const getMarkdownFiles = (dir: string) => {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        getMarkdownFiles(filePath);
      } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        // Only include files that have the required frontmatter
        if (data.title && data.date) {
          posts.push({
            title: data.title,
            description: data.description || '',
            date: data.date,
            slug: filePath
              .replace(postsDirectory, '')
              .replace(/\.mdx?$/, '')
              .replace(/\\/g, '/'),
            author: data.author,
            content: content,
            image: data.image
          });
        }
      }
    });
  };

  getMarkdownFiles(postsDirectory);

  // Sort posts by date
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
