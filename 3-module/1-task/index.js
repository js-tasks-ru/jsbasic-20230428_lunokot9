function namify(users) {
    const names = [];

    users.forEach(function(item){
      names.push(item.name);
    });
    
    return names;
}
