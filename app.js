const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//  Inquirer object that prompts whether to add another employee.
let inqNewEmp = [
	{
		type: 'confirm',
		name: 'addAnother',
		message: 'Add another employee?'
	}
];

//  Inquirer object that prompts what type of employee to add.
let inqEmpType = [
	{
		type: 'list',
		name: 'empType',
		message: 'What kind of employee are you adding?',
		choices: ['Manager', 'Engineer', 'Intern']
	}
];
//  Initial inquiry gets employee type to add
inquirer.prompt(inqEmpType).then(answer => {
	console.log(answer);
	//  Prepare next inquiry
	let inqEmpData = [
		{
			type: 'input',
			name: 'name',
			message: `Enter the ${answer.empType}\'s name: `
		},
		{
			type: 'input',
			name: 'id',
			message: `Enter the ${answer.empType}\'s id: `
		},
		{
			type: 'input',
			name: 'email',
			message: `Enter the ${answer.empType}\'s email address: `
		}
	];

	let inqOfficeNumber = 
		{
			type: 'input',
			name: 'officeNum',
			message: 'Enter the Manager\'s office number: '
		};
	
	let inqGitHub = 
		{
			type: 'input',
			name: 'gitHub',
			message: 'Enter the Engineer\'s GitHub: '
		};
	
	let inqSchool = 
		{
			type: 'input',
			name: 'school',
			message: 'Enter the Intern\'s School: '
		};

	switch(answer.empType) {
	case "Manager":
		inqEmpData.push(inqOfficeNumber);
		break;
	case "Engineer":
		inqEmpData.push(inqGitHub);
		break;
	case "Intern":
		inqEmpData.push(inqSchool);
		break;
	}
	console.log(inqEmpData);
	inquirer.prompt(inqEmpData).then(answer2 => {
		console.log(answer2);
		let newEmployee;
		switch(answer.empType) {
			case "Manager":
				newEmployee = new Manager(answer2.name, answer2.id, answer2.email, answer2.officeNum);
				break;
			case "Engineer":
				newEmployee = new Engineer(answer2.name, answer2.id, answer2.email, answer2.gitHub);
				break;
			case "Intern":
				newEmployee = new Intern(answer2.name, answer2.id, answer2.email, answer2.school);
				break;
		}
		console.log(newEmployee);
	})
})



//  Inquirer object that prompts for employee information

function askForAddEmployee() {
	inquirer.prompt(inqNewEmp)
	.then(answer => {
		console.log(answer.addAnother)
		if(answer.addAnother) {
			askForEmpType();
		}
		else {
			console.log("No more employees");
		}
	})
	.catch(error => {
		if (error) {
			console.log(error);
		}
	});
}




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
