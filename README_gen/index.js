const fs = require('fs');
const inquirer = require('inquirer');


inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the title of your project?',
            name: 'title',
        },
        {
            type: 'input',
            message: 'Please provide a description of your project. We suggest covering why this project exists and brief summary of your experience creating the application.',
            name: 'description',
        },
        {
            type: 'input',
            message: 'Please provide installation instructions.',
            name: 'install',
        },
        {
            type: 'input',
            message: 'Please provide instructions for using this application.',
            name: 'usage',
        },
        {
            type: 'list',
            message: 'Please provide guidelines for contributions to this project. (The Contributor Covenant is an industry standard, but you can always write your own if you so prefer.)',
            name: 'contribute',
            choices: ['Contributor Covenant', 'Custom']
        },
        {
            type: 'input',
            message: 'Please provide examples of testing your project.',
            name: 'testing',
        },
        {
            type: 'list',
            message: 'Which license covers the content of this application?',
            name: 'license',
            choices: ['MIT License', 'ISC License', 'GNU GPLv3', 'Apache License 2.0']
        },
        {
            type: 'input',
            message: 'Please give credit to any collaborators or online resources that helped in creating your project.',
            name: 'credits',
        },
        {
            type: 'input',
            message: 'What is your GitHub username?',
            name: 'GitUser',
        },
        {
            type: 'input',
            message: 'What is your email address?',
            name: 'email',
        }
    ])
    .then(response => {
        let contribInfo = response.contribute + ", as described at [the Contributor Covenant website](https://www.contributor-covenant.org/)";
        let contribBadge = "[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)";
        if (response.contribute === "Custom") {
            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'What are your contribution guidelines?',
                        name: 'customContrib',
                    }
                ])
                .then(response => {
                    let contribInfo = response.customContrib;
                    let contribBadge = "";
                })
        } ;

        let licenseInfo = "";
        let licenseBadge = "";
        switch (response.license) {
            case "MIT License":
                licenseInfo = `${response.title} is covered under the MIT License, as outlined at the [MIT License page on ChooseALicense](https://choosealicense.com/licenses/mit/)`;
                licenseBadge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
                break;
            case "ISC License":
                licenseInfo = `${response.title} is covered under the ISC License, as outlined at the [ISC License page on ChooseALicense](https://choosealicense.com/licenses/isc/)`;
                licenseBadge = '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)';
                break;
            case "GNU GPLv3":
                licenseInfo = `${response.title} is covered under the GNU General Public License, as outlined at the [GNU GPL License v3 page on ChooseALicense](https://choosealicense.com/licenses/gpl-3.0/)`;
                licenseBadge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
                break;
            case "Apache License 2.0":
                licenseInfo = `${response.title} is covered under the Apache License, as outlined at the [Apache License 2.0 page on ChooseALicense](https://choosealicense.com/licenses/apache-2.0/)`;
                licenseBadge = '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
                break;
        }
        let readmeString = `
# ${response.title}

${licenseBadge}
${contribBadge}

## Description

${response.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [Credits](#credits)


## Installation

${response.install}

## Usage

${response.usage}

## License

${licenseInfo}

## Contributing

${contribInfo}

## Tests

${response.testing}

## Questions

If you any questions about this project please reach out to its creator via email at ${response.email} or on GitHub from their [GitHub userpage](https://www.github.com/${response.GitUser}). Thank you!

## Credits

${response.credits}

--
        `
        
        fs.writeFileSync('READMEtest3.md', readmeString);
    })