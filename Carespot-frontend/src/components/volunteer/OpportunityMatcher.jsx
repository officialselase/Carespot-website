// src/components/volunteer/OpportunityMatcher.jsx

import { useState, useEffect } from 'react';
import Badge from '../atoms/Badge/Badge';
import Button from '../atoms/Button/Button';
import Card from '../Card';
import ProgressBar from '../atoms/ProgressBar/ProgressBar';

const OpportunityMatcher = ({ userProfile, onApply }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [filters, setFilters] = useState({
    commitmentType: '',
    location: '',
    timeCommitment: '',
    skillMatch: 'all',
    minMatchScore: 0
  });
  const [sortBy, setSortBy] = useState('match_score');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [opportunities, filters, sortBy]);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      
      // Mock API call - replace with actual API endpoint
      const mockOpportunities = [
        {
          id: 1,
          title: 'Community Health Educator',
          slug: 'community-health-educator',
          shortDescription: 'Lead health education workshops in rural communities',
          description: 'Join our team to deliver essential health education programs in underserved rural communities. You will facilitate workshops on disease prevention, nutrition, and basic healthcare practices.',
          commitmentType: 'long_term',
          timeCommitment: 'part_time',
          startDate: '2024-11-15',
          endDate: '2025-05-15',
          location: 'Accra Region',
          isRemote: false,
          positionsAvailable: 3,
          positionsFilled: 1,
          requiredSkills: [
            { id: 1, name: 'Health Education', category: 'Education' },
            { id: 2, name: 'Public Speaking', category: 'Communication' }
          ],
          preferredSkills: [
            { id: 3, name: 'Community Outreach', category: 'Outreach' },
            { id: 4, name: 'Local Language', category: 'Communication' }
          ],
          minimumAge: 21,
          backgroundCheckRequired: false,
          featuredImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          contactPerson: 'Dr. Sarah Mensah',
          contactEmail: 'sarah@carespot.org',
          matchScore: 95,
          matchReasons: [
            'Your Health Education skill is a perfect match',
            'Your Public Speaking experience aligns well',
            'Location preference matches',
            'Availability aligns with time commitment'
          ]
        },
        {
          id: 2,
          title: 'Mobile Clinic Assistant',
          slug: 'mobile-clinic-assistant',
          shortDescription: 'Support mobile healthcare services in remote areas',
          description: 'Assist our mobile clinic team in providing healthcare services to remote communities. Responsibilities include patient registration, basic health screenings, and data collection.',
          commitmentType: 'short_term',
          timeCommitment: 'weekend',
          startDate: '2024-11-01',
          endDate: '2024-12-31',
          location: 'Multiple Regions',
          isRemote: false,
          positionsAvailable: 5,
          positionsFilled: 2,
          requiredSkills: [
            { id: 5, name: 'Healthcare Support', category: 'Medical' },
            { id: 6, name: 'Data Collection', category: 'Administrative' }
          ],
          preferredSkills: [
            { id: 7, name: 'Patient Care', category: 'Medical' },
            { id: 8, name: 'Record Keeping', category: 'Administrative' }
          ],
          minimumAge: 18,
          backgroundCheckRequired: true,
          featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          contactPerson: 'Nurse Grace Osei',
          contactEmail: 'grace@carespot.org',
          matchScore: 87,
          matchReasons: [
            'Your Healthcare Support skill matches requirements',
            'Weekend availability aligns perfectly',
            'Previous volunteer experience is relevant',
            'Willing to travel matches multi-region requirement'
          ]
        },
        {
          id: 3,
          title: 'Digital Health Content Creator',
          slug: 'digital-health-content-creator',
          shortDescription: 'Create engaging health education content for social media',
          description: 'Help us create compelling digital content to spread health awareness through social media platforms. Create infographics, videos, and written content about health topics.',
          commitmentType: 'ongoing',
          timeCommitment: 'flexible',
          startDate: '2024-11-01',
          endDate: null,
          location: 'Remote',
          isRemote: true,
          positionsAvailable: 2,
          positionsFilled: 0,
          requiredSkills: [
            { id: 9, name: 'Content Creation', category: 'Digital' },
            { id: 10, name: 'Social Media', category: 'Digital' }
          ],
          preferredSkills: [
            { id: 11, name: 'Graphic Design', category: 'Creative' },
            { id: 12, name: 'Video Editing', category: 'Creative' }
          ],
          minimumAge: 18,
          backgroundCheckRequired: false,
          featuredImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          contactPerson: 'Mark Asante',
          contactEmail: 'mark@carespot.org',
          matchScore: 72,
          matchReasons: [
            'Remote work preference matches',
            'Flexible schedule aligns with availability',
            'Creative skills could be valuable',
            'No background check required'
          ]
        },
        {
          id: 4,
          title: 'Nutrition Program Coordinator',
          slug: 'nutrition-program-coordinator',
          shortDescription: 'Coordinate nutrition education and food distribution programs',
          description: 'Lead our nutrition programs including meal planning workshops, nutritional counseling, and food distribution coordination for vulnerable families.',
          commitmentType: 'long_term',
          timeCommitment: 'part_time',
          startDate: '2024-12-01',
          endDate: '2025-06-01',
          location: 'Kumasi',
          isRemote: false,
          positionsAvailable: 2,
          positionsFilled: 0,
          requiredSkills: [
            { id: 13, name: 'Nutrition Knowledge', category: 'Health' },
            { id: 14, name: 'Program Management', category: 'Administrative' }
          ],
          preferredSkills: [
            { id: 15, name: 'Counseling', category: 'Support' },
            { id: 16, name: 'Community Engagement', category: 'Outreach' }
          ],
          minimumAge: 23,
          backgroundCheckRequired: true,
          featuredImage: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          contactPerson: 'Dr. Kwame Nkrumah',
          contactEmail: 'kwame@carespot.org',
          matchScore: 65,
          matchReasons: [
            'Part-time commitment matches availability',
            'Long-term commitment aligns with preferences',
            'Administrative skills could transfer well'
          ]
        }
      ];

      // Calculate match scores based on user profile
      const opportunitiesWithScores = mockOpportunities.map(opp => ({
        ...opp,
        matchScore: calculateMatchScore(opp, userProfile),
        matchReasons: generateMatchReasons(opp, userProfile)
      }));

      setOpportunities(opportunitiesWithScores);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateMatchScore = (opportunity, profile) => {
    if (!profile) return 50; // Default score if no profile

    let score = 0;
    let factors = 0;

    // Skill matching (40% weight)
    if (profile.skills && profile.skills.length > 0) {
      const requiredSkillIds = opportunity.requiredSkills.map(s => s.id);
      const preferredSkillIds = opportunity.preferredSkills.map(s => s.id);
      const userSkillIds = profile.skills.map(s => s.id);

      const requiredMatches = requiredSkillIds.filter(id => userSkillIds.includes(id)).length;
      const preferredMatches = preferredSkillIds.filter(id => userSkillIds.includes(id)).length;

      const skillScore = (
        (requiredMatches / Math.max(requiredSkillIds.length, 1)) * 30 +
        (preferredMatches / Math.max(preferredSkillIds.length, 1)) * 10
      );
      score += skillScore;
      factors += 40;
    }

    // Availability matching (25% weight)
    if (profile.availability && profile.timeCommitment) {
      const availabilityMatch = matchAvailability(opportunity.timeCommitment, profile.availability);
      score += availabilityMatch * 25;
      factors += 25;
    }

    // Location matching (20% weight)
    if (profile.preferredLocation || profile.canTravel) {
      const locationMatch = matchLocation(opportunity, profile);
      score += locationMatch * 20;
      factors += 20;
    }

    // Age requirement (10% weight)
    if (profile.age) {
      const ageMatch = profile.age >= opportunity.minimumAge ? 1 : 0;
      score += ageMatch * 10;
      factors += 10;
    }

    // Background check (5% weight)
    if (opportunity.backgroundCheckRequired) {
      const backgroundMatch = profile.backgroundCheckCompleted ? 1 : 0.5;
      score += backgroundMatch * 5;
      factors += 5;
    }

    return Math.min(100, Math.round(score * 100 / factors));
  };

  const matchAvailability = (oppTimeCommitment, userAvailability) => {
    const matches = {
      'flexible': { 'flexible': 1, 'weekdays': 0.8, 'weekends': 0.8, 'evenings': 0.8 },
      'part_time': { 'flexible': 0.9, 'weekdays': 1, 'weekends': 0.7, 'evenings': 0.8 },
      'full_time': { 'flexible': 0.8, 'weekdays': 1, 'weekends': 0.3, 'evenings': 0.3 },
      'weekend': { 'flexible': 0.8, 'weekdays': 0.2, 'weekends': 1, 'evenings': 0.5 },
      'evening': { 'flexible': 0.8, 'weekdays': 0.7, 'weekends': 0.6, 'evenings': 1 }
    };
    
    return matches[oppTimeCommitment]?.[userAvailability] || 0.5;
  };

  const matchLocation = (opportunity, profile) => {
    if (opportunity.isRemote) return 1;
    if (profile.canTravel) return 0.9;
    if (profile.preferredLocation && opportunity.location.includes(profile.preferredLocation)) return 1;
    return 0.6;
  };

  const generateMatchReasons = (opportunity, profile) => {
    const reasons = [];
    
    if (!profile) return ['Profile information needed for better matching'];

    // Skill matches
    if (profile.skills) {
      const requiredSkillNames = opportunity.requiredSkills.map(s => s.name);
      const userSkillNames = profile.skills.map(s => s.name);
      const matchingSkills = requiredSkillNames.filter(skill => userSkillNames.includes(skill));
      
      matchingSkills.forEach(skill => {
        reasons.push(`Your ${skill} skill is a perfect match`);
      });
    }

    // Availability match
    if (profile.availability) {
      const availabilityScore = matchAvailability(opportunity.timeCommitment, profile.availability);
      if (availabilityScore > 0.8) {
        reasons.push('Your availability aligns well with this opportunity');
      }
    }

    // Location match
    if (opportunity.isRemote && profile.preferredLocation === 'remote') {
      reasons.push('Remote work preference matches perfectly');
    } else if (profile.canTravel) {
      reasons.push('Your willingness to travel is valuable for this role');
    }

    // Experience match
    if (profile.previousVolunteerExperience) {
      reasons.push('Your volunteer experience is relevant');
    }

    return reasons.length > 0 ? reasons : ['This opportunity could be a good fit for you'];
  };

  const applyFiltersAndSort = () => {
    let filtered = [...opportunities];

    // Apply filters
    if (filters.commitmentType) {
      filtered = filtered.filter(opp => opp.commitmentType === filters.commitmentType);
    }

    if (filters.location) {
      filtered = filtered.filter(opp => 
        opp.location.toLowerCase().includes(filters.location.toLowerCase()) || 
        (filters.location.toLowerCase() === 'remote' && opp.isRemote)
      );
    }

    if (filters.timeCommitment) {
      filtered = filtered.filter(opp => opp.timeCommitment === filters.timeCommitment);
    }

    if (filters.minMatchScore > 0) {
      filtered = filtered.filter(opp => opp.matchScore >= filters.minMatchScore);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'match_score':
          return b.matchScore - a.matchScore;
        case 'start_date':
          return new Date(a.startDate) - new Date(b.startDate);
        case 'positions_available':
          return (b.positionsAvailable - b.positionsFilled) - (a.positionsAvailable - a.positionsFilled);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return b.matchScore - a.matchScore;
      }
    });

    setFilteredOpportunities(filtered);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      commitmentType: '',
      location: '',
      timeCommitment: '',
      skillMatch: 'all',
      minMatchScore: 0
    });
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'green';
    if (score >= 75) return 'blue';
    if (score >= 60) return 'yellow';
    return 'gray';
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Recommended Opportunities
        </h1>
        <p className="text-gray-600">
          Opportunities matched to your skills, availability, and preferences
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Filter & Sort
          </h2>
          <button
            onClick={clearFilters}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Clear All Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commitment Type
            </label>
            <select
              value={filters.commitmentType}
              onChange={(e) => handleFilterChange('commitmentType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="one_time">One-time</option>
              <option value="short_term">Short-term</option>
              <option value="long_term">Long-term</option>
              <option value="ongoing">Ongoing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Commitment
            </label>
            <select
              value={filters.timeCommitment}
              onChange={(e) => handleFilterChange('timeCommitment', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Schedules</option>
              <option value="flexible">Flexible</option>
              <option value="part_time">Part-time</option>
              <option value="full_time">Full-time</option>
              <option value="weekend">Weekend</option>
              <option value="evening">Evening</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              placeholder="City or 'remote'"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="match_score">Best Match</option>
              <option value="start_date">Start Date</option>
              <option value="positions_available">Positions Available</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Match Score: {filters.minMatchScore}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={filters.minMatchScore}
            onChange={(e) => handleFilterChange('minMatchScore', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredOpportunities.length} of {opportunities.length} opportunities
        </p>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredOpportunities.map((opportunity) => (
          <div key={opportunity.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Image */}
            <div className="h-48 bg-gray-200 relative">
              <img
                src={opportunity.featuredImage}
                alt={opportunity.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge variant={getMatchScoreColor(opportunity.matchScore)}>
                  {opportunity.matchScore}% match
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {opportunity.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {opportunity.shortDescription}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="blue">{opportunity.commitmentType.replace('_', ' ')}</Badge>
                  <Badge variant="purple">{opportunity.timeCommitment.replace('_', ' ')}</Badge>
                  {opportunity.isRemote && <Badge variant="green">Remote</Badge>}
                </div>
              </div>

              {/* Match Reasons */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Why this matches:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {opportunity.matchReasons.slice(0, 3).map((reason, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Details */}
              <div className="mb-4 text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">Location:</span> {opportunity.location}</p>
                <p><span className="font-medium">Start Date:</span> {new Date(opportunity.startDate).toLocaleDateString()}</p>
                <p><span className="font-medium">Positions:</span> {opportunity.positionsAvailable - opportunity.positionsFilled} available</p>
                <p><span className="font-medium">Contact:</span> {opportunity.contactPerson}</p>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Required Skills:</h4>
                <div className="flex flex-wrap gap-1">
                  {opportunity.requiredSkills.map((skill) => (
                    <Badge key={skill.id} variant="gray" className="text-xs">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => onApply && onApply(opportunity)}
                >
                  Apply Now
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    // View details functionality
                    console.log('View details for:', opportunity.id);
                  }}
                >
                  Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredOpportunities.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No opportunities match your filters
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or clearing them to see more opportunities
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default OpportunityMatcher;