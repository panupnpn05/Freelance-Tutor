import React from 'react';

const AcceptedApplicants = ({ applicants }) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {applicants.map(applicant => (
                <div key={applicant.id} className="bg-green-200 rounded-lg p-4">
                    <p>{applicant.fullname}</p>
                </div>
            ))}
        </div>
    );
};

export default AcceptedApplicants;
