function camelize(str) {
    const strParts = str.split('-');
    let camelizeStr = '';
    
    strParts.forEach(function(item, index){
        if (item) {
            camelizeStr += (((index == 0) ? item[0] : item[0].toUpperCase()) + item.slice(1));
        }
    });
    
    return camelizeStr;
}
