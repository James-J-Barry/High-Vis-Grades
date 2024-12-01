# High-Vis Grades for Gradescope

![GitHub issues](https://img.shields.io/github/issues/James-J-Barry/High-Vis-Grades)
![GitHub forks](https://img.shields.io/github/forks/James-J-Barry/High-Vis-Grades)
![GitHub stars](https://img.shields.io/github/stars/James-J-Barry/High-Vis-Grades)

By [James Barry](https://www.linkedin.com/in/james-barry-good-choice/)

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

## Description
High-Vis Grades is NOT produced by or officially affiliated with Gradescope or Turnitin in any way.

High-Vis Grades is a browser extension that calculates a student's course grade from their assignments on Gradescope. It allows users to edit weights for different categories of assignments, select assignment types, and calculate their overall course grade.

## Installation
Download on the [chrome web store](https://chromewebstore.google.com/detail/High-Vis%20Grades%20for%20Gradescope/bbipgggnmodflnoenakmcoeiebgmffbf)

To load & use locally:

The extension is currently undergoing the process of being reveiwed for the chrome web store. In the meantime, install the extension using the following steps: 
1. Clone the repository: `git clone https://github.com/James-J-Barry/High-Vis-Grades.git`
2. Go to the directory: `cd High-Vis-Grades`
3. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the extension directory
  
## Usage
1. Open Gradescope, log in, and navigate to the desired course. 
2. Assign weights to assignments:
Add a new assignment type and specify the percentage of the total grade that it makes up. For example, if homework assignments make up 20% of the total grade, add "Homework" and "20" in the input boxes and click "Add". You can add as many assignment types as you like. If the name of an assignemnt contains the name of an assignment type that you add, the dropdown menu will automatically select it. After adding all of the assignment types for your course, make sure that all of the currently graded assignments are assigned a type using their dropdown menus, otherwise they will not be included in the calculation.
4. Calculating your course grade:
To calculate your course grade, click the "Calculate Course Grade" button. The course grade will be calculated based on the weighted average of the grades for each assignment type. If two assignments are supposed to have different effects on the course grade, they should assigned different assignment types. This is because the amount of points that each assignment is worth is not taken into account, only the percentage. If two assignments have the same name, they will be treated as the one assignment.

## Screenshots
<img width="1212" alt="Screenshot 2024-11-16 at 1 21 10 AM" src="https://github.com/user-attachments/assets/5dd0fdb6-24de-4adb-b20e-56f4f38c86c8">

<img width="744" alt="Screenshot 2024-11-16 at 1 21 41 AM" src="https://github.com/user-attachments/assets/c940da55-8ffd-4178-9a77-5f44cb4e91e5">

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin my-feature-branch`
5. Open a pull request.

