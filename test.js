function totalValues(array){
    let forHash = ''
    array.forEach(element => {
        forHash += `${element}|`
    });
    return forHash
}

function makeArrayFromObject(object){
    const allValues = Object.entries(object);
    let total = []
    for (let i = 0; i < allValues.length; i++){
        const value = allValues[i][1]
        total.push(value)
    }
    return total
}

const arrayValues = makeArrayFromObject({'color': 'white', 'number': 26})
        
const hashData = totalValues(arrayValues)

console.log(hashData)