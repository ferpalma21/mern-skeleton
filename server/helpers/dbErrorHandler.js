'use strict'

const getUniqueErrorMessage = (err) => {
  let output
  try {
      let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'))
      output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists'
  } catch (ex) {
      output = 'Unique field already exists'
  }
  return output
}

const getErrorMessage = (err) => {
  let message = ''
  if (err.code) {
      switch (err.code) {
          case 11000:
          case 11001:
              message = getUniqueErrorMessage(err)
              break
          default:
              message = 'Something went wrong'
      }
  } else {
      for (let errName in err.errors) {
          if (err.errors[errName].message)
          message = err.errors[errName].message
      }
  }
  return message
}

import users from './a_users'
import User from '../models/user.model'
import moment from 'moment'
User.find({}).then(list => {
  if (list.length == 0) {
    for (var i = 0; i < users.length; i++) {
      let obj = {
        role: i == 0 ? 'admin' : 'user',
        name: users[i].nombre ? users[i].nombre : `name-${i}`,
        surname: users[i].surname ? users[i].surname : `surname-${i}`,
        email: users[i].email ? users[i].email : `email_${i}@email.com`,
        birthday: moment.utc().subtract(20, 'years').valueOf(),
        dniNumber: users[i].dni ? users[i].dni : `dniNumber-${i}`,
        mobile: '5123123',
        countryMobile: '+52',
        dniType: 'national',
        password: 'aaaaaaa',
      }
      try {
        let user = new User(obj)
        user.save()
      } catch (e) {
        console.error(e);
      }
    }
  }
})

console.log('Users Added to DB');

export default { getErrorMessage }
