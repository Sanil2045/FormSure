'use client';

import { useEffect } from "react";


type verifiedEmailsProps = {
    emails: 
        {
            email: string,
            status: string
        }[],
    
}

const VerifiedEmails = ({emails} : verifiedEmailsProps) => {
    useEffect(()=>{
    },[emails])
    return (
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 shadow-sm rounded-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {
              emails && emails.map((item, ind)=>{
                  return <tr className="hover:bg-gray-50 transition" key={ind}>
                          <td className="px-4 py-2 text-sm text-gray-800">{item.email}</td>
                          <td>{item.status}</td>
                      </tr>
              })
          }
        </tbody>
      </table>
    )
}

export default VerifiedEmails;