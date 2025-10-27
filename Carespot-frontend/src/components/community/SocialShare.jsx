// src/components/community/SocialShare.jsx

import { useState } from 'react';
import Button from '../atoms/Button/Button.jsx';
import Icon from '../atoms/Icon/Icon.jsx';

const SocialShare = ({ 
  url = window.location.href,
  title = 'CareSpot Initiative - Compassion in Action',
  description = 'Join us in transforming lives through healthcare access and education',
  hashtags = ['CareSpot', 'HealthcareForAll', 'CompassionInAction'],
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const shareData = {
    url: encodeURIComponent(url),
    title: encodeURIComponent(title),
    description: encodeURIComponent(description),
    hashtags: hashtags.join(',')
  };

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: 'facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${shareData.url}&quote=${shareData.title}`
    },
    {
      name: 'Twitter',
      icon: 'twitter',
      color: 'bg-sky-500 hover:bg-sky-600',
      shareUrl: `https://twitter.com/intent/tweet?url=${shareData.url}&text=${shareData.title}&hashtags=${shareData.hashtags}`
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      color: 'bg-blue-700 hover:bg-blue-800',
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${shareData.url}`
    },
    {
      name: 'WhatsApp',
      icon: 'whatsapp',
      color: 'bg-green-600 hover:bg-green-700',
      shareUrl: `https://wa.me/?text=${shareData.title}%20${shareData.url}`
    },
    {
      name: 'Telegram',
      icon: 'telegram',
      color: 'bg-blue-500 hover:bg-blue-600',
      shareUrl: `https://t.me/share/url?url=${shareData.url}&text=${shareData.title}`
    }
  ];

  const handleShare = (platform) => {
    if (navigator.share && platform.name === 'Native') {
      navigator.share({
        title: title,
        text: description,
        url: url
      }).catch(console.error);
    } else {
      window.open(platform.shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900">Share this</h4>
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Icon name="link" size="sm" />
          {copied ? 'Copied!' : 'Copy link'}
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Native sharing for mobile devices */}
        {navigator.share && (
          <Button
            onClick={() => handleShare({ name: 'Native' })}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Icon name="share" size="sm" />
            Share
          </Button>
        )}

        {/* Social platform buttons */}
        {socialPlatforms.map((platform) => (
          <button
            key={platform.name}
            onClick={() => handleShare(platform)}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors ${platform.color}`}
            title={`Share on ${platform.name}`}
          >
            <Icon name={platform.icon} size="sm" />
            <span className="hidden sm:inline">{platform.name}</span>
          </button>
        ))}
      </div>

      {/* Share statistics (optional) */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Icon name="heart" size="sm" />
            1.2k likes
          </span>
          <span className="flex items-center gap-1">
            <Icon name="share" size="sm" />
            234 shares
          </span>
          <span className="flex items-center gap-1">
            <Icon name="eye" size="sm" />
            5.6k views
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;