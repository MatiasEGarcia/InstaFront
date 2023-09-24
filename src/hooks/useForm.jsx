import { useState } from "react"

/**
 * useHook to validate forms.
 * @param {Object} initialForm - Will contain the initial values in the inputs forms.
 * @param {Function} validateForm - Function that will validate inputs values in forms.
 * @returns {Object} - Object that will contain neccesary methods to work with this useHook and validate the form.
 */
export const useForm = (initialForm, validateForm) => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [fieldsTouched, setFieldsTouched] = useState({});

    function handleTouched(fieldTouched){
        setFieldsTouched({
            ...fieldsTouched,
            [fieldTouched]:true
        });
    }

    function handleChange(evt){
        const{name, value} = evt.target;
        setForm({
            ...form,
            [name]:value,
        });
    }

    /**
     * Funtion to update multiple form inputs values.
     * @param {Object} object - object that contains each key with values, each key should be the same than in initialForm
     */
    function handleMultipleChange(object){
        setForm({
            ...form,
            ...object
        })
    }

    /**
     * Function to set wich input in the form was already touched, to set errors in the form and handle any change in the inputs.
     * @param {Event} evt - event that will came from an input.
     */
    function handleBlur(evt){
        handleChange(evt);
        handleTouched(evt.target.name);
        setErrors(validateForm(form,fieldsTouched));
    }

    /**
    * This method is only for prevent default behavior in the evt and to see  
    * for last time if there is any error before send the form.
    * @param {Event} evt - event that will came from the form.
    * @param {Function} submit - submit function that will handle the event.
    * @returns nothing if the form has errors, if not will execute {submit} passing {evt}.
    */
    function handleSubmit(evt,submit){
        evt.preventDefault();
        setErrors(validateForm(form,fieldsTouched));
        //if there are no errors then I can submit
        if(Object.keys(errors).length === 0){
            submit(evt);
        }else{
            return;
        }
    }

    return{form,
            fieldsTouched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            handleMultipleChange
        }
}