import UserProfile from './UserProfile';

export default {
  title: 'Molecules/UserProfile',
  component: UserProfile,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'UserProfile component for displaying user information with avatar, name, role, and optional badges.',
      },
    },
  },
  argTypes: {
    user: {
      control: { type: 'object' },
      description: 'User object containing name, avatar, role, and email',
    },
    showBadge: {
      control: { type: 'boolean' },
      description: 'Whether to show a badge',
    },
    badgeVariant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'Badge color variant',
    },
    badgeText: {
      control: { type: 'text' },
      description: 'Text to display in the badge',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Size of the avatar',
    },
    layout: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

// Sample user data
const sampleUsers = {
  volunteer: {
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'Community Health Volunteer',
    email: 'sarah.johnson@carespot.org'
  },
  doctor: {
    name: 'Dr. Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'Medical Director',
    email: 'dr.chen@carespot.org'
  },
  coordinator: {
    name: 'Amara Osei',
    role: 'Program Coordinator',
    email: 'amara.osei@carespot.org'
  },
  donor: {
    name: 'Robert Williams',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'Major Donor',
    email: 'robert.williams@email.com'
  }
};

// Default story
export const Default = {
  args: {
    user: sampleUsers.volunteer,
  },
};

// With badge
export const WithBadge = {
  args: {
    user: sampleUsers.volunteer,
    showBadge: true,
    badgeText: 'Active',
    badgeVariant: 'success',
  },
};

// Without avatar (initials)
export const WithoutAvatar = {
  args: {
    user: sampleUsers.coordinator,
    showBadge: true,
    badgeText: 'Staff',
    badgeVariant: 'primary',
  },
};

// Size variants
export const Small = {
  args: {
    user: sampleUsers.volunteer,
    size: 'small',
  },
};

export const Medium = {
  args: {
    user: sampleUsers.volunteer,
    size: 'medium',
  },
};

export const Large = {
  args: {
    user: sampleUsers.volunteer,
    size: 'large',
  },
};

export const XLarge = {
  args: {
    user: sampleUsers.volunteer,
    size: 'xlarge',
  },
};

// Layout variants
export const Horizontal = {
  args: {
    user: sampleUsers.doctor,
    layout: 'horizontal',
    showBadge: true,
    badgeText: 'Medical',
    badgeVariant: 'info',
  },
};

export const Vertical = {
  args: {
    user: sampleUsers.doctor,
    layout: 'vertical',
    showBadge: true,
    badgeText: 'Medical',
    badgeVariant: 'info',
  },
};

// Badge variants
export const BadgeVariants = {
  render: () => (
    <div className="space-y-4">
      <UserProfile
        user={sampleUsers.volunteer}
        showBadge={true}
        badgeText="Active"
        badgeVariant="success"
      />
      <UserProfile
        user={sampleUsers.doctor}
        showBadge={true}
        badgeText="Medical"
        badgeVariant="info"
      />
      <UserProfile
        user={sampleUsers.coordinator}
        showBadge={true}
        badgeText="Staff"
        badgeVariant="primary"
      />
      <UserProfile
        user={sampleUsers.donor}
        showBadge={true}
        badgeText="VIP"
        badgeVariant="warning"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different badge variants used with user profiles.',
      },
    },
  },
};

// Team showcase
export const TeamShowcase = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Medical Team</h3>
        <div className="space-y-3">
          <UserProfile
            user={{
              name: 'Dr. Kwame Asante',
              avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
              role: 'Chief Medical Officer',
              email: 'dr.asante@carespot.org'
            }}
            showBadge={true}
            badgeText="Lead"
            badgeVariant="primary"
          />
          <UserProfile
            user={{
              name: 'Dr. Fatima Al-Rashid',
              avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
              role: 'Pediatric Specialist',
              email: 'dr.alrashid@carespot.org'
            }}
            showBadge={true}
            badgeText="Specialist"
            badgeVariant="info"
          />
          <UserProfile
            user={{
              name: 'Nurse Grace Mensah',
              avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
              role: 'Head Nurse',
              email: 'grace.mensah@carespot.org'
            }}
            showBadge={true}
            badgeText="Nursing"
            badgeVariant="success"
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Community Volunteers</h3>
        <div className="space-y-3">
          <UserProfile
            user={{
              name: 'Emmanuel Boateng',
              role: 'Community Health Worker',
              email: 'emmanuel.boateng@volunteer.org'
            }}
            showBadge={true}
            badgeText="Volunteer"
            badgeVariant="secondary"
          />
          <UserProfile
            user={{
              name: 'Akosua Frimpong',
              role: 'Health Educator',
              email: 'akosua.frimpong@volunteer.org'
            }}
            showBadge={true}
            badgeText="Educator"
            badgeVariant="warning"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of UserProfile components used to showcase team members in different roles.',
      },
    },
  },
};

// Compact list view
export const CompactList = {
  render: () => (
    <div className="space-y-2">
      <UserProfile
        user={sampleUsers.volunteer}
        size="small"
        showBadge={true}
        badgeText="Online"
        badgeVariant="success"
      />
      <UserProfile
        user={sampleUsers.doctor}
        size="small"
        showBadge={true}
        badgeText="Busy"
        badgeVariant="warning"
      />
      <UserProfile
        user={sampleUsers.coordinator}
        size="small"
        showBadge={true}
        badgeText="Away"
        badgeVariant="danger"
      />
      <UserProfile
        user={sampleUsers.donor}
        size="small"
        showBadge={true}
        badgeText="Offline"
        badgeVariant="default"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact list view with small avatars and status badges.',
      },
    },
  },
};

// Card layout
export const CardLayout = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ width: '600px' }}>
      <div className="p-4 border rounded-lg">
        <UserProfile
          user={sampleUsers.doctor}
          layout="vertical"
          size="large"
          showBadge={true}
          badgeText="Medical Director"
          badgeVariant="primary"
        />
        <p className="mt-3 text-sm text-gray-600 text-center">
          Leading our medical initiatives across Ghana with over 15 years of experience.
        </p>
      </div>
      
      <div className="p-4 border rounded-lg">
        <UserProfile
          user={sampleUsers.volunteer}
          layout="vertical"
          size="large"
          showBadge={true}
          badgeText="Top Volunteer"
          badgeVariant="success"
        />
        <p className="mt-3 text-sm text-gray-600 text-center">
          Dedicated community health volunteer serving rural communities for 3 years.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'UserProfile components used in card layouts with additional context.',
      },
    },
  },
};