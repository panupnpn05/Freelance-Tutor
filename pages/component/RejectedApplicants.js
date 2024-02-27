import React from 'react';

const RejectedApplicants = ({ applicants }) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {applicants.map(applicant => (
                <div key={applicant.id} className="bg-red-200 rounded-lg p-4">
                    <p>{applicant.fullname}</p>
                </div>
            ))}
        </div>
    );
};

export default RejectedApplicants;
