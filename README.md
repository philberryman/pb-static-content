# Static Content Challenge

This node application takes markdown files, turns them into HTML and inserts the HTML into a common HTML template.

It uses Showdown to convert markdown into HTML and Handlebars to insert the HTML into a template file.

Tests are built using Jest.

# How to run

Clone repo
Navigate to diretory

```console
~$ npm install
~$ npm start
```

View any of the files on localhost (eg. http://localhost:8080/about-page)

# Running Unit Tests with Jest

```console
~$ npm test
```

Test will run to cover 3 areas:

- Valid paths return 200 status
- Veryify body html is from relevant index.md
- Non matching paths return 404

Original challenge specification follows ...

# Static Content challenge

**NB: Please do not fork this repository, to avoid your solution being visible from this repository's GitHub page. Please clone this repository and submit your solution as a separate repository.**

The challenge here is to create a node.js application that displays HTML pages at URLs that match the names of the folders in the `content` folder. The content of these pages should come from a combination of the template HTML file and a markdown file containing the content.

For example, for a folder called `about-page`, a request to `/about-page` would return a HTML page created from the `template.html` template and the `about-page/index.md` content file. The `template.html` file contains a `{{content}}` placeholder that would be replaced by the content for each page.

This repository contains a `template.html` template file and a `content` folder with sub-folders containing `index.md` markdown files.

The application should be shipped with three tests:

- one that verifies that requests to valid URLs return a 200 HTTP status code
- one that verifies that requests to valid URLS return a body that contains the HTML generated from the relevant `index.md` markdown file
- one that verifies that requests to URLs that do not match content folders return a 404 HTTP status code

Your application may make use of open-source code libraries. It is entirely up to you how the application performs the challenge.
