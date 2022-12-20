if [-x "docs"]; then
    rm -rf docs
fi

mv ~/Downloads/课程笔记.zip .
unzip 课程笔记.zip -d .
rm 课程笔记.zip
mv 课程笔记 docs

python ./generate_config.py
mv ./config.js ./vuepress/
cp -r ./vuepress/ ./docs/.vuepress