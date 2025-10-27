// src/components/volunteer/ApplicationStatusTracker.jsx

import { useState, useEffect } from 'react';
import Badge from '../atoms/Badge/Badge';
import ProgressBar from '../atoms/ProgressBar/ProgressBar';
import Button from '../atoms/Button/Button';
import Toast from '../atoms/Toast/Toast';

const ApplicationStatusTracker = ({ applicationId, onStatusUpdate }) => {
  const [application, setApplication] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    fetchApplicationDetails();
  }, [applicationId]);

  const fetchApplicationDetails = async () => {
    try {
      setLoading(true);
      
      // Mock API calls - replace with actual API endpoints
      const mockApplication = {
        id: applicationId,
        opportunityTitle: 'Health Screening Assistant',
        status: 'under_review',
        submittedAt: '2024-10-20T10:00:00Z',
        reviewedAt: null,
        interviewScheduledAt: null,
        decisionDate: null,
        coverLetter: 'I am passionate about healthcare...',
        whyInterested: 'I want to make a difference...',
        documentsComplete: true,
        canBeSubmitted: false,
        volunteer: {
          name: 'John Doe',
          email: 'john@example.com'
        },
        reviewer: null
      };

      const mockTimeline = [
        {
          id: 1,
          status: 'draft',
          title: 'Application Started',
          description: 'You began your volunteer application',
          timestamp: '2024-10-19T14:30:00Z',
          completed: true
        },
        {
          id: 2,
          status: 'submitted',
          title: 'Application Submitted',
          description: 'Your application has been submitted for review',
          timestamp: '2024-10-20T10:00:00Z',
          completed: true
        },
        {
          id: 3,
          status: 'under_review',
          title: 'Under Review',
          description: 'Our team is reviewing your application and documents',
          timestamp: '2024-10-20T11:00:00Z',
          completed: true,
          current: true
        },
        {
          id: 4,
          status: 'documents_requested',
          title: 'Documents Review',
          description: 'Additional documents may be requested if needed',
          completed: false
        },
        {
          id: 5,
          status: 'interview_scheduled',
          title: 'Interview Scheduled',
          description: 'Interview will be scheduled if application passes initial review',
          completed: false
        },
        {
          id: 6,
          status: 'background_check',
          title: 'Background Check',
          description: 'Background verification process (if required)',
          completed: false
        },
        {
          id: 7,
          status: 'approved',
          title: 'Decision',
          description: 'Final decision on your application',
          completed: false
        }
      ];

      const mockDocuments = [
        {
          id: 1,
          type: 'resume',
          name: 'Resume/CV',
          status: 'approved',
          uploadedAt: '2024-10-20T09:45:00Z',
          reviewedAt: '2024-10-20T12:00:00Z',
          reviewNotes: 'Excellent qualifications and experience'
        },
        {
          id: 2,
          type: 'references',
          name: 'References',
          status: 'pending',
          uploadedAt: '2024-10-20T09:50:00Z',
          reviewedAt: null,
          reviewNotes: null
        },
        {
          id: 3,
          type: 'background_check',
          name: 'Background Check',
          status: 'not_required',
          uploadedAt: null,
          reviewedAt: null,
          reviewNotes: 'Not required for this position'
        }
      ];

      const mockNotes = [
        {
          id: 1,
          type: 'general',
          title: 'Application Received',
          content: 'Thank you for your interest in volunteering with CareSpot. We have received your application and will review it within 48 hours.',
          isInternal: false,
          createdAt: '2024-10-20T10:05:00Z',
          createdBy: 'System'
        },
        {
          id: 2,
          type: 'follow_up',
          title: 'Next Steps',
          content: 'We are currently reviewing your application. If selected for the next round, we will contact you within 3-5 business days to schedule an interview.',
          isInternal: false,
          createdAt: '2024-10-20T11:00:00Z',
          createdBy: 'Sarah Mensah'
        }
      ];

      setApplication(mockApplication);
      setTimeline(mockTimeline);
      setDocuments(mockDocuments);
      setNotes(mockNotes);

    } catch (error) {
      console.error('Error fetching application details:', error);
      showToastMessage('Error loading application details', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToastMessage = (message, type = 'info') => {
    setToastMessage({ text: message, type });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const getStatusColor = (status) => {
    const colors = {
      'draft': 'gray',
      'submitted': 'blue',
      'under_review': 'yellow',
      'documents_requested': 'orange',
      'interview_scheduled': 'purple',
      'background_check': 'indigo',
      'approved': 'green',
      'rejected': 'red',
      'withdrawn': 'gray'
    };
    return colors[status] || 'gray';
  };

  const getDocumentStatusColor = (status) => {
    const colors = {
      'pending': 'yellow',
      'approved': 'green',
      'rejected': 'red',
      'not_required': 'gray'
    };
    return colors[status] || 'gray';
  };

  const calculateProgress = () => {
    const completedSteps = timeline.filter(step => step.completed).length;
    return (completedSteps / timeline.length) * 100;
  };

  const handleWithdrawApplication = async () => {
    if (window.confirm('Are you sure you want to withdraw your application? This action cannot be undone.')) {
      try {
        // API call to withdraw application
        showToastMessage('Application withdrawn successfully', 'success');
        onStatusUpdate && onStatusUpdate('withdrawn');
      } catch (error) {
        showToastMessage('Error withdrawing application', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-gray-500">Application not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Application Status
            </h1>
            <p className="text-gray-600">
              {application.opportunityTitle}
            </p>
          </div>
          <div className="text-right">
            <Badge variant={getStatusColor(application.status)} className="mb-2">
              {application.status.replace('_', ' ').toUpperCase()}
            </Badge>
            <p className="text-sm text-gray-500">
              Submitted: {new Date(application.submittedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Application Progress
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(calculateProgress())}% Complete
            </span>
          </div>
          <ProgressBar 
            progress={calculateProgress()}
            className="h-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Application Timeline
            </h2>
            
            <div className="space-y-6">
              {timeline.map((step, index) => (
                <div key={step.id} className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${step.completed 
                        ? 'bg-green-500 text-white' 
                        : step.current
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                      }
                    `}>
                      {step.completed ? '✓' : index + 1}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className={`
                        w-0.5 h-12 mx-auto mt-2
                        ${step.completed ? 'bg-green-500' : 'bg-gray-200'}
                      `} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`
                          font-medium
                          ${step.completed || step.current ? 'text-gray-900' : 'text-gray-500'}
                        `}>
                          {step.title}
                        </h3>
                        <p className={`
                          text-sm mt-1
                          ${step.completed || step.current ? 'text-gray-600' : 'text-gray-400'}
                        `}>
                          {step.description}
                        </p>
                      </div>
                      {step.timestamp && (
                        <span className="text-xs text-gray-500 ml-4">
                          {new Date(step.timestamp).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Document Status
            </h2>
            
            <div className="space-y-4">
              {documents.map((document) => (
                <div key={document.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">
                      {document.name}
                    </h3>
                    <Badge variant={getDocumentStatusColor(document.status)}>
                      {document.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  {document.uploadedAt && (
                    <p className="text-sm text-gray-600 mb-2">
                      Uploaded: {new Date(document.uploadedAt).toLocaleDateString()}
                      {document.reviewedAt && (
                        <span> • Reviewed: {new Date(document.reviewedAt).toLocaleDateString()}</span>
                      )}
                    </p>
                  )}
                  
                  {document.reviewNotes && (
                    <div className="bg-gray-50 rounded p-3 mt-2">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Review Notes:</span> {document.reviewNotes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Communication History */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Communication History
            </h2>
            
            <div className="space-y-4">
              {notes.filter(note => !note.isInternal).map((note) => (
                <div key={note.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">
                      {note.title}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">
                    {note.content}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    From: {note.createdBy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            
            <div className="space-y-3">
              {application.status === 'draft' && (
                <Button variant="primary" className="w-full">
                  Continue Application
                </Button>
              )}
              
              {['submitted', 'under_review', 'documents_requested'].includes(application.status) && (
                <>
                  <Button variant="outline" className="w-full">
                    Upload Additional Documents
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full text-red-600 border-red-300 hover:bg-red-50"
                    onClick={handleWithdrawApplication}
                  >
                    Withdraw Application
                  </Button>
                </>
              )}
              
              {application.status === 'interview_scheduled' && (
                <Button variant="primary" className="w-full">
                  View Interview Details
                </Button>
              )}
              
              {application.status === 'approved' && (
                <Button variant="primary" className="w-full">
                  Accept Position
                </Button>
              )}
            </div>
          </div>

          {/* Application Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Application Summary
            </h3>
            
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Position:</span>
                <p className="text-gray-600">{application.opportunityTitle}</p>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">Submitted:</span>
                <p className="text-gray-600">
                  {new Date(application.submittedAt).toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">Documents:</span>
                <p className="text-gray-600">
                  {application.documentsComplete ? 'Complete' : 'Incomplete'}
                </p>
              </div>
              
              {application.reviewer && (
                <div>
                  <span className="font-medium text-gray-700">Reviewer:</span>
                  <p className="text-gray-600">{application.reviewer}</p>
                </div>
              )}
            </div>
          </div>

          {/* Help & Support */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              Need Help?
            </h3>
            
            <div className="space-y-3 text-sm">
              <p className="text-blue-800">
                If you have questions about your application status, please contact us:
              </p>
              
              <div className="space-y-2">
                <p className="text-blue-700">
                  <span className="font-medium">Email:</span> volunteers@carespot.org
                </p>
                <p className="text-blue-700">
                  <span className="font-medium">Phone:</span> +233 XX XXX XXXX
                </p>
              </div>
              
              <Button variant="outline" className="w-full mt-4 border-blue-300 text-blue-700 hover:bg-blue-100">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage.text}
          type={toastMessage.type}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default ApplicationStatusTracker;