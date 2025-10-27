// src/components/community/EmailCampaignManager.jsx

import { useState, useEffect } from 'react';
import Button from '../atoms/Button/Button.jsx';
import Input from '../atoms/Input/Input.jsx';
import Badge from '../atoms/Badge/Badge.jsx';
import Icon from '../atoms/Icon/Icon.jsx';
import Toast from '../atoms/Toast/Toast.jsx';

const EmailCampaignManager = ({ className = '' }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    subject: '',
    content: '',
    segments: [],
    scheduledDate: '',
    type: 'newsletter'
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockCampaigns = [
      {
        id: 1,
        name: 'Monthly Impact Report - October 2024',
        subject: 'See How Your Support Changed Lives This Month',
        type: 'newsletter',
        status: 'sent',
        sentDate: '2024-10-25T10:00:00Z',
        recipients: 1247,
        openRate: 68.5,
        clickRate: 12.3,
        segments: ['all-subscribers']
      },
      {
        id: 2,
        name: 'Volunteer Appreciation Week',
        subject: 'Thank You for Your Incredible Dedication',
        type: 'appreciation',
        status: 'scheduled',
        scheduledDate: '2024-11-01T09:00:00Z',
        recipients: 342,
        segments: ['volunteers']
      },
      {
        id: 3,
        name: 'Emergency Fundraising - Medical Supplies',
        subject: 'Urgent: Help Us Reach Communities in Need',
        type: 'fundraising',
        status: 'draft',
        recipients: 0,
        segments: ['donors', 'high-engagement']
      }
    ];

    const mockSubscribers = [
      {
        segment: 'all-subscribers',
        count: 1247,
        description: 'All newsletter subscribers'
      },
      {
        segment: 'volunteers',
        count: 342,
        description: 'Active and past volunteers'
      },
      {
        segment: 'donors',
        count: 589,
        description: 'People who have donated'
      },
      {
        segment: 'high-engagement',
        count: 234,
        description: 'Highly engaged subscribers (>50% open rate)'
      },
      {
        segment: 'health-programs',
        count: 456,
        description: 'Interested in health programs'
      },
      {
        segment: 'volunteer-opportunities',
        count: 678,
        description: 'Interested in volunteer opportunities'
      }
    ];

    setTimeout(() => {
      setCampaigns(mockCampaigns);
      setSubscribers(mockSubscribers);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'success';
      case 'scheduled': return 'warning';
      case 'draft': return 'secondary';
      case 'sending': return 'primary';
      default: return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    
    if (!newCampaign.name || !newCampaign.subject || !newCampaign.content) {
      setToastMessage('Please fill in all required fields');
      setToastType('error');
      setShowToast(true);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const campaign = {
        ...newCampaign,
        id: Date.now(),
        status: 'draft',
        recipients: newCampaign.segments.reduce((total, segment) => {
          const sub = subscribers.find(s => s.segment === segment);
          return total + (sub ? sub.count : 0);
        }, 0),
        createdAt: new Date().toISOString()
      };

      setCampaigns(prev => [campaign, ...prev]);
      setNewCampaign({
        name: '',
        subject: '',
        content: '',
        segments: [],
        scheduledDate: '',
        type: 'newsletter'
      });
      setShowNewCampaign(false);
      
      setToastMessage('Campaign created successfully!');
      setToastType('success');
      setShowToast(true);
      
    } catch (error) {
      setToastMessage('Failed to create campaign. Please try again.');
      setToastType('error');
      setShowToast(true);
    }
  };

  const handleSegmentToggle = (segment) => {
    setNewCampaign(prev => ({
      ...prev,
      segments: prev.segments.includes(segment)
        ? prev.segments.filter(s => s !== segment)
        : [...prev.segments, segment]
    }));
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900">Email Campaigns</h3>
          <Button
            onClick={() => setShowNewCampaign(true)}
            variant="primary"
            className="flex items-center gap-2"
          >
            <Icon name="plus" size="sm" />
            New Campaign
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {subscribers.find(s => s.segment === 'all-subscribers')?.count || 0}
            </div>
            <div className="text-sm text-blue-800">Total Subscribers</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {campaigns.filter(c => c.status === 'sent').length}
            </div>
            <div className="text-sm text-green-800">Campaigns Sent</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {campaigns.filter(c => c.openRate).reduce((avg, c) => avg + c.openRate, 0) / 
               campaigns.filter(c => c.openRate).length || 0}%
            </div>
            <div className="text-sm text-yellow-800">Avg Open Rate</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {campaigns.filter(c => c.clickRate).reduce((avg, c) => avg + c.clickRate, 0) / 
               campaigns.filter(c => c.clickRate).length || 0}%
            </div>
            <div className="text-sm text-purple-800">Avg Click Rate</div>
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="divide-y divide-gray-200">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => setSelectedCampaign(campaign)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {campaign.name}
                  </h4>
                  <Badge variant={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                </div>
                
                <p className="text-gray-600 mb-3">{campaign.subject}</p>
                
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Icon name="users" size="sm" />
                    {campaign.recipients} recipients
                  </span>
                  
                  {campaign.sentDate && (
                    <span className="flex items-center gap-1">
                      <Icon name="calendar" size="sm" />
                      Sent {formatDate(campaign.sentDate)}
                    </span>
                  )}
                  
                  {campaign.scheduledDate && (
                    <span className="flex items-center gap-1">
                      <Icon name="clock" size="sm" />
                      Scheduled {formatDate(campaign.scheduledDate)}
                    </span>
                  )}
                </div>
              </div>
              
              {campaign.openRate && (
                <div className="text-right">
                  <div className="text-lg font-semibold text-green-600">
                    {campaign.openRate}%
                  </div>
                  <div className="text-sm text-gray-500">Open Rate</div>
                  {campaign.clickRate && (
                    <>
                      <div className="text-lg font-semibold text-blue-600 mt-1">
                        {campaign.clickRate}%
                      </div>
                      <div className="text-sm text-gray-500">Click Rate</div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Campaign Modal */}
      {showNewCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Create New Campaign</h3>
                <button
                  onClick={() => setShowNewCampaign(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Icon name="x" size="md" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleCreateCampaign} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Name *
                </label>
                <Input
                  type="text"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Monthly Newsletter - November 2024"
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Subject *
                </label>
                <Input
                  type="text"
                  value={newCampaign.subject}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Your Impact This Month: Lives Changed Through Your Support"
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Type
                </label>
                <select
                  value={newCampaign.type}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="newsletter">Newsletter</option>
                  <option value="fundraising">Fundraising</option>
                  <option value="appreciation">Appreciation</option>
                  <option value="announcement">Announcement</option>
                  <option value="volunteer-recruitment">Volunteer Recruitment</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Target Segments *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {subscribers.map((subscriber) => (
                    <label
                      key={subscriber.segment}
                      className={`flex items-start p-3 rounded-lg border cursor-pointer transition-colors ${
                        newCampaign.segments.includes(subscriber.segment)
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={newCampaign.segments.includes(subscriber.segment)}
                        onChange={() => handleSegmentToggle(subscriber.segment)}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {subscriber.segment.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </div>
                        <div className="text-sm text-gray-600">{subscriber.description}</div>
                        <div className="text-sm font-medium text-blue-600">{subscriber.count} subscribers</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Content *
                </label>
                <textarea
                  value={newCampaign.content}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your email content here..."
                  rows="8"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-vertical"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule Date (Optional)
                </label>
                <Input
                  type="datetime-local"
                  value={newCampaign.scheduledDate}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  className="w-full"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Leave empty to save as draft
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => setShowNewCampaign(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                >
                  Create Campaign
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default EmailCampaignManager;