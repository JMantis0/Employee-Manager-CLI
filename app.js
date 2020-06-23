const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let empArr = [];
let addMore = true;

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
		message: 'Select:',
		choices: ['Engineer', 'Intern']
	}

];

let inqEngineerData = [
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

let inqInternData = [
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



let inqManager = [
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

console.log('Enter the team Manager\'s information: ');

//  FIRST inquirer prompt adds for manager.
inquirer.prompt(inqManager)
.then(answer => {
	empArr.push(new Manager(answer.name, answer.id, answer.email, answer.officeNum));
	//  SECOND inquirer prompt gets type for next employee
	while(addMore) {
		console.log(`What type of employee would you like to add to ${empArr[0].name}'s team?`)
		inquirer.prompt(inqEmpType).then(answer2 => {
		
				//  Switch pushes inquiry object to array according to type;
			let promptType;
			switch(answer2.empType) {
			case "Engineer":
				promptType = inqEngineerData;
				break;
			case "Intern":
				promptType = inqInternData;
				break;
			}
			//  THIRD inquirer prompt collects teammate's information and adds it to empArr
			console.log(`Enter the ${answer2.empType}'s information: `)
			inquirer.prompt(promptType)
			.then(answer3 => {
				console.log(answer3);
				switch(answer2.empType) {
					case "Engineer":
						empArr.push(new Engineer(answer3.name, answer3.id, answer3.email, answer3.gitHub));
						break;
					case "Intern":
						empArr.push(new Intern(answer3.name, answer3.id, answer3.email, answer3.school));
						break;
				}
				console.log(empArr);
				// FOURTH inquirer prompt asks whether to add more employee.
				inquirer.prompt(inqNewEmp)
				.then(answer4 => {
					addMore = answer4.addAnother;
				})
				.catch(error => {
					if (error) {
						console.log(error);
					}
				});
			})
			.catch(error => {
				if (error) {
					console.log(error);
				}
			});;
		})
		.catch(error => {
			if (error) {
				console.log(error);
			}
		});;
	}
}).catch(error => {
	if (error) {
		console.log(error);
	}
});

function inquiryFour() {

}


//  Inquirer object that prompts for employee information

function askForAddEmployee() {
	inquirer.prompt(inqNewEmp)
	.then(answer => {
		console.log(answer.addAnother)
		if(answer.addAnother) {
			
		}
		else {
			addMore = false;
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
