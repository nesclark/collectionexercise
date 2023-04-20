const ValidationService = (dataToBeValidated) =>
{
    const regex = /^[a-zA-Z ,.'-]+$/

    let results = []

    dataToBeValidated.forEach((item) =>{
        if (regex.test(item)) {
            results.push(item)
        }
    })

    return results
}

module.exports = ValidationService