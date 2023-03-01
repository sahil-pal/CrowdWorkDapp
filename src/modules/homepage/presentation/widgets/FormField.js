export const FormField = ({title,placeholder,inputType,value,handleChangeFn}) =>{
    return (
        <>
            <label className="flex-col">{title}
            {
                (inputType === 'textarea')
                ? <textarea defaultValue={value} onChange={handleChangeFn} rows={10} type={inputType} placeholder={placeholder} required/> 
                : <input defaultValue={value} onChange={handleChangeFn} type={inputType} placeholder={placeholder} step="0.1" required/>
               
            }
            </label>
        </>
    );
}

