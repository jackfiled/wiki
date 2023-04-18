module.exports = {
    base: "/wiki/",
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
                   'graph',
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
               '/computer-networks/': [
                   '',
                   'overview',
                   'physical-layer',
                   'data-link-layer',
                   'mac',
               ],
               '/CS61B/': [
                   '',
                   'Introduction-to-Java',
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
               '/computer-architecture/': [
                   '',
                   'overview',
                   'calculator',
                   'memory',
                   'instruction',
                   'cpu',
               ],
               '/formal-language/': [
                    '',
                    'fa'
               ],
               '/': [
                   '',
                   '/data-structure/',
                   '/csapp/',
                   '/discrete-math/',
                   '/computer-networks/',
                   '/CS61B/',
                   '/missing-semester/',
                   '/computer-architecture/',
                   '/formal-language/'
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
