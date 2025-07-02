'use client'

import { useEffect, useState } from "react";

type searchProps = {
    fields?: string[];
    field?: string;
    mode?: string;
    onSearchChange: (args: {query: string}) => void;
}

const enumModes = {
    0: "none",
    1: "single",
    2: "fields",
}

const Search = ({field, fields, mode = enumModes[0], onSearchChange} : searchProps) => {
    const [activeFields, setActiveFields] = useState<Record<string, boolean>>({});
    const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
    const [currentMode, setCurrentMode] = useState(mode)

   

    useEffect(() => {

        // validations of modes
        if (!fields || fields?.length == 0 && currentMode == enumModes[2]) {
            setCurrentMode(enumModes[0])
        }
        if (!field && mode == enumModes[1]) setCurrentMode(enumModes[0]);

        const activeParams = Object.entries(fieldValues)
        .filter(([key, val]) => mode == enumModes[2] ? (activeFields[key] && val.trim() !== '') : true )
        .reduce((acc, [key, val]) => {
            acc.set(key, val.trim());
            return acc;
        }, new URLSearchParams());
        console.log(activeParams)
        onSearchChange({ query: activeParams.toString() });
    }, [activeFields, fieldValues]);

    const toggleField = (field: string) => {
        setActiveFields((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleInputChange = (field: string, value: string) => {
        setFieldValues((prev) => ({ ...prev, [field]: value }));
    };


    return (
        <>
            <h1>Search</h1>    
            {
                mode === enumModes[1] 
                    &&             
                <div style={{width: '200px', height: '50px', border: "1px solid black"}}>
                    <input style={{width: '100%', height: "100%"}} onChange={(e)=>{
                        if (field) handleInputChange(field, e.target.value);
                    }} />
                </div>
            }   
            {
                mode === enumModes[2] 
                    &&
                fields?.map((field) => (
                <div key={field} className="flex items-center gap-4 mb-2">
                    <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={!!activeFields[field]}
                        onChange={() => toggleField(field)}
                        className="accent-blue-600"
                    />
                    <span className="capitalize">{field}</span>
                    </label>

                    {activeFields[field] && (
                    <input
                        type="text"
                        placeholder={`Введите ${field}`}
                        value={fieldValues[field] || ''}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="border px-2 py-1 rounded-md"
                    />
                    )}
                </div>
            ))}
        </>
    )
}

export default Search;