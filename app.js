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
const { Console } = require("console");

let empArr = [];
let addMore = true;
console.log(OUTPUT_DIR, outputPath)

async function getTypeToAdd() {
	let tprompt = [
		{
			type: 'list',
			name: 'empType',
			message: 'Choose an employee role:\n',
			choices: [new inquirer.Separator(), chalk.yellow.bold('Engineer'), new inquirer.Separator(), chalk.green.bold('Intern'), new inquirer.Separator()]
		}
	];

	let {empType} = await inquirer.prompt(tprompt);
	return empType;
}

async function addAnother() {
	let aprompt = [
		{
			type: 'confirm',
			name: 'addAnother',
			message: 'Add another employee?\n'
		}
	];
	let {addAnother} = await inquirer.prompt(aprompt);
	return addAnother;

}

async function createEngineer() {
	let eprompt = [
		{
			type: 'input',
			name: 'name',
			message: chalk.bold.yellow(`Name:\n`)
		},
		{
			type: 'input',
			name: 'id',
			message: chalk.bold.yellow(`Employee ID:\n`)
		},
		{
			type: 'input',
			name: 'email',
			message: chalk.bold.yellow(`Email address:\n`)
		},
		{
			type: 'input',
			name: 'gitHub',
			message: chalk.bold.yellow('GitHub:\n')
		}
	];

	console.log(chalk.bold(`\nEnter your ${chalk.yellow("Engineer's")} information`));
	let {name, id, email, gitHub} = await inquirer.prompt(eprompt);
	empArr.push(new Engineer(name, id, email, gitHub));
	console.log(`\n* ${chalk.bold.yellow("Engineer")} added.\n`);

}

async function createIntern() {
	let iprompt = [
		{
			type: 'input',
			name: 'name',
			message: chalk.green(`Name:\n`)
		},
		{
			type: 'input',
			name: 'id',
			message: chalk.green(`Employee ID:\n`)
		},
		{
			type: 'input',
			name: 'email',
			message: chalk.green(`Email address:\n`)
		},
		{
			type: 'input',
			name: 'school',
			message: chalk.green('School:\n')
		}
	];

	console.log(chalk.bold(`\nEnter your ${chalk.green(`Intern's`)} information`));
	let {name, id, email, school} = await inquirer.prompt(iprompt);
	empArr.push(new Intern(name, id, email, school));
	console.log(chalk.bold(`\n* ${chalk.green("Intern")} added.\n`));

}

async function createManager() {
	let mprompt = [
		{
			type: 'input',
			name: 'name',
			message: chalk.red('Full name:\n')
		},
		{
			type: 'input',
			name: 'id',
			message: chalk.red(`Employee ID:\n`)
		},
		{
			type: 'input',
			name: 'email',
			message: chalk.red(`Email address:\n`)
		},
		{
			type: 'input',
			name: 'officeNum',
			message: chalk.red('Office telephone number:\n')
		}
	];

	console.log(chalk.bold(`Enter the team ${chalk.red(`Manager's`)} information`))
	let {name, id, email, officeNum} = await inquirer.prompt(mprompt);
	empArr.push(new Manager(name, id, email, officeNum));
	console.log(`\n* ${chalk.red.bold("Manager")} added.\n`);
}

function greeting() {
	console.clear();
	console.log("---------------------------------------------------------");
	console.log(chalk.bold("WELCOME to the EMPLOYEE MANAGEMENT COMMAND LINE INTERFACE"));
	console.log("---------------------------------------------------------\n");
}

async function init() {
	greeting();
	await createManager();

	while(await addAnother()) {
		switch(await getTypeToAdd()) {
			case chalk.yellow.bold('Engineer'):
				await createEngineer();
				break;
			case chalk.green.bold("Intern"):
				await createIntern();
				break;
		}
	}
	fs.writeFileSync(outputPath, render(empArr), "utf-8");
}

init();
