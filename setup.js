const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = [
  'SECRET_KEY_JWT',
  'SECRET_ADMIN_PASSWORD',
  'NEXT_PUBLIC_BACK_END_PORT',
  'NEXT_PUBLIC_BACK_END_IP'
];

function askQuestions(index, answers) {
  if (index >= questions.length) {
    writeToFile(answers);
    rl.close();
    return;
  }

  rl.question(`${questions[index]} = `, (answer) => {
    answers.push(`${questions[index]} = ${answer}`);
    askQuestions(index + 1, answers);
  });
}

function writeToFile(answers) {
  const content = answers.join('\n');
  fs.writeFileSync('.env', content); // Write to .env file
  console.log('Config file created successfully!');
}

askQuestions(0, []);
