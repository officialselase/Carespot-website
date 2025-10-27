// src/components/community/CommunityForum.jsx

import { useState, useEffect } from 'react';
import Button from '../atoms/Button/Button.jsx';
import Input from '../atoms/Input/Input.jsx';
import Avatar from '../atoms/Avatar/Avatar.jsx';
import Badge from '../atoms/Badge/Badge.jsx';
import Icon from '../atoms/Icon/Icon.jsx';

const CommunityForum = ({ className = '' }) => {
  const [discussions, setDiscussions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockCategories = [
      { id: 'all', name: 'All Discussions', count: 45, color: 'gray' },
      { id: 'health-programs', name: 'Health Programs', count: 12, color: 'blue' },
      { id: 'volunteer-support', name: 'Volunteer Support', count: 8, color: 'green' },
      { id: 'community-stories', name: 'Community Stories', count: 15, color: 'purple' },
      { id: 'fundraising', name: 'Fundraising Ideas', count: 6, color: 'red' },
      { id: 'general', name: 'General Discussion', count: 4, color: 'yellow' }
    ];

    const mockDiscussions = [
      {
        id: 1,
        title: 'Best practices for community health screenings',
        content: 'I\'ve been organizing health screenings in rural communities and wanted to share some insights...',
        author: {
          name: 'Dr. Kwame Asante',
          avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
          role: 'Medical Volunteer',
          badge: 'Expert'
        },
        category: 'health-programs',
        createdAt: '2024-10-25T10:30:00Z',
        updatedAt: '2024-10-25T14:20:00Z',
        replies: 8,
        likes: 15,
        views: 124,
        isPinned: true,
        tags: ['health-screening', 'rural-communities', 'best-practices']
      },
      {
        id: 2,
        title: 'Volunteer orientation feedback and suggestions',
        content: 'Just completed the volunteer orientation program. Here are some thoughts on how we could improve...',
        author: {
          name: 'Grace Osei',
          avatar: 'https://images.unsplash.com/photo-1594824388853-d0c2d8e8b6b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
          role: 'New Volunteer',
          badge: 'Active'
        },
        category: 'volunteer-support',
        createdAt: '2024-10-24T16:45:00Z',
        updatedAt: '2024-10-25T09:15:00Z',
        replies: 12,
        likes: 23,
        views: 89,
        isPinned: false,
        tags: ['orientation', 'feedback', 'volunteer-experience']
      },
      {
        id: 3,
        title: 'Success story: Mobile clinic impact in Tema',
        content: 'Wanted to share the incredible results from our mobile clinic program in Tema community...',
        author: {
          name: 'Samuel Mensah',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
          role: 'Program Coordinator',
          badge: 'Staff'
        },
        category: 'community-stories',
        createdAt: '2024-10-23T11:20:00Z',
        updatedAt: '2024-10-24T08:30:00Z',
        replies: 6,
        likes: 31,
        views: 156,
        isPinned: false,
        tags: ['mobile-clinic', 'tema', 'success-story', 'impact']
      }
    ];

    setTimeout(() => {
      setCategories(mockCategories);
      setDiscussions(mockDiscussions);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory;
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      case 'popular':
        return (b.likes + b.replies) - (a.likes + a.replies);
      case 'most-replies':
        return b.replies - a.replies;
      default:
        return 0;
    }
  });

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const getBadgeVariant = (badge) => {
    switch (badge) {
      case 'Expert': return 'success';
      case 'Staff': return 'primary';
      case 'Active': return 'warning';
      default: return 'secondary';
    }
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
          <h3 className="text-2xl font-bold text-gray-900">Community Forum</h3>
          <Button
            onClick={() => setShowNewDiscussion(true)}
            variant="primary"
            className="flex items-center gap-2"
          >
            <Icon name="plus" size="sm" />
            New Discussion
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search discussions..."
              className="w-full"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="most-replies">Most Replies</option>
          </select>
        </div>
      </div>

      <div className="flex">
        {/* Categories Sidebar */}
        <div className="w-64 p-6 border-r border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="font-medium">{category.name}</span>
                <Badge variant={category.color} size="sm">
                  {category.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Discussions List */}
        <div className="flex-1">
          {sortedDiscussions.length === 0 ? (
            <div className="p-12 text-center">
              <Icon name="message-circle" size="lg" className="mx-auto mb-4 text-gray-400" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No discussions found</h4>
              <p className="text-gray-600 mb-4">
                {searchQuery ? 'Try adjusting your search terms' : 'Be the first to start a discussion!'}
              </p>
              <Button
                onClick={() => setShowNewDiscussion(true)}
                variant="primary"
              >
                Start Discussion
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {sortedDiscussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <Avatar
                      src={discussion.author.avatar}
                      alt={discussion.author.name}
                      size="md"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {discussion.isPinned && (
                          <Icon name="pin" size="sm" className="text-red-500" />
                        )}
                        <h4 className="text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors">
                          {discussion.title}
                        </h4>
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {discussion.content}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {discussion.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" size="sm">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <strong>{discussion.author.name}</strong>
                            <Badge variant={getBadgeVariant(discussion.author.badge)} size="sm">
                              {discussion.author.badge}
                            </Badge>
                          </span>
                          <span>{formatTimeAgo(discussion.updatedAt)}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Icon name="message-circle" size="sm" />
                            {discussion.replies}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="heart" size="sm" />
                            {discussion.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="eye" size="sm" />
                            {discussion.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* New Discussion Modal (placeholder) */}
      {showNewDiscussion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Start New Discussion</h3>
                <button
                  onClick={() => setShowNewDiscussion(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Icon name="x" size="md" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                This feature is coming soon! For now, you can share your thoughts and stories 
                using our content submission form.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowNewDiscussion(false)}
                  variant="outline"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setShowNewDiscussion(false);
                    // Navigate to content submission
                  }}
                  variant="primary"
                >
                  Share Your Story Instead
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityForum;