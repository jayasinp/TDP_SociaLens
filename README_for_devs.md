# SociaLens
### Written by Pravin Mark Jayasinghe for Team 2
### COS60011: Technology Design Project

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
npx create-next-app socialens
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

then install bootstrap icons like this:
```bash
npm i bootstrap-icons
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
|--> datasets.js
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
_copy and paste these files into the folders in your src folder_
you will also find the following files in the public folder:

```bash
|public
|-->socialens_col.png
|-->socialens_dark.png
|-->socialens_mono.png
|-->socialens_monodark.png
|-->favicon.ico
```

^
\*copy and paste these into your public folder.

## Run the application

If you have followed the steps above, go to terminal and type in:

```bash
npm run dev
```

## Back-End Implementation

1. Navigate to the project directory and run this in terminal:
```bash
mkdir backend
cd backend
python3 -m venv venv
```
This code will create a folder called backend at the same level as your react app, but not IN your react app folder. Then it will enter the backend folder and install a python3 virtual environment.

Don't install this in the react application folder. We seperate the back-end and front-end code for better organisation and to prevent any potential conflicts or issues.

Your file structure will look like this:
```bash
socialens/
│
├── socialens/ (your React app)
│   ├── src/
│   ├── public/
│   ├── ...
│
├── backend/ (your Flask backend)
│   ├── venv/ (your virtual environment)
│
└── ...
```

2. Activate the virtual environment
```bash
source venv/bin/activate
```

After running this code, terminal will not give you any indication if the virtual environment is online or not, but if you run this code, we can assume the virtual environment is activated.

3. Install the libraries:
```bash
pip install Flask Flask-WTF numpy pandas networkx scipy reportlab
```
this installs Flask, Flask forms, NumPy, Pandas, NetworkX, SciPy, ReportLab. You will see a lot of activity in terminal confirming that the libraries are being installed.

4. In the backend folder (not the venv folder) create a file called app.py and paste this boiletplate template in first:
```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run()
```

We do this to install Flask-CORS. We will remove all this boilerplate code with the actual app.py from the repo in a few steps.

4. Install the cross origin resource sharing system:
```bash
pip install flask-cors
```

after flask-cors is installed, copy and paste this code to your app.py:
```python
from flask import Flask
from flask_cors import CORS #added this cors import statement

app = Flask(__name__)
cors = CORS(app) #add this call to cors


@app.route('/') #this will connect to the react application
def hello_world():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run()
```

5. While you are in the backend folder run this code to start the flask app server on localhost:5000/
```bash
python app.py
```
You will find a simple "Hello world" message at localhost:5000/.

6. Connect to the react application. First return to the react app:
```bash
cd ..
cd socialens
```
^ get back to the react app then run this:
```bash
npm i axios
```
This will install the Javascript library used to make HTTP requests from node.js or XMLHttpRequests from the browser.

7. Head back to the backend folder and install the database system:
```bash
pip install Flask-SQLAlchemy
```
This will install SQLAlchemy which is a SQL system with python.
The contents of models.py will define the database schema.

8. In the react app, create a proxy. Go to package.json and add this line:
```json
"proxy": "http://localhost:5000",
```
^ this line goes below the "private" entry.

9. Create a new folder called "utils" in your src folder in the react app. Add the the utils folder contents from the repo to this folder.

10. Copy the backend code files to your backend folder and then run the flask app then the react app


## Dev team user accounts

Username ; password
```bash
pravin@pravin.com ; 123
serge@serge.com ; 456
dhruvi@dhruvi.com ; 789
priya@priya.com ; 123
charan@charan.com ; 456
chathuni@chathuni.com ; 789
```

## BEST PRACTICES

1. Add code comments to the code you write. Every function needs a comment. Anything complicated needs a comment too. Write code comments so that anyone can read them and easily understand your code.

2. Add your name to the top of the file as a comment. If more than one person contributes, add both names.

3. Add the date of the last edit as a comment. Do not change the first date listed when the file was created.

4. Follow the file structure. All pages go in the pages folder, all components go in the components or dashboardComponents folders.

5. Always push your **EDITED FILES** to the github repository. **Don't push your ENTIRE react app.**
