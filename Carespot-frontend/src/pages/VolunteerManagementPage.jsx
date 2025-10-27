// src/pages/VolunteerManagementPage.jsx

import { useState, useEffect } from 'react';
import Button from '../components/atoms/Button/Button';
import Badge from '../components/atoms/Badge/Badge';
import VolunteerDashboard from '../components/volunteer/VolunteerDashboard';
import MultiStepApplication from '../components/volunteer/MultiStepApplication';
import ApplicationStatusTracker from '../components/volunteer/ApplicationStatusTracker';
import OpportunityMatcher from '../components/volunteer/OpportunityMatcher';
import BackgroundCheckIntegration from '../components/volunteer/BackgroundCheckIntegration';

const VolunteerManagementPage = () => {
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, opportunities, apply, application, background_check
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Mock user data - replace with actual authentication
      const mockUser = {
        id: 'user_123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        isAuthenticated: true,
        roles: ['volunteer']
      };

      const mockProfile = {
        id: 'profile_123',
        userId: 'user_123',
        phone: '+233 24 123 4567',
        dateOfBirth: '1995-06-15',
        age: 29,
        address: '123 Main St, Accra, Ghana',
        occupation: 'Software Developer',
        employer: 'Tech Company Ltd',
        educationLevel: 'bachelor',
        skills: [
          { id: 1, name: 'Health Education', category: 'Education' },
          { id: 2, name: 'Public Speaking', category: 'Communication' },
          { id: 3, name: 'Data Collection', category: 'Administrative' }
        ],
        interests: 'Community health, education, technology for good',
        previousVolunteerExperience: 'Volunteered at local hospital for 2 years',
        motivation: 'Want to make a positive impact in underserved communities',
        availability: 'weekends',
        hoursPerWeek: 10,
        preferredLocation: 'Accra',
        canTravel: true,
        hasTransportation: true,
        backgroundCheckCompleted: false,
        backgroundCheckDate: null,
        backgroundCheckExpiry: null,
        isActive: true,
        totalHoursVolunteered: 156
      };

      setUser(mockUser);
      setUserProfile(mockProfile);

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyToOpportunity = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setCurrentView('apply');
  };

  const handleApplicationComplete = (applicationData) => {
    console.log('Application completed:', applicationData);
    // Here you would typically save the application and redirect
    setCurrentView('dashboard');
    // Show success message
  };

  const handleApplicationCancel = () => {
    setSelectedOpportunity(null);
    setCurrentView('opportunities');
  };

  const handleViewApplication = (applicationId) => {
    setSelectedApplication(applicationId);
    setCurrentView('application');
  };

  const handleBackgroundCheckUpdate = (status) => {
    console.log('Background check status updated:', status);
    // Update user profile or application status
  };

  const renderNavigation = () => (
    <div className="bg-white shadow-sm border-b border-gray-200 mb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              currentView === 'dashboard'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Dashboard
          </button>
          
          <button
            onClick={() => setCurrentView('opportunities')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              currentView === 'opportunities'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Find Opportunities
          </button>
          
          <button
            onClick={() => setCurrentView('applications')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              currentView === 'applications'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Applications
          </button>
          
          <button
            onClick={() => setCurrentView('profile')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              currentView === 'profile'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );

  const renderApplicationsList = () => {
    // Mock applications data
    const applications = [
      {
        id: 'app_1',
        opportunityTitle: 'Health Screening Assistant',
        status: 'approved',
        submittedAt: '2024-10-15T10:00:00Z',
        reviewedAt: '2024-10-18T14:30:00Z'
      },
      {
        id: 'app_2',
        opportunityTitle: 'Community Health Educator',
        status: 'under_review',
        submittedAt: '2024-10-20T09:15:00Z'
      },
      {
        id: 'app_3',
        opportunityTitle: 'Mobile Clinic Assistant',
        status: 'draft',
        submittedAt: null
      }
    ];

    const getStatusColor = (status) => {
      const colors = {
        'draft': 'gray',
        'submitted': 'blue',
        'under_review': 'yellow',
        'approved': 'green',
        'rejected': 'red'
      };
      return colors[status] || 'gray';
    };

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Applications
          </h1>
          <p className="text-gray-600">
            Track the status of your volunteer applications
          </p>
        </div>

        <div className="space-y-6">
          {applications.map((application) => (
            <div key={application.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {application.opportunityTitle}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    {application.submittedAt && (
                      <span>
                        Submitted: {new Date(application.submittedAt).toLocaleDateString()}
                      </span>
                    )}
                    {application.reviewedAt && (
                      <span>
                        Reviewed: {new Date(application.reviewedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <Badge variant={getStatusColor(application.status)}>
                  {application.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>

              <div className="flex justify-end space-x-3">
                {application.status === 'draft' && (
                  <Button
                    variant="primary"
                    onClick={() => {
                      // Continue draft application
                      setSelectedApplication(application.id);
                      setCurrentView('apply');
                    }}
                  >
                    Continue Application
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={() => handleViewApplication(application.id)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}

          {applications.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No Applications Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start by exploring volunteer opportunities and applying to positions that interest you.
              </p>
              <Button
                variant="primary"
                onClick={() => setCurrentView('opportunities')}
              >
                Find Opportunities
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderProfile = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Volunteer Profile
        </h1>
        <p className="text-gray-600">
          Manage your volunteer profile and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={user?.firstName || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={user?.lastName || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={userProfile?.phone || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Skills & Experience
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {userProfile?.skills?.map((skill) => (
                    <Badge key={skill.id} variant="blue">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Volunteer Experience
                </label>
                <textarea
                  value={userProfile?.previousVolunteerExperience || ''}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Availability & Preferences
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  value={userProfile?.availability || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                  <option value="evenings">Evenings</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours per Week
                </label>
                <input
                  type="number"
                  value={userProfile?.hoursPerWeek || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Location
                </label>
                <input
                  type="text"
                  value={userProfile?.preferredLocation || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={userProfile?.canTravel || false}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">I am willing to travel to different locations</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={userProfile?.hasTransportation || false}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">I have reliable transportation</span>
              </label>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Profile Completion
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Basic Info</span>
                <Badge variant="green">Complete</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Skills</span>
                <Badge variant="green">Complete</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Availability</span>
                <Badge variant="green">Complete</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Background Check</span>
                <Badge variant={userProfile?.backgroundCheckCompleted ? 'green' : 'yellow'}>
                  {userProfile?.backgroundCheckCompleted ? 'Complete' : 'Pending'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Background Check Section */}
          <BackgroundCheckIntegration
            applicationId="profile_bg_check"
            required={false}
            onStatusUpdate={handleBackgroundCheckUpdate}
          />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user?.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please Sign In
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be signed in to access the volunteer management system.
          </p>
          <Button variant="primary">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {renderNavigation()}
      
      {currentView === 'dashboard' && (
        <VolunteerDashboard user={user} />
      )}
      
      {currentView === 'opportunities' && (
        <OpportunityMatcher 
          userProfile={userProfile}
          onApply={handleApplyToOpportunity}
        />
      )}
      
      {currentView === 'apply' && selectedOpportunity && (
        <MultiStepApplication
          opportunityId={selectedOpportunity.id}
          onComplete={handleApplicationComplete}
          onCancel={handleApplicationCancel}
        />
      )}
      
      {currentView === 'application' && selectedApplication && (
        <ApplicationStatusTracker
          applicationId={selectedApplication}
          onStatusUpdate={(status) => console.log('Status updated:', status)}
        />
      )}
      
      {currentView === 'applications' && renderApplicationsList()}
      
      {currentView === 'profile' && renderProfile()}
    </div>
  );
};

export default VolunteerManagementPage;