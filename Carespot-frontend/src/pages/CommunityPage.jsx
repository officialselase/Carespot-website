// src/pages/CommunityPage.jsx

import { useState } from 'react';
import Hero from '../components/Hero.jsx';
import Section from '../components/Section.jsx';
import Button from '../components/atoms/Button/Button.jsx';
import Icon from '../components/atoms/Icon/Icon.jsx';
import { 
  NewsletterSubscription, 
  SocialShare, 
  ContentSubmission, 
  CommunityForum,
  EmailCampaignManager 
} from '../components/community/index.js';

const CommunityPage = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = useState('forum');

  const tabs = [
    { id: 'forum', label: 'Community Forum', icon: 'message-circle' },
    { id: 'share-story', label: 'Share Your Story', icon: 'edit' },
    { id: 'newsletter', label: 'Newsletter', icon: 'mail' },
    { id: 'social', label: 'Social Sharing', icon: 'share-2' }
  ];

  const communityStats = [
    { label: 'Active Members', value: '1,247', icon: 'users', color: 'text-blue-600' },
    { label: 'Stories Shared', value: '89', icon: 'book-open', color: 'text-green-600' },
    { label: 'Discussions', value: '156', icon: 'message-circle', color: 'text-purple-600' },
    { label: 'Newsletter Subscribers', value: '2,341', icon: 'mail', color: 'text-red-600' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'forum':
        return <CommunityForum className="mt-8" />;
      case 'share-story':
        return <ContentSubmission className="mt-8" />;
      case 'newsletter':
        return (
          <div className="mt-8 max-w-2xl mx-auto">
            <NewsletterSubscription 
              variant="default" 
              showSegmentation={true}
              className="mb-8"
            />
            {/* Admin view for email campaigns - would be restricted to admin users */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Campaign Management</h3>
              <p className="text-gray-600 mb-4">
                This section is available for administrators to manage email campaigns.
              </p>
              <EmailCampaignManager />
            </div>
          </div>
        );
      case 'social':
        return (
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Help Spread the Word
              </h3>
              <p className="text-gray-600 mb-6">
                Share CareSpot's mission and impact with your network. Every share helps us reach more people who can make a difference.
              </p>
              <SocialShare 
                title="CareSpot Initiative - Transforming Lives Through Healthcare"
                description="Join us in our mission to provide healthcare access and education to underserved communities in Ghana and beyond."
                hashtags={['CareSpot', 'HealthcareForAll', 'CompassionInAction', 'Ghana', 'NGO']}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-color-bg-primary">
      {/* Hero Section */}
      <Hero
        title="Join Our Community"
        subtitle="Connect, Share, and Make a Difference Together"
        description="Be part of a vibrant community of volunteers, donors, and advocates working together to transform lives through healthcare access and education."
        backgroundImage="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        primaryAction={{
          text: "Join the Discussion",
          onClick: () => setActiveTab('forum')
        }}
        secondaryAction={{
          text: "Share Your Story",
          onClick: () => setActiveTab('share-story')
        }}
      />

      {/* Community Stats */}
      <Section
        title="Our Growing Community"
        subtitle="Together We're Making an Impact"
        backgroundColor="bg-white"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {communityStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4`}>
                <Icon name={stat.icon} size="lg" className={stat.color} />
              </div>
              <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Community Features */}
      <Section
        title="Ways to Engage"
        subtitle="Choose How You Want to Connect"
        backgroundColor="bg-color-bg-secondary"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="message-circle" size="lg" className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Community Forum</h3>
            <p className="text-gray-600 mb-4">
              Join discussions, ask questions, and share insights with fellow community members.
            </p>
            <Button
              onClick={() => setActiveTab('forum')}
              variant={activeTab === 'forum' ? 'primary' : 'outline'}
              className="w-full"
            >
              Join Discussion
            </Button>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="edit" size="lg" className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Share Your Story</h3>
            <p className="text-gray-600 mb-4">
              Tell us how CareSpot has impacted your life or community. Your story matters.
            </p>
            <Button
              onClick={() => setActiveTab('share-story')}
              variant={activeTab === 'share-story' ? 'primary' : 'outline'}
              className="w-full"
            >
              Share Story
            </Button>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="mail" size="lg" className="text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Stay updated with our latest programs, impact stories, and volunteer opportunities.
            </p>
            <Button
              onClick={() => setActiveTab('newsletter')}
              variant={activeTab === 'newsletter' ? 'primary' : 'outline'}
              className="w-full"
            >
              Subscribe
            </Button>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="share-2" size="lg" className="text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Social Sharing</h3>
            <p className="text-gray-600 mb-4">
              Help spread awareness by sharing our mission and impact with your network.
            </p>
            <Button
              onClick={() => setActiveTab('social')}
              variant={activeTab === 'social' ? 'primary' : 'outline'}
              className="w-full"
            >
              Share Now
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon name={tab.icon} size="sm" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </Section>

      {/* Community Guidelines */}
      <Section
        title="Community Guidelines"
        subtitle="Creating a Safe and Supportive Environment"
        backgroundColor="bg-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-4">Our Values</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Icon name="heart" size="sm" className="text-red-500 mt-1 mr-3" />
                <span>Treat everyone with respect and compassion</span>
              </li>
              <li className="flex items-start">
                <Icon name="shield" size="sm" className="text-blue-500 mt-1 mr-3" />
                <span>Maintain privacy and confidentiality</span>
              </li>
              <li className="flex items-start">
                <Icon name="users" size="sm" className="text-green-500 mt-1 mr-3" />
                <span>Foster inclusive and supportive discussions</span>
              </li>
              <li className="flex items-start">
                <Icon name="check-circle" size="sm" className="text-purple-500 mt-1 mr-3" />
                <span>Share accurate and helpful information</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-4">What We Don't Allow</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Icon name="x-circle" size="sm" className="text-red-500 mt-1 mr-3" />
                <span>Harassment, discrimination, or hate speech</span>
              </li>
              <li className="flex items-start">
                <Icon name="x-circle" size="sm" className="text-red-500 mt-1 mr-3" />
                <span>Spam, promotional content, or solicitation</span>
              </li>
              <li className="flex items-start">
                <Icon name="x-circle" size="sm" className="text-red-500 mt-1 mr-3" />
                <span>Sharing personal medical advice</span>
              </li>
              <li className="flex items-start">
                <Icon name="x-circle" size="sm" className="text-red-500 mt-1 mr-3" />
                <span>Off-topic or disruptive content</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <p className="text-blue-800 text-center">
            <strong>Questions or concerns?</strong> Contact our community moderators at{' '}
            <a href="mailto:community@carespot.org" className="underline">
              community@carespot.org
            </a>
          </p>
        </div>
      </Section>

      {/* Call to Action */}
      <Section
        title="Ready to Get Involved?"
        subtitle="Your Voice Matters in Our Community"
        backgroundColor="bg-gradient-to-r from-red-600 to-blue-600"
        textColor="text-white"
      >
        <div className="text-center">
          <p className="text-xl text-white mb-8 opacity-90">
            Whether you're sharing your story, joining discussions, or spreading awareness, 
            every contribution helps us build a stronger community dedicated to transforming lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigateTo("Volunteer")}
              variant="secondary"
              className="bg-white text-red-600 hover:bg-gray-100"
            >
              Become a Volunteer
            </Button>
            <Button
              onClick={() => navigateTo("Donate")}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-600"
            >
              Support Our Mission
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default CommunityPage;