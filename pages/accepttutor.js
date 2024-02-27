import React, { useState } from 'react';
import PendingApplicants from './component/PendingApplicants';
import AcceptedApplicants from './component/AcceptedApplicants';
import RejectedApplicants from './component/RejectedApplicants';

const AcceptReject = () => {
    const [applicants, setApplicants] = useState({
        pending: [
            { id: 1, fullname: 'John Doe', status: 'pending' },
            { id: 2, fullname: 'Jane Smith', status: 'pending' },
            // เพิ่มรายการผู้สมัครอื่น ๆ ตามต้องการ
        ],
        accepted: [],
        rejected: []
    });

    const countApplicantsByStatus = (status) => {
        return applicants[status].length;
    };

    const handleAccept = (id) => {
        const applicant = applicants.pending.find(applicant => applicant.id === id);
        setApplicants(prevState => ({
            ...prevState,
            pending: prevState.pending.filter(applicant => applicant.id !== id),
            accepted: [...prevState.accepted, { ...applicant, status: 'accepted' }]
        }));
    };

    const handleReject = (id) => {
        const applicant = applicants.pending.find(applicant => applicant.id === id);
        setApplicants(prevState => ({
            ...prevState,
            pending: prevState.pending.filter(applicant => applicant.id !== id),
            rejected: [...prevState.rejected, { ...applicant, status: 'rejected' }]
        }));
    };

    const [activeTab, setActiveTab] = useState('pending');

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">

            <h1 className="text-3xl font-bold mb-4 text-center">Tutor Approve</h1>

            <div className="flex justify-center gap-4 mb-4">
                <button
                  className={`px-4 py-2 focus:outline-none ${activeTab === 'pending' ? ' text-black border-b-4 border-black' : ''}`}
                  onClick={() => setActiveTab('pending')}
                >
                  Pending ({countApplicantsByStatus('pending')})
                </button>

                <button
                    className={`px-4 py-2 focus:outline-none ${activeTab === 'accepted' ? ' text-black border-b-4 border-black' : ''}`}
                    onClick={() => setActiveTab('accepted')}
                >
                    Accepted ({countApplicantsByStatus('accepted')})
                </button>

                <button
                    className={`px-4 py-2 focus:outline-none ${activeTab === 'rejected' ? ' text-black border-b-4 border-black' : ''}`}
                    onClick={() => setActiveTab('rejected')}
                >
                    Rejected ({countApplicantsByStatus('rejected')})
                </button>
            </div>
            
            {activeTab === 'pending' && (
                <PendingApplicants
                    applicants={applicants.pending}
                    handleAccept={handleAccept}
                    handleReject={handleReject}
                />
            )}
            {activeTab === 'accepted' && (
                <AcceptedApplicants
                    applicants={applicants.accepted}
                />
            )}
            {activeTab === 'rejected' && (
                <RejectedApplicants
                    applicants={applicants.rejected}
                />
            )}
        </div>

    );
};

export default AcceptReject;

