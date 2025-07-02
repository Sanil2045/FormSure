'use client'

import { useEffect, useState } from "react";

type searchProps = {
    fields?: string[];
    field?: string;
    modes?: string;
    onSearchChange: (args: {query: string}) => void;
}

const enumModes = {
    0: "none",
    1: "single",
    2: "fields",
}

const Search = ({field, fields, modes = enumModes[0], onSearchChange} : searchProps) => {
    const [searchQuery, setsSearchQuery] = useState("");
    const [activeFields, setActiveFields] = useState<Record<string, boolean>>({});
    const [fieldValues, setFieldValues] = useState<Record<string, string>>({});

    // validations of modes
    if (!fields || fields?.length == 0 && modes == enumModes[2]) {
        modes = enumModes[0]
    }
    if (!field && modes == enumModes[1]) modes = enumModes[0];

    useEffect(() => {
        const activeParams = Object.entries(fieldValues)
        .filter(([key, val]) => activeFields[key] && val.trim() !== '')
        .reduce((acc, [key, val]) => {
            acc.set(key, val.trim());
            return acc;
        }, new URLSearchParams());

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
                modes === enumModes[1] 
                    &&             
                <div style={{width: '200px', height: '50px', border: "1px solid black"}}>
                <input style={{width: '100%', height: "100%"}} onChange={(e)=>{
                    let val = {
                        field : e.target.value,
                    }
                    const queryString = new URLSearchParams(val).toString();
                    setsSearchQuery(queryString);
                }} />
            </div>
            }   
            {
                modes === enumModes[2] 
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