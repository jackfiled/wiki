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
               '/data-structure/': [
                   '',
                   'lab',
                   'outer-sort',
                   'string',
                   'foundation',
                   'stack-and-dequeue',
                   'inner-sort',
                   'array-and-list',
                   'tree',
                   'find',
                   'list',
               ],
               '/csapp/': [
                   '',
                   'assembly-data',
                   'assembly-control',
                   'linking',
                   'assembly-advanced',
                   'exception-control-flow',
                   'bits',
                   'assembly-procedure',
                   'io',
                   'machine',
               ],
               '/discrete-math/': [
                   '',
                   'graph',
                   'advanced-counting',
                   'relation',
                   'tree',
               ],
               '/missing-semester/': [
                   '',
                   'missing-debugging',
                   'missing-command-line',
                   'missing-data-wrangling',
                   'missing-potpourri',
                   'missing-vim',
                   'missing-shell-scripts',
                   'missing-version-control',
                   'missing-security',
                   'missing-metaprogramming',
                   'missing-the-shell',
               ],
               '/': [
                   '',
                   '/data-structure/',
                   '/csapp/',
                   '/discrete-math/',
                   '/missing-semester/',
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
