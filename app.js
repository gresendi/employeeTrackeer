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
  if(action==='Modify'){
    modifyProduct()
  }else{

 
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
          modifyProduct()
          break
        case 'Remove':
          // removeProduct(Product)
          break
      }
    })}
}

const viewProduct = (string) => {
  switch (string) {
    case 'Department table':
      db.query('SELECT * FROM department', (err, departments) => {
        if (err) { console.log(err) }
        console.log(' ')
        console.table(departments)
      })


      main()
      break
    case 'Role table':
      db.query('SELECT * FROM roles', (err, role) => {
        if (err) { console.log(err) }
        console.log(' ')
        console.table(role)
      })

      main()
      break
    case 'Employee table':
      db.query('SELECT * FROM employee', (err, employee) => {
        if (err) { console.log(err) }
        console.log(' ')
        console.table(employee)
      })

      main()
      break
  }
}

const addProduct = (type) => {
  switch (type) {
    case 'Department table':
      prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the Department name',
      }).then(({ name }) => {
        const department = {
          name: `${name}`
        }
        db.query('INSERT INTO department SET ?', department, err => {
          if (err) { console.log(err) }
          console.log('Department created!')
          main()
        })


      })

      break
    case 'Role table':
      prompt([{
        type: 'input',
        name: 'title',
        message: 'Enter the roles title'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the roles salary'
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the roles department id'
      }
      ]).then(({ title, salary, department_id }) => {
        const role = {
          title: `${title}`,
          salary: `${salary}`,
          department_id: `${department_id}`
        }
        db.query('INSERT INTO roles SET ?', role, err => {
          if (err) { console.log(err) }
          console.log('Role created!')
          main()
        })


      })



      break
    case 'Employee table':
      prompt([{
        type: 'input',
        name: 'first_name',
        message: 'Enter their first name'
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter their last name'
      },
      {
        type: 'input',
        name: 'role_id',
        message: 'Enter their role id'
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'Enter their managers id'
      }
      ]).then(({ first_name, last_name, role_id, manager_id }) => {
        const employee = {
          first_name: `${first_name}`,
          last_name: `${last_name}`,
          role_id: `${role_id}`,
          manager_id: `${manager_id}`
        }
        db.query('INSERT INTO employee SET ?', employee, err => {
          if (err) { console.log(err) }
          console.log('Employee created!')
          main()
        })


      })
      break
  }


}


const modifyProduct = () => {
  prompt([
    {
      type: 'number',
      name: 'id',
      message: "Enter the employee id you wish to update their role"

    },
    {
      type: 'number',
      name: 'role',
      message: `Enter the new role id`,

    }])
    .then(({ id, role }) => {
      const updates = { role_id: role }
      const where = { id: id }

      db.query('UPDATE employee SET ? WHERE ?', [updates, where], err => {
        if (err) { console.log(err) }
        console.log('Employee updated!')
        main()
      })
    })


}

main()

