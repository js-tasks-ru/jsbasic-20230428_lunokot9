function sumSalary(salaries) {
    let sum = 0;

    for (let key in salaries) {
      console.log(salaries[key]);
      if (Number.isFinite(salaries[key])) sum += salaries[key];
    }
    
    return sum;
}