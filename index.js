// Required packages
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const { renderLicenseBadge } = require('./utils/generateMarkdown');
// const stat = util.promisify(fs.stat);
const generateMarkdown = require('./utils/generateMarkdown').generateMarkdown;

// Promisify the write file function of fs package
const writeFile = util.promisify(fs.writeFile);

// An array of questions for user input
const questions = [{
        type: 'input',
        message: "What is your project's title?",
        name: 'title',
    }, {
        type: 'input',
        message: 'Please provide a description of your project:',
        name: 'description',
    }, {
        type: 'input',
        message: 'Please provide installation instructions:',
        name: 'installation',
    }, {
        type: 'input',
        message: 'Please provide usage information:',
        name: 'usage',
    }, {
        type: 'list',
        message: 'Please choose a license for your project:',
        name: 'license',
        choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'None'],
    },
    {
        type: 'input',
        message: 'Please provide contribution guidelines:',
        name: 'contributing',
    },
    {
        type: 'input',
        message: 'Please provide test instructions:',
        name: 'tests',
    },
    {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'github',
    },
    {
        type: 'input',
        message: 'What is your email address?',
        name: 'email',
    },
];

function generateReadme(answers) {
    const { title, description, installation, usage, license, contributing, tests, github, email } = answers;
    
    return `
  # ${title}
  
  ## Description
  ${description}
  
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  
  ## Installation
  ${installation}
  
  ## Usage
  ${usage}
  
  ## License
  ${renderLicenseBadge(license)}
  This project is licensed under the ${license} license.
  
  ## Contributing
  ${contributing}
  
  ## Tests
  ${tests}
  
  ## Questions
  For questions about this project, please visit my [GitHub profile](https://github.com/${github}) or email me at ${email}.
  `;
  }

// A function to write the README file
function writeToFile(fileName, data) {
    const markdown = generateMarkdown(data);
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('README.md file has been generated!');
        }
    });
}

// A function to initialize the application
function init() {
    inquirer.prompt(questions).then((answers) => {
        const readmeContents = generateReadme(answers);
        writeToFile('README.md', readmeContents);
    });
}

// Call the init function to prompt the user for input
init();