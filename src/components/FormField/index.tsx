import { HTMLInputTypeAttribute } from "react";
import styles from './formField.module.scss';

export type FormFieldProps = {
    id: string,
    label: string,
    type: HTMLInputTypeAttribute,
    min?: string | number,
    errorMessage?: string,
    defaultValue?: string,
    setStateData: (value: string) => void,
}

const FormField = ({ id, label, type, errorMessage, setStateData, min, defaultValue }: FormFieldProps) => {

    return (
        <div className={`d-flex flex-column ${styles.width325p}`}>
            <label htmlFor="passengers" className="text-dark w-100 text-center">
                {label}
            </label>
            <input
                type={type}
                id={id}
                name="passengers"
                className={`form-control w-100 ${!!errorMessage ? 'border-danger' : ''}`}
                onChange={(e) => setStateData(e.currentTarget.value)}
                min={min}
                defaultValue={defaultValue}
            />
            {!!errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
    )
}

export default FormField;