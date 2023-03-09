# mythmancer.github.io

Mythmancer, the world, created wholly by my friends, collectively known (by me) as Pottasco. This website, and this domain, is my gift 
to them. They can choose to do with it as they wish; I mostly did this for fun to show them how much I was enjoying this setting.

# Development

I use a custom site generator whose logic is pretty simple - each page is either a table of contents of its children, or an end page. 
The structure is defined in `data/sitemap.json`. All templates are in `templates/`. Statics are in `docs/static`, and the website is
served out of `docs/`. The data used to generate the site is in `data/`.
Assets are stored separately in the mythmancer/assets.mythmancer.github.io repo to keep deploys small.
For local development you will have the clone that repo into the same parent directory as this one.

## Generating the website
Install the requirements (just Jinja right now).

When you make statics changes (including css/js), just refreshing the page will show you the updates. If you made changes to the
page contents, regenerate the site with
```sh
make generate-pages-local
```

## Running the website locally
Locally, run
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
Check-in all files, including the generated ones. I used to have a GHA that ran the generation, but that's a bit wonkier with branch
protection. Also, since we end up usually generating the pages after every change to test them, we might as well just check it in.

If you're a collaborator, you can easily merge changes by creating a commit locally (`git commit -am "gneurshk"`), and running
```sh
gh pr create --fill && sleep 2 && gh pr merge --auto -r -d
```

Follow [the GHA](https://github.com/purajit/mythmancer.github.io/actions/workflows/pages/pages-build-deployment) to see if deployment is completed.
