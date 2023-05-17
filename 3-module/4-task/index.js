function showSalary(users, age) {
    let resultStr = '';

    users.forEach((item, index, arr) => {
        if (item.age <= age) {
          if (index > 0) resultStr += '\n';
          
          resultStr += item.name + ', ' + item.balance;
        }
    });

    return resultStr;
}
