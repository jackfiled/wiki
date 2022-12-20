import os

config_begin = """module.exports = {
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
"""

config_end = """        },
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
"""

def main():
    with open("config.js", "w") as f:
        f.write(config_begin)
        root = "docs"
        main_dist = os.listdir(root)
        for item in main_dist:
            path = root + "/" + item
            if os.path.isdir(path):
                f.write("               '/" + item + "/': [\n")
                f.write("                   '',\n")
                dist = os.listdir(path)
                for file in dist:
                    if file != "README.md" and file != "assets":
                        file = file.split(".")[0]
                        f.write("                   '" + file + "',\n")
                f.write("               ],\n")
        f.write("               '/': [\n")
        f.write("                   '',\n")
        for item in main_dist:
            path = root + "/" + item
            if os.path.isdir(path):
                f.write("                   '/" + item + "/',\n")
        f.write("               ]\n")
        f.write(config_end)

if __name__ == "__main__":
    main()
