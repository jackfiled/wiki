import {defineConfig} from 'vuepress/config'

export default defineConfig({
    base: "/wiki/",
    dest: "./wiki",
    markdown: {
        lineNumbers: true
    },
    locales: {
        '/': {
            lang: 'zh-CN',
            title: "Ricardo Ren的个人知识图书馆",
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
            '/': [
                '',
                '/missing-semester/',
            ]
        }
    }

})