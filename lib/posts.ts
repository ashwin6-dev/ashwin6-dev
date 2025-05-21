import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const postsDir = path.join(process.cwd(), 'posts');

export interface PostData {
    id: string
    title: string
    description: string
    date: string
    series: string
    part: number
}

export interface Post extends PostData {
    content: string
}

export interface SeriesData {
    name: string
    description: string
    posts: PostData[]
}

export function getSeries(id: string): SeriesData {
    const seriesPath = path.join(postsDir, id);
    const description = fs.readFileSync(path.join(seriesPath, 'description.txt')).toString();
    const posts = getPostsDataFromDir(seriesPath);

    return {
        name: id,
        description,
        posts
    }
}

export function getAllSeriesIds(): { params: { id: string } }[] {
    const fileNames = fs.readdirSync(postsDir);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName
            },
        };
    });
}

export function getSeriesData() {
    const seriesDirs = fs.readdirSync(postsDir);
    let seriesData: SeriesData[] = [];

    for (let series of seriesDirs) {
        seriesData.push(getSeries(series));
    }

    return seriesData;
}

export function getPostsDataFromDir(dir: string): PostData[] {
    const filenames = fs.readdirSync(dir);

    const allPostsData: PostData[] = filenames
        .filter(filename => filename != 'description.txt' && filename != "assets")
        .map((fileName) => {
        const id = fileName.replace(/\.md$/, '');

        const fullPath = path.join(dir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);
        return {
            id,
            ...matterResult.data
        } as PostData
    });

    return allPostsData.sort((a, b) => {
        if (a.part > b.part) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostIds(): { params: { id: string } }[] {
    const fileNames = fs.readdirSync(postsDir)
        .map(dir => fs.readdirSync(path.join(postsDir, dir)))
        .flat()
        .filter(filename => filename != "description.txt");

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export function getPost(id: string): Post {
    const seriesDirs = fs.readdirSync(postsDir);

    for (let series of seriesDirs) {
        const dirpath = path.join(postsDir, series);
        const filenames = fs.readdirSync(dirpath);
        const filename = `${id}.md`;
        if (!filenames.includes(filename)) continue;

        const filepath = path.join(dirpath, filename);
        const fileContents = fs.readFileSync(filepath, 'utf8');

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
            content: matterResult.content,
        } as Post;
    }

    return { id: '', content: '', date: '', description: '', title: '', series: '', part: 0 }
}