const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { create } = require("domain");
const { get } = require("https");

let empArr = [];
let addMore = true;
console.log(OUTPUT_DIR, outputPath)

async function getTypeToAdd() {
	let tprompt = [
		{
			type: 'list',
			name: 'empType',
			message: 'Select:',
			choices: [chalk.yellow('Engineer'), chalk.green('Intern')]
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
			message: chalk.green(`Name: `)
		},
		{
			type: 'input',
			name: 'id',
			message: chalk.green(`Employee ID: `)
		},
		{
			type: 'input',
			name: 'email',
			message: chalk.green(`Email address: `)
		},
		{
			type: 'input',
			name: 'school',
			message: chalk.green('School: ')
		}
	];

	console.log(chalk.bold(`Enter your ${chalk.green(`Intern's`)} information`));
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
			message: chalk.red('Full name: ')
		},
		{
			type: 'input',
			name: 'id',
			message: chalk.red(`Employee ID: `)
		},
		{
			type: 'input',
			name: 'email',
			message: chalk.red(`Email address: `)
		},
		{
			type: 'input',
			name: 'officeNum',
			message: chalk.red('Office telephone number: ')
		}
	];

	console.log(chalk.bold(`Enter the team ${chalk.red(`Manager's`)} information"`))
	let {name, id, email, officeNum} = await inquirer.prompt(mprompt);
	empArr.push(new Manager(name, id, email, officeNum));
	console.log('Manager added');
	console.log(empArr);
}

async function init() {
	await createManager();

	while(await addAnother()) {
		switch(await getTypeToAdd()) {
			case chalk.yellow('Engineer'):
				await createEngineer();
				break;
			case chalk.green("Intern"):
				await createIntern();
				break;
		}
	}
	fs.writeFileSync(outputPath, render(empArr), "utf-8");
}

init();
