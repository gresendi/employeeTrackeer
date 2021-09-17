const { prompt } = require('inquirer')
const mysql = require('mysql2')
const cTable = require('console.table');

const db = mysql.createConnection('mysql://root:rootroot@localhost:3306/employee_db')


// const employee = {
//   first_name:'John',
//   last_name: 'Doe',
//   role_id: '1',
//   manager_id: 1
// }

// const department={
//   name: 'Math'
// }

// const role ={
//   title: 'Manager',
//   salary: 50000,
//   department_id: 1
// }

// db.query('INSERT INTO department SET ?', department, err => {
//   if (err) { console.log(err) }
//   console.log('department created!')
// })

// db.query('INSERT INTO roles SET ?', role, err => {
//   if (err) { console.log(err) }
//   console.log('role created!')
// })

// db.query('INSERT INTO employee SET ?', employee, err => {
//   if (err) { console.log(err) }
//   console.log('employee created!')
// })


const main = () => {
  prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View', 'Add', 'Modify', 'Remove', 'EXIT']
  })
    .then(({ action }) => action === 'EXIT' ? process.exit() : chooseType(action))
    .catch(err => console.log(err))
}


const chooseType = action => {
  prompt({
    type: 'list',
    name: 'type',
    message: `Which would you like to ${action}?`,
    choices: ['Department table', 'Role table', 'Employee table']
  })
    .then(({ type }) => {

      switch (action) {
        case 'View':
          viewProduct(type)
          break
        case 'Add':
          addProduct(type)
          break
        case 'Modify':
          // modifyProduct(Product)
          break
        case 'Remove':
          // removeProduct(Product)
          break
      }
    })
}

const viewProduct = (string) => {
  switch (string) {
    case 'Department table':
      db.query('SELECT * FROM department', (err, departments) => {
        if (err) { console.log(err) }

        console.table(departments)
      })


      main()
      break
    case 'Role table':
      db.query('SELECT * FROM roles', (err, role) => {
        if (err) { console.log(err) }

        console.table(role)
      })

      main()
      break
    case 'Employee table':
      db.query('SELECT * FROM employee', (err, employee) => {
        if (err) { console.log(err) }

        console.table(employee)
      })

      main()
      break
  }
}

const addProduct = (type)=>{
  switch (string) {
    case 'Department table':
      prompt({
        type:'input',
        name: 'name',
        message: 'Enter the Department name',

      })
      main()
      break
    case 'Role table':
   

      main()
      break
    case 'Employee table':
     

      main()
      break
  }


}

main()