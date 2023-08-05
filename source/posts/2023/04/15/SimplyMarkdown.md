# Creating a website with SimplyMarkdown

! emoji 📄
@ SimplyMarkdown, coding, webdev

![The markdown logo on blue background. It is a big capital M and an arrow pointing down, encapsulated in a soft-corner rectangle.](./markdown.jpeg)

Creating a website with SimplyMarkdown is a straightforward process that requires a few steps. 

1. First, login or sign-up to [GitHub](https://github.com/). 

2. If you don't have a GitHub pages repository set-up, you will need to create a new repository with the name `<username>.github.io`. This will serve as the main repository where your website will be hosted. `​`

3. If you already have a GitHub pages repository, you can skip the previous step and proceed to push your repository's current contents into another branch and delete everything inside the `main` or `master` branch. This way your old website's content is stored in a separate branch, which will allow you to easily update and manage your site's content in the future if you need to access the previous versions. 

4. Go to `Settings`, from the menu on the left go to `Developer Settings` > `Personal Access Tokens`. Generate a new personal access token (PAT). Now go to your GitHub pages repository, `Settings` > `Secrets and Variables` > `Actions`. Click `New repository secret` and add a new secret under the name `AUTO_RENDER_PAT`. This will enable your workflow to push commits to your github pages repository.
  
5. Next, create a new branch with the name `source`. This branch will contain the source code for your website and will be used to generate the HTML files that will be served to your visitors. In the `source` branch, create a new directory called `.github/workflows`. This directory will contain the workflow file that is necessary to automatically build and deploy your website.

![](/static/img/blog/simplymarkdown/source-branch.png){width=80%}

6. To create the workflow file, go to the [SimplyMarkdown GitHub repository](https://github.com/cemreefe/SimplyMarkdown) and copy the [render.yaml](https://github.com/cemreefe/SimplyMarkdown/blob/main/workflow/render.yaml) file into the `.github/workflows` directory in the source branch of your repository. This file contains the necessary instructions to automatically build your website using SimplyMarkdown when a new commit is pushed to the `source` branch.

7. Once the workflow file is in place, create a new directory named `source` in the `source` branch. This directory will contain your website's markdown files, which will be converted to HTML by SimplyMarkdown. Create an `index.md` file and fill it with the content of your choice in markdown format. This file will serve as the main page of your website.

8. You can also create a `navbar.md` and `footer.md` file to add a navigation bar and footer to your website. These files will be included on every page of your website, and can be edited and updated easily in the future. With these steps completed, you can now build and deploy your website by committing and pushing your changes to the `source` branch. The SimplyMarkdown workflow will automatically build your website and deploy the generated HTML files to your main/master branch, which will be served to your visitors.

![](/static/img/blog/simplymarkdown/header-footer.png)

(Optional) Change the `-t` flag value `'My Blog'` to your desired website title.

```
24  run: |
25    cd SimplyMarkdown
26    python3 render.py -i ../source -o ../output -t "Cemre's Blog" -th themes/custom.css
```

(Optional) Change the `-th` flag value `'themes/custom.css'` to your desired ready-to-use theme from SimplyMarkdown themes. 

If you want to supply your own css file, set `-th` flag to `'none'` and create a new directory `/source/static/css/` in your `source` branch and supply a `theme.css` file with your desired css properties.

```
24  run: |
25    cd SimplyMarkdown
26    python3 render.py -i ../source -o ../output -t "Cemre's Blog" -th none
```

! include socials