# mythmancer.github.io

Mythmancer, the world, created wholly by my friends, collectively known (by me) as Pottasco. This website, and this domain, is my gift.
to them. They can choose to do with it as they wish; I mostly did this for fun to show them how much I was enjoying this setting.

The site's served at [https://mythmancer.com](https://mythmancer.com).

# Development

I use a custom site generator whose logic is pretty simple - each page is either a table of contents of its children, or an end page. It's trees all the way down.
* The structure is defined in `data/sitemap.json`.
* All templates are in `templates/`.
* Statics are in `docs/static`
* The website is served out of `docs/`.
* Assets are stored separately in the `mythmancer/assets.mythmancer.github.io` repo to keep deploys artifacts and times small.

## Generating the website
You will have to clone the assets repo `mythmancer/assets.mythmancer.github.io` into the same parent directory as this one.

When you make statics changes (including css/js), just refreshing the page will show you the updates. If you made changes to the
page contents, regenerate the site with
```sh
make generate-pages-local
```

## Running the website locally
Run
```sh
make run-server
```
to run the website on `localhost:80`. You will need colima. Alternatively, you can just `file://`, but the linking and static sourcing
will not work.

To stop the server
```sh
docker stop mythmancer.com
```

## Merging changes
If you're a collaborator, you can easily merge changes by creating a commit locally (`git commit -am "gneurshk"`), and running
```sh
gh pr create --fill && sleep 2 && gh pr merge --auto -r -d
```

Follow [this GHA](https://github.com/mythmancer/mythmancer.github.io/actions/workflows/deploy.yml) to track the deploy - we use a custom deploy workflow that saves us 50%+ compared to the default workflow.
