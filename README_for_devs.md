
# SociaLens
## Installation guide for Developers

This document explains how to use the files in the github repository to work on SociaLens.

**NOTE**

The **repo IS NOT a react app** -> it is a **collection of files** that are to be **ADDED TO a react app that YOU CREATE.**

Please download the repository files then follow the steps below to get the application to run.

## Creating your Next.js app
1. Open VSCode
2. Create a folder for you to create your react app
3. Type in the following terminal code to navigate to your folder
```bash
cd folder_name
```
4. Type the following into terminal
```bash
npx create-react-app socialens
```
5. Terminal will ask you a few questions
    - Select No for typescript, tailwind css, import aliases, app-router
    - Select Yes for ESLint, src folder  

6. If you follow step 5, you will have the following file structure
```bash
socialens
|--> node_modules
|--> .next
|--> public
|--> src
| .eslintrc.json
| jsconfig.json
| next.config.js
| package-lock.json
| package.json
| README.md
```
We will be working within the src and public folder for this project

7. Now change directory to the next app you just created:
```bash
cd socialens
```
and then type in the following into terminal:
```bash
npm i bootstrap
```
once bootstrap is installed, type this into terminal:
```bash
npm i echarts
```

8. Create the file structure for this application. In the src folder you will find two folders, one for pages and one for styles. Create two new directories, one called components and one called dashboardComponents. The default pages folder contains another folder called api, we'll leave that be for now.
```bash
|src
|--> components
|--> dashboardComponents
|--> pages
     |--> api 
|--> styles
```

## Using the repository
1. Download the files in the repository, these are the files:
```bash
|components
|--> footer.js
|--> header.js
|--> sidebar.js
|dashboardComponents
|--> classroom.js
|--> correlations.js
|--> feedback.js
|--> home.js
|--> individual.js
|--> reports.js
|--> support.js
|--> uploadData.js
|--> year.js
|pages
|--> _app.js
|--> _document.js
|--> dashboard.js
|--> forgot.js
|--> index.js
|--> login.js
|--> register.js
|styles
|--> Dashboard.module.css
|--> Login.module.css
|--> Home.module.css
|--> globals.css
```
^
*copy and paste these files into the folders in your src folder*

you will also find the following files in the public folder:
```bash
|public
|-->socialens_col.png
|-->socialens_dark.png
|-->socialens_mono.png
|-->socialens_monodark.png
```

^
*copy and paste these into your public folder.

## Run the application
If you have followed the steps above, go to terminal and type in:
```bash
npm run dev
```
