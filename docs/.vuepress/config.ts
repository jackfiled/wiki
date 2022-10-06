import { defineConfig } from 'vuepress/config'

export default defineConfig({
    base: "/wiki/",
    dest: "./wiki",
    locales: {
        '/': {
            lang: 'zh-CN',
            title: "Ricardo Ren的知识图书馆",
            description: "大概所有的都是知识",
        }
    },
    themeConfig: {
        sidebar: {
            '/missing-semester/': [
                '',
                'missing-the-shell',
                'missing-shell-scripts',
                'missing-vim',
                'missing-data-wrangling',
                'missing-command-line',
                'missing-version-control',
                'missing-debugging',
                'missing-metaprogramming',
                'missing-security',
                'missing-potpourri'
            ],
            '/data-structure/': [
                '',
                'foundation',
                'list',
                'stack-and-dequeue',
                'lab'
            ],
            '/csapp/': [
                '',
                'bits',
                'machine',
                'assembly-control',
                'assembly-procedure'
            ],
            '/': [
                '',
                '/missing-semester/',
                '/data-structure/',
                '/csapp/'
            ]
        },
        logo: "/favicon.ico",
        repo: "jackfiled/wiki",
        sidebarDepth: 2
    },
    markdown: {
        lineNumbers: true,
        plugins: [
            'markdown-it-mathjax3'
        ]
    },
})