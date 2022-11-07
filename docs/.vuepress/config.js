module.exports = {
    base: "/wiki/",
    dest: "./wiki/",
    port: 4000,
    locales: {
        '/': {
            lang: 'zh-CN',
            title: "Ricardo Ren的知识图书馆",
            description: "所有的都是知识（大概）",
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
                'array-and-list',
                'tree',
                'lab',
            ],
            '/csapp/': [
                '',
                'bits',
                'machine',
                'assembly-control',
                'assembly-procedure',
                'assembly-data',
                'assembly-advanced'
            ],
            '/discrete-math/': [
                '',
                'relation',
            ],
            '/': [
                '',
                '/missing-semester/',
                '/data-structure/',
                '/csapp/',
                '/discrete-math/'
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
    plugins: [
        'vuepress-plugin-mermaidjs'
    ]
}
