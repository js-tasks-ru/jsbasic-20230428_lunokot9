function getMinMax(str) {
    const strElements = str.split(' ')
    .map(item => Number(item))
    .filter(item => !isNaN(item))
    .sort( (a, b) => a - b );

    return {min: strElements[0], max: strElements[strElements.length - 1]}
}
