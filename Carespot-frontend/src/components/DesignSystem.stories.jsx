import Button from './atoms/Button/Button';
import Input from './atoms/Input/Input';
import Avatar from './atoms/Avatar/Avatar';
import Badge from './atoms/Badge/Badge';
import Icon from './atoms/Icon/Icon';
import Heading from './Typography/Heading';
import Body from './Typography/Body';
import StatCard from './molecules/StatCard/StatCard';
import UserProfile from './molecules/UserProfile/UserProfile';
import SearchBox from './molecules/SearchBox/SearchBox';
import Header from './organisms/Header/Header';
import StatsGrid from './organisms/StatsGrid/StatsGrid';

export default {
  title: 'Design System/Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete overview of the CareSpot design system showcasing all components working together.',
      },
    },
  },
};

// Sample data
const sampleUser = {
  name: 'Dr. Sarah Johnson',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  role: 'Medical Director',
  email: 'dr.johnson@carespot.org'
};

const sampleNavigation = [
  { label: 'Home', href: '/' },
  { label: 'Programs', href: '/programs' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const sampleStats = [
  {
    id: 1,
    title: 'People Served',
    value: '15,230',
    subtitle: 'This year',
    icon: 'users',
    trend: 'up',
    trendValue: '+18%',
    variant: 'success'
  },
  {
    id: 2,
    title: 'Healthcare Programs',
    value: '28',
    subtitle: 'Active programs',
    icon: 'medical',
    trend: 'up',
    trendValue: '+5%',
    variant: 'primary'
  },
  {
    id: 3,
    title: 'Villages Reached',
    value: '156',
    subtitle: 'Across Ghana',
    icon: 'globe',
    trend: 'up',
    trendValue: '+8%'
  },
  {
    id: 4,
    title: 'Total Donations',
    value: '$127K',
    subtitle: 'This quarter',
    icon: 'heart',
    trend: 'up',
    trendValue: '+23%',
    variant: 'success'
  }
];

// Complete design system showcase
export const CompleteDesignSystem = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        logo={{
          src: 'https://via.placeholder.com/120x32/2563eb/ffffff?text=CareSpot',
          alt: 'CareSpot Logo'
        }}
        navigation={sampleNavigation}
        user={sampleUser}
      />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <Heading as="h1" size="4xl" className="mb-4">
            Transforming Healthcare in Rural Communities
          </Heading>
          <Body size="lg" color="text-color-text-secondary" className="mb-8 max-w-3xl mx-auto">
            CareSpot is dedicated to improving healthcare access, promoting health literacy, 
            and supporting nutrition for underserved populations across Ghana and beyond.
          </Body>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="large">
              <Icon name="heart" size="small" className="mr-2" />
              Donate Now
            </Button>
            <Button variant="outline" size="large">
              <Icon name="users" size="small" className="mr-2" />
              Volunteer With Us
            </Button>
          </div>
        </section>

        {/* Search Section */}
        <section className="mb-12">
          <div className="max-w-2xl mx-auto">
            <Heading as="h2" size="2xl" align="center" className="mb-4">
              Find Healthcare Resources
            </Heading>
            <SearchBox 
              placeholder="Search programs, services, locations..." 
              size="large"
            />
          </div>
        </section>

        {/* Stats Grid */}
        <section className="mb-12">
          <Heading as="h2" size="2xl" className="mb-6">
            Our Impact
          </Heading>
          <StatsGrid stats={sampleStats} columns={4} />
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <Heading as="h2" size="2xl" className="mb-6">
            Meet Our Team
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <UserProfile
                user={{
                  name: 'Dr. Kwame Asante',
                  avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                  role: 'Chief Medical Officer',
                  email: 'dr.asante@carespot.org'
                }}
                layout="vertical"
                size="large"
                showBadge={true}
                badgeText="Leadership"
                badgeVariant="primary"
              />
              <Body size="sm" className="mt-4 text-center">
                Leading our medical initiatives with over 15 years of experience in rural healthcare.
              </Body>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <UserProfile
                user={{
                  name: 'Nurse Grace Mensah',
                  avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                  role: 'Head Nurse',
                  email: 'grace.mensah@carespot.org'
                }}
                layout="vertical"
                size="large"
                showBadge={true}
                badgeText="Nursing"
                badgeVariant="success"
              />
              <Body size="sm" className="mt-4 text-center">
                Coordinating nursing care and training community health workers across our programs.
              </Body>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <UserProfile
                user={{
                  name: 'Emmanuel Boateng',
                  role: 'Community Coordinator',
                  email: 'emmanuel@carespot.org'
                }}
                layout="vertical"
                size="large"
                showBadge={true}
                badgeText="Community"
                badgeVariant="info"
              />
              <Body size="sm" className="mt-4 text-center">
                Building bridges between our programs and local communities to ensure sustainable impact.
              </Body>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="mb-12">
          <Heading as="h2" size="2xl" className="mb-6">
            Our Programs
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Icon name="medical" size="large" color="#2563eb" />
                </div>
                <div className="flex-1">
                  <Heading as="h3" size="lg" className="mb-2">
                    Mobile Health Clinics
                  </Heading>
                  <Body className="mb-4">
                    Bringing essential healthcare services directly to remote communities 
                    through our fleet of mobile medical units.
                  </Body>
                  <div className="flex gap-2">
                    <Badge variant="success">Active</Badge>
                    <Badge variant="info">15 Clinics</Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Icon name="users" size="large" color="#10b981" />
                </div>
                <div className="flex-1">
                  <Heading as="h3" size="lg" className="mb-2">
                    Community Health Training
                  </Heading>
                  <Body className="mb-4">
                    Training local community members to become health advocates 
                    and provide basic healthcare education.
                  </Body>
                  <div className="flex gap-2">
                    <Badge variant="success">Active</Badge>
                    <Badge variant="warning">89 Trained</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="mb-12">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <Heading as="h2" size="2xl" className="mb-6 text-center">
              Get Involved
            </Heading>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="Enter your first name"
                  required
                />
                <Input
                  label="Last Name"
                  placeholder="Enter your last name"
                  required
                />
              </div>
              
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                required
                helperText="We'll never share your email with anyone else."
              />
              
              <Input
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
              />
              
              <div className="flex gap-4">
                <Button variant="primary" size="large" className="flex-1">
                  Volunteer
                </Button>
                <Button variant="outline" size="large" className="flex-1">
                  Learn More
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete design system showcase demonstrating all components working together in a realistic NGO website layout.',
      },
    },
  },
};

// Component library overview
export const ComponentLibraryOverview = {
  render: () => (
    <div className="max-w-7xl mx-auto p-8 space-y-12">
      <div className="text-center">
        <Heading as="h1" size="4xl" className="mb-4">
          CareSpot Design System
        </Heading>
        <Body size="lg" color="text-color-text-secondary">
          A comprehensive component library built for NGO websites with accessibility and usability in mind.
        </Body>
      </div>

      {/* Atoms */}
      <section>
        <Heading as="h2" size="2xl" className="mb-6">
          Atoms
        </Heading>
        
        <div className="space-y-8">
          <div>
            <Heading as="h3" size="lg" className="mb-4">Buttons</Heading>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>
          
          <div>
            <Heading as="h3" size="lg" className="mb-4">Badges</Heading>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </div>
          
          <div>
            <Heading as="h3" size="lg" className="mb-4">Icons</Heading>
            <div className="flex flex-wrap gap-4">
              <Icon name="heart" size="large" />
              <Icon name="users" size="large" />
              <Icon name="medical" size="large" />
              <Icon name="globe" size="large" />
              <Icon name="star" size="large" />
            </div>
          </div>
          
          <div>
            <Heading as="h3" size="lg" className="mb-4">Avatars</Heading>
            <div className="flex items-center gap-4">
              <Avatar name="John Doe" size="small" />
              <Avatar name="Jane Smith" size="medium" />
              <Avatar name="Bob Johnson" size="large" />
              <Avatar 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                name="Profile"
                size="xlarge"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Molecules */}
      <section>
        <Heading as="h2" size="2xl" className="mb-6">
          Molecules
        </Heading>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Heading as="h3" size="lg" className="mb-4">StatCard</Heading>
            <StatCard
              title="Total Impact"
              value="50,000+"
              subtitle="Lives touched"
              icon="heart"
              trend="up"
              trendValue="+15%"
              variant="primary"
            />
          </div>
          
          <div>
            <Heading as="h3" size="lg" className="mb-4">UserProfile</Heading>
            <UserProfile
              user={{
                name: 'Dr. Sarah Johnson',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                role: 'Medical Director',
                email: 'dr.johnson@carespot.org'
              }}
              showBadge={true}
              badgeText="Staff"
              badgeVariant="primary"
            />
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <Heading as="h2" size="2xl" className="mb-6">
          Typography
        </Heading>
        
        <div className="space-y-4">
          <Heading as="h1" size="4xl">Heading 1 - 4xl</Heading>
          <Heading as="h2" size="3xl">Heading 2 - 3xl</Heading>
          <Heading as="h3" size="2xl">Heading 3 - 2xl</Heading>
          <Body size="lg">Large body text for introductory content and emphasis.</Body>
          <Body size="base">Base body text for standard content and readability.</Body>
          <Body size="sm">Small body text for secondary information and details.</Body>
        </div>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Overview of all component categories in the design system.',
      },
    },
  },
};