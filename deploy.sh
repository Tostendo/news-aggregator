#!/bin/sh
cd ui && yarn build
cd .. && git add ui/build && git commit -m "Deploy to gh-pages" 
git subtree push --prefix ui/build origin gh-pages
