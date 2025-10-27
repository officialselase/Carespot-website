// src/components/volunteer/BackgroundCheckIntegration.jsx

import { useState, useEffect } from 'react';
import Badge from '../atoms/Badge/Badge';
import Button from '../atoms/Button/Button';
import ProgressBar from '../atoms/ProgressBar/ProgressBar';
import FileUpload from '../molecules/FileUpload/FileUpload';
import Toast from '../atoms/Toast/Toast';

const BackgroundCheckIntegration = ({ applicationId, required = false, onStatusUpdate }) => {
  const [checkStatus, setCheckStatus] = useState(null);
  const [checkHistory, setCheckHistory] = useState([]);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    fetchBackgroundCheckStatus();
  }, [applicationId]);

  const fetchBackgroundCheckStatus = async () => {
    try {
      setLoading(true);
      
      // Mock API call - replace with actual background check service integration
      const mockStatus = {
        id: 'bg_check_123',
        applicationId: applicationId,
        status: 'pending_document', // not_required, pending_document, submitted, in_progress, completed, failed, expired
        submittedAt: null,
        completedAt: null,
        expiresAt: null,
        provider: 'Ghana Police Service', // or third-party service
        referenceNumber: null,
        results: null,
        document: null,
        cost: required ? 50.00 : 0, // GHS
        paidBy: 'volunteer', // volunteer, organization
        notes: 'Background check required for this position due to direct contact with vulnerable populations.'
      };

      const mockHistory = [
        {
          id: 1,
          status: 'initiated',
          timestamp: '2024-10-20T10:00:00Z',
          description: 'Background check requirement identified',
          actor: 'System'
        }
      ];

      setCheckStatus(mockStatus);
      setCheckHistory(mockHistory);

    } catch (error) {
      console.error('Error fetching background check status:', error);
      showToastMessage('Error loading background check information', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = async (file) => {
    try {
      setSubmitting(true);
      
      // Validate file
      if (!file) return;
      
      const allowedTypes = ['pdf', 'jpg', 'jpeg', 'png'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      
      if (!allowedTypes.includes(fileExtension)) {
        showToastMessage('Please upload a PDF or image file', 'error');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showToastMessage('File size must be less than 5MB', 'error');
        return;
      }

      // Mock API call to upload document
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const uploadedDoc = {
        id: 'doc_' + Date.now(),
        filename: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        status: 'pending_review'
      };

      setUploadedDocument(uploadedDoc);
      
      // Update check status
      setCheckStatus(prev => ({
        ...prev,
        status: 'submitted',
        submittedAt: new Date().toISOString(),
        document: uploadedDoc
      }));

      // Add to history
      setCheckHistory(prev => [...prev, {
        id: prev.length + 1,
        status: 'document_uploaded',
        timestamp: new Date().toISOString(),
        description: 'Background check document uploaded',
        actor: 'Volunteer'
      }]);

      showToastMessage('Background check document uploaded successfully', 'success');
      onStatusUpdate && onStatusUpdate('submitted');

    } catch (error) {
      console.error('Error uploading document:', error);
      showToastMessage('Error uploading document', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const initiateThirdPartyCheck = async () => {
    try {
      setSubmitting(true);
      
      // Mock API call to initiate third-party background check
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const referenceNumber = 'BGC' + Date.now();
      
      setCheckStatus(prev => ({
        ...prev,
        status: 'in_progress',
        submittedAt: new Date().toISOString(),
        referenceNumber: referenceNumber
      }));

      setCheckHistory(prev => [...prev, {
        id: prev.length + 1,
        status: 'third_party_initiated',
        timestamp: new Date().toISOString(),
        description: `Third-party background check initiated. Reference: ${referenceNumber}`,
        actor: 'System'
      }]);

      showToastMessage('Background check initiated. You will receive updates via email.', 'success');
      onStatusUpdate && onStatusUpdate('in_progress');

    } catch (error) {
      console.error('Error initiating background check:', error);
      showToastMessage('Error initiating background check', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const showToastMessage = (message, type = 'info') => {
    setToastMessage({ text: message, type });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const getStatusColor = (status) => {
    const colors = {
      'not_required': 'gray',
      'pending_document': 'yellow',
      'submitted': 'blue',
      'in_progress': 'purple',
      'completed': 'green',
      'failed': 'red',
      'expired': 'orange'
    };
    return colors[status] || 'gray';
  };

  const getStatusDescription = (status) => {
    const descriptions = {
      'not_required': 'Background check is not required for this position',
      'pending_document': 'Please upload your background check document or initiate online verification',
      'submitted': 'Document submitted and pending review',
      'in_progress': 'Background check is being processed',
      'completed': 'Background check completed successfully',
      'failed': 'Background check did not meet requirements',
      'expired': 'Background check has expired and needs renewal'
    };
    return descriptions[status] || 'Unknown status';
  };

  const calculateProgress = () => {
    const statusProgress = {
      'not_required': 100,
      'pending_document': 20,
      'submitted': 40,
      'in_progress': 70,
      'completed': 100,
      'failed': 100,
      'expired': 0
    };
    return statusProgress[checkStatus?.status] || 0;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!checkStatus) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <p className="text-gray-500">Background check information not available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Background Check
            {required && <span className="text-red-500 ml-1">*</span>}
          </h2>
          <p className="text-gray-600 text-sm">
            {getStatusDescription(checkStatus.status)}
          </p>
        </div>
        <Badge variant={getStatusColor(checkStatus.status)}>
          {checkStatus.status.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress
          </span>
          <span className="text-sm text-gray-500">
            {calculateProgress()}% Complete
          </span>
        </div>
        <ProgressBar 
          progress={calculateProgress()}
          className="h-2"
        />
      </div>

      {/* Status-specific Content */}
      {checkStatus.status === 'not_required' && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-gray-400 text-2xl mr-3">ℹ️</span>
            <div>
              <h3 className="font-medium text-gray-900">No Background Check Required</h3>
              <p className="text-gray-600 text-sm">
                This volunteer position does not require a background check.
              </p>
            </div>
          </div>
        </div>
      )}

      {checkStatus.status === 'pending_document' && (
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <span className="text-yellow-400 text-2xl mr-3">⚠️</span>
              <div>
                <h3 className="font-medium text-yellow-900">Background Check Required</h3>
                <p className="text-yellow-800 text-sm mt-1">
                  {checkStatus.notes}
                </p>
                {checkStatus.cost > 0 && (
                  <p className="text-yellow-800 text-sm mt-2">
                    <span className="font-medium">Cost:</span> GHS {checkStatus.cost} 
                    ({checkStatus.paidBy === 'volunteer' ? 'Paid by volunteer' : 'Paid by organization'})
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload Existing Document */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">
                Upload Existing Document
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                If you already have a recent background check certificate, upload it here.
              </p>
              
              <FileUpload
                onFileSelect={handleDocumentUpload}
                acceptedTypes={['pdf', 'jpg', 'jpeg', 'png']}
                maxSize={5242880} // 5MB
                loading={submitting}
                disabled={submitting}
              />
              
              <p className="text-xs text-gray-500 mt-2">
                Accepted formats: PDF, JPG, PNG. Max size: 5MB
              </p>
            </div>

            {/* Initiate Online Check */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">
                Online Verification
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Start a new background check process through our verified partner.
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Secure and confidential
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Results in 3-5 business days
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Direct integration with authorities
                </div>
              </div>
              
              <Button
                variant="primary"
                onClick={initiateThirdPartyCheck}
                loading={submitting}
                disabled={submitting}
                className="w-full"
              >
                Start Online Check
              </Button>
            </div>
          </div>
        </div>
      )}

      {checkStatus.status === 'submitted' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-blue-400 text-2xl mr-3">📋</span>
              <div>
                <h3 className="font-medium text-blue-900">Document Under Review</h3>
                <p className="text-blue-800 text-sm">
                  Your background check document has been submitted and is being reviewed by our team.
                </p>
              </div>
            </div>
          </div>

          {uploadedDocument && (
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Uploaded Document</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-900">{uploadedDocument.filename}</p>
                  <p className="text-xs text-gray-500">
                    Uploaded: {new Date(uploadedDocument.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant="blue">Under Review</Badge>
              </div>
            </div>
          )}
        </div>
      )}

      {checkStatus.status === 'in_progress' && (
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-purple-400 text-2xl mr-3">🔄</span>
              <div>
                <h3 className="font-medium text-purple-900">Background Check In Progress</h3>
                <p className="text-purple-800 text-sm">
                  Your background check is being processed. This typically takes 3-5 business days.
                </p>
                {checkStatus.referenceNumber && (
                  <p className="text-purple-800 text-sm mt-2">
                    <span className="font-medium">Reference Number:</span> {checkStatus.referenceNumber}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">What happens next?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                You'll receive email updates on the progress
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Results will be automatically added to your application
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                You'll be notified once the check is complete
              </li>
            </ul>
          </div>
        </div>
      )}

      {checkStatus.status === 'completed' && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-green-400 text-2xl mr-3">✅</span>
              <div>
                <h3 className="font-medium text-green-900">Background Check Complete</h3>
                <p className="text-green-800 text-sm">
                  Your background check has been completed successfully.
                </p>
                {checkStatus.completedAt && (
                  <p className="text-green-800 text-sm mt-1">
                    Completed: {new Date(checkStatus.completedAt).toLocaleDateString()}
                  </p>
                )}
                {checkStatus.expiresAt && (
                  <p className="text-green-800 text-sm">
                    Expires: {new Date(checkStatus.expiresAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {checkStatus.status === 'failed' && (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <span className="text-red-400 text-2xl mr-3">❌</span>
              <div>
                <h3 className="font-medium text-red-900">Background Check Issues</h3>
                <p className="text-red-800 text-sm">
                  There were issues with your background check that need to be addressed.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Next Steps</h4>
            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Contact our volunteer coordinator for guidance
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                You may be able to provide additional documentation
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Alternative volunteer positions may be available
              </li>
            </ul>
            
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </div>
        </div>
      )}

      {checkStatus.status === 'expired' && (
        <div className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-orange-400 text-2xl mr-3">⏰</span>
              <div>
                <h3 className="font-medium text-orange-900">Background Check Expired</h3>
                <p className="text-orange-800 text-sm">
                  Your background check has expired and needs to be renewed to continue volunteering.
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={() => setCheckStatus(prev => ({ ...prev, status: 'pending_document' }))}
            className="w-full"
          >
            Renew Background Check
          </Button>
        </div>
      )}

      {/* History Timeline */}
      {checkHistory.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            History
          </h3>
          
          <div className="space-y-4">
            {checkHistory.map((event, index) => (
              <div key={event.id} className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  {index < checkHistory.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-200 mx-auto mt-2"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {event.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        By {event.actor}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 ml-4">
                      {new Date(event.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

export default BackgroundCheckIntegration;