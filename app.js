const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { create } = require("domain");
const { get } = require("https");

let empArr = [];
let addMore = true;

async function getTypeToAdd() {
	let tprompt = [
		{
			type: 'list',
			name: 'empType',
			message: 'Select:',
			choices: ['Engineer', 'Intern']
		}
	];

	let {empType} = await inquirer.prompt(tprompt);
	console.log(empType)
	return empType;
}

async function addAnother() {
	let aprompt = [
		{
			type: 'confirm',
			name: 'addAnother',
			message: 'Add another employee?'
		}
	];
	let {addAnother} = await inquirer.prompt(aprompt);
	console.log(addAnother);
	return addAnother;

}

async function createEngineer() {
	let eprompt = [
		{
			type: 'input',
			name: 'name',
			message: `Name: `
		},
		{
			type: 'input',
			name: 'id',
			message: `Employee ID: `
		},
		{
			type: 'input',
			name: 'email',
			message: `Email address: `
		},
		{
			type: 'input',
			name: 'gitHub',
			message: 'GitHub: '
		}
	];

	console.log("Enter your Engineer's information");
	let {name, id, email, gitHub} = await inquirer.prompt(eprompt);
	empArr.push(new Engineer(name, id, email, gitHub));
	console.log('Engineer added.');
	console.log(empArr);

}

async function createIntern() {
	let iprompt = [
		{
			type: 'input',
			name: 'name',
			message: `Name: `
		},
		{
			type: 'input',
			name: 'id',
			message: `Employee ID: `
		},
		{
			type: 'input',
			name: 'email',
			message: `Email address: `
		},
		{
			type: 'input',
			name: 'school',
			message: 'School: '
		}
	];

	console.log("Enter your Intern's information");
	let {name, id, email, school} = await inquirer.prompt(iprompt);
	empArr.push(new Intern(name, id, email, school));
	console.log('Intern added.')
	console.log(empArr);
}

async function createManager() {
	let mprompt = [
		{
			type: 'input',
			name: 'name',
			message: 'Full name: '
		},
		{
			type: 'input',
			name: 'id',
			message: `Employee ID: `
		},
		{
			type: 'input',
			name: 'email',
			message: `Email address: `
		},
		{
			type: 'input',
			name: 'officeNum',
			message: 'Office telephone number: '	
		}
	];

	console.log("Enter the team Manager's information")
	let {name, id, email, officeNum} = await inquirer.prompt(mprompt);
	empArr.push(new Manager(name, id, email, officeNum));
	console.log('Manager added');
	console.log(empArr);
}

async function init() {
	await createManager();

	while(await addAnother()) {
		switch(await getTypeToAdd()) {
			case "Engineer":
				await createEngineer();
				break;
			case "Intern":
				await createIntern();
				break;
		}
	}

}

init();



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
