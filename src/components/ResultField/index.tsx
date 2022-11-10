import { ReactNode } from "react";

export type ResultFieldProps = {
    label: string,
    children: ReactNode,
}
const ResultField = ({ children, label }: ResultFieldProps) => (
    <div className="row mb-4">
        <div className={`col-4 align-items-start`}>{label + ":"}</div>
        <div className="col-8">
            {children}
        </div>

    </div>
)

export default ResultField;