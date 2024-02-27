import React from 'react';

const PendingApplicants = ({ applicants, handleAccept, handleReject }) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {applicants.map(applicant => (
                <div key={applicant.id} className="bg-gray-200 rounded-lg p-4">
                    <p>{applicant.fullname}</p>
                    <div className="flex justify-end mt-2">
                        <button onClick={() => handleAccept(applicant.id)} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded mr-2">
                            Accept
                        </button>
                        <button onClick={() => handleReject(applicant.id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded">
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PendingApplicants;

