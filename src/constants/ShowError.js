const showErrorMessage = (message, setError) => {
    setError(message);
    setTimeout(()=>{setError('');}, 4000);
}

// const showErrorRequirements = (message, setError) => {

//     setError(message);
//     setTimeout(()=>{setError('');}, 4000);
// }
// const showErrorVaccineStatus = (message, setError) => {

//     setError(message);
//     setTimeout(()=>{setError('');}, 4000);
// }
// const showErrorVisaType = (message, setError) => {

//     setError(message);
//     setTimeout(()=>{setError('');}, 4000);
// }

export { showErrorMessage};