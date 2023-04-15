# Creating a website with SimplyMarkdown

1. If you don't have a GitHub pages repository 
  - Create a new repository with the name `<your username>.github.io`
If you do have a GitHub pages repository
  - Push your repository's current contents into another branch and delete everything inside the main/master branch
1. Create a new branch with the name `source`
1. In the `source` branch, create a new directory `.github/workflows`
1. Go to [SimplyMarkdown render.yaml](https://github.com/cemreefe/SimplyMarkdown/blob/main/workflow/render.yaml), copy the yaml file into the `.github/workflows` directory in `source` branch.
1. Create a new directory named `source` in the `source` branch 
1. Create `index.md` and fill it with the content of your choice in markdown format.
1. (optional) create `navbar.md` and `footer.md`.