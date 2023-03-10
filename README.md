# mythmancer.github.io

Mythmancer, the world, created wholly by my friends, collectively known (by me) as Pottasco. This website, and this domain, is my gift.
to them. They can choose to do with it as they wish; I mostly did this for fun to show them how much I was enjoying this setting.

The site's served at [https://mythmancer.com](https://mythmancer.com).

# Development

We use the static site generator [purajit/YASS](https://github.com/purajit/YASS), with the default structure.

Assets are stored separately in the [mythmancer/assets.mythmancer.github.io](https://github.com/mythmancer/assets.mythmancer.github.io) repo to keep deploys artifacts and times small.

## Local testing
```sh
# To run the website locally on `localhost:80`
make run-server

# To stop the server
make stop-server

# To regenerate the website if changes were made to non-static files
# Changes will be instantly reflected
make generate-pages-cdn
```

You will need [colima](https://github.com/abiosoft/colima).

If you want to change assets and test it, you will have to clone the assets repo [mythmancer/assets.mythmancer.github.io](https://github.com/mythmancer/assets.mythmancer.github.io) into the same parent directory as this one. To use locally-available assets, run

```sh
make generate-pages-local
```

You could also use this simply to avoid network requests.

## Merging changes
If you're a collaborator, you can easily merge changes by creating a commit locally (`git commit -am "gneurshk"`), and running
```sh
gh pr create --fill && gh pr merge --auto -r -d
```

Follow [this GHA](https://github.com/mythmancer/mythmancer.github.io/actions/workflows/deploy.yml) to track the deploy - we use a custom deploy workflow that saves us 50%+ compared to the default workflow.
