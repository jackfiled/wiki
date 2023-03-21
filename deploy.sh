#!/bin/sh

# 确保shell会打印错误
set -e

time=$(date "+%Y%m%d%H%M%S")
message="Update at: $time"

git add -A 
git commit -m "$message"

git push