// src/components/volunteer/VolunteerDashboard.jsx

import { useState, useEffect } from 'react';
import Card from '../Card';
import StatCard from '../molecules/StatCard/StatCard';
import ProgressBar from '../atoms/ProgressBar/ProgressBar';
import Badge from '../atoms/Badge/Badge';

const VolunteerDashboard = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [timeLogs, setTimeLogs] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch volunteer profile, applications, assignments, etc.
      // This would connect to the backend API
      
      // Mock data for now
      setProfile({
        totalHours: 156,
        activeAssignments: 2,
        completedAssignments: 5,
        skills: ['Health Education', 'Community Outreach', 'Data Collection'],
        backgroundCheckStatus: 'completed',
        backgroundCheckExpiry: '2025-06-15'
      });

      setApplications([
        {
          id: 1,
          opportunityTitle: 'Health Screening Assistant',
          status: 'approved',
          submittedAt: '2024-10-15',
          reviewedAt: '2024-10-18'
        },
        {
          id: 2,
          opportunityTitle: 'Nutrition Program Coordinator',
          status: 'under_review',
          submittedAt: '2024-10-20'
        }
      ]);

      setAssignments([
        {
          id: 1,
          opportunityTitle: 'Health Screening Assistant',
          status: 'active',
          startDate: '2024-10-20',
          hoursCommitted: 40,
          hoursCompleted: 28,
          supervisor: 'Dr. Sarah Mensah'
        }
      ]);

      setOpportunities([
        {
          id: 1,
          title: 'Community Health Educator',
          matchScore: 95,
          requiredSkills: ['Health Education', 'Public Speaking'],
          location: 'Accra',
          commitment: 'Part-time'
        },
        {
          id: 2,
          title: 'Mobile Clinic Assistant',
          matchScore: 87,
          requiredSkills: ['Healthcare Support', 'Data Collection'],
          location: 'Kumasi',
          commitment: 'Weekend'
        }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'draft': 'gray',
      'submitted': 'blue',
      'under_review': 'yellow',
      'approved': 'green',
      'rejected': 'red',
      'active': 'green',
      'completed': 'blue',
      'paused': 'yellow'
    };
    return colors[status] || 'gray';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || 'Volunteer'}!
          </h1>
          <p className="text-gray-600">
            Track your volunteer journey and discover new opportunities
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Hours"
            value={profile?.totalHours || 0}
            subtitle="volunteered"
            icon="⏰"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Active Assignments"
            value={profile?.activeAssignments || 0}
            subtitle="ongoing"
            icon="📋"
          />
          <StatCard
            title="Completed Projects"
            value={profile?.completedAssignments || 0}
            subtitle="finished"
            icon="✅"
          />
          <StatCard
            title="Skills Developed"
            value={profile?.skills?.length || 0}
            subtitle="areas"
            icon="🎯"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Assignments */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Current Assignments
              </h2>
              {assignments.length > 0 ? (
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {assignment.opportunityTitle}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Supervisor: {assignment.supervisor}
                          </p>
                        </div>
                        <Badge variant={getStatusColor(assignment.status)}>
                          {assignment.status}
                        </Badge>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{assignment.hoursCompleted}/{assignment.hoursCommitted} hours</span>
                        </div>
                        <ProgressBar 
                          progress={(assignment.hoursCompleted / assignment.hoursCommitted) * 100}
                          className="h-2"
                        />
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Started: {new Date(assignment.startDate).toLocaleDateString()}</span>
                        <button className="text-blue-600 hover:text-blue-800">
                          Log Hours
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No active assignments. Apply for opportunities to get started!
                </p>
              )}
            </div>

            {/* Application Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Application Status
              </h2>
              {applications.length > 0 ? (
                <div className="space-y-4">
                  {applications.map((application) => (
                    <div key={application.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {application.opportunityTitle}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Submitted: {new Date(application.submittedAt).toLocaleDateString()}
                          {application.reviewedAt && (
                            <span> • Reviewed: {new Date(application.reviewedAt).toLocaleDateString()}</span>
                          )}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(application.status)}>
                        {application.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No applications yet. Browse opportunities to apply!
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Profile Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Profile Complete</span>
                  <Badge variant="green">✓</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Background Check</span>
                  <Badge variant={profile?.backgroundCheckStatus === 'completed' ? 'green' : 'yellow'}>
                    {profile?.backgroundCheckStatus === 'completed' ? '✓' : 'Pending'}
                  </Badge>
                </div>
                {profile?.backgroundCheckExpiry && (
                  <p className="text-xs text-gray-500">
                    Expires: {new Date(profile.backgroundCheckExpiry).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile?.skills?.map((skill, index) => (
                  <Badge key={index} variant="blue">
                    {skill}
                  </Badge>
                ))}
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm mt-3">
                + Add Skills
              </button>
            </div>

            {/* Recommended Opportunities */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recommended for You
              </h3>
              <div className="space-y-4">
                {opportunities.slice(0, 2).map((opportunity) => (
                  <div key={opportunity.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {opportunity.title}
                      </h4>
                      <Badge variant="green" className="text-xs">
                        {opportunity.matchScore}% match
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {opportunity.location} • {opportunity.commitment}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {opportunity.requiredSkills.map((skill, index) => (
                        <Badge key={index} variant="gray" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;