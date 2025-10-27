import React from 'react';
import { Button } from './atoms/Button/Button';
import { Input } from './atoms/Input/Input';
import { Avatar } from './atoms/Avatar/Avatar';
import { Badge } from './atoms/Badge/Badge';
import { Icon } from './atoms/Icon/Icon';
import { StatCard } from './molecules/StatCard/StatCard';
import { UserProfile } from './molecules/UserProfile/UserProfile';
import { SearchBox } from './molecules/SearchBox/SearchBox';
import { StatsGrid } from './organisms/StatsGrid/StatsGrid';
import { Header } from './organisms/Header/Header';
import { Heading, Body, Caption, Label } from './Typography';

const ComponentShowcase = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center mb-12">
                    <Heading level={1} className="text-primary-600 mb-4">
                        CareSpot Design System
                    </Heading>
                    <Body size="lg" className="text-gray-600">
                        A comprehensive showcase of all components in the CareSpot design system
                    </Body>
                </div>

                {/* Atoms Section */}
                <section className="bg-white rounded-lg p-8 shadow-sm">
                    <Heading level={2} className="text-gray-900 mb-6 border-b pb-2">
                        Atoms
                    </Heading>

                    {/* Buttons */}
                    <div className="mb-8">
                        <Heading level={3} className="text-gray-700 mb-4">Buttons</Heading>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="primary" size="sm">Primary Small</Button>
                            <Button variant="primary" size="md">Primary Medium</Button>
                            <Button variant="primary" size="lg">Primary Large</Button>
                            <Button variant="secondary" size="md">Secondary</Button>
                            <Button variant="outline" size="md">Outline</Button>
                            <Button variant="ghost" size="md">Ghost</Button>
                            <Button variant="primary" size="md" disabled>Disabled</Button>
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="mb-8">
                        <Heading level={3} className="text-gray-700 mb-4">Inputs</Heading>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                            <Input placeholder="Default input" />
                            <Input placeholder="With label" label="Email Address" />
                            <Input placeholder="Error state" error="This field is required" />
                            <Input placeholder="Disabled input" disabled />
                        </div>
                    </div>

                    {/* Avatars */}
                    <div className="mb-8">
                        <Heading level={3} className="text-gray-700 mb-4">Avatars</Heading>
                        <div className="flex items-center gap-4">
                            <Avatar size="sm" src="/api/placeholder/32/32" alt="Small avatar" />
                            <Avatar size="md" src="/api/placeholder/40/40" alt="Medium avatar" />
                            <Avatar size="lg" src="/api/placeholder/48/48" alt="Large avatar" />
                            <Avatar size="xl" src="/api/placeholder/64/64" alt="Extra large avatar" />
                            <Avatar size="md" fallback="JD" />
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="mb-8">
                        <Heading level={3} className="text-gray-700 mb-4">Badges</Heading>
                        <div className="flex flex-wrap gap-3">
                            <Badge variant="primary">Primary</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="success">Success</Badge>
                            <Badge variant="warning">Warning</Badge>
                            <Badge variant="error">Error</Badge>
                            <Badge variant="info">Info</Badge>
                        </div>
                    </div>

                    {/* Icons */}
                    <div className="mb-8">
                        <Heading level={3} className="text-gray-700 mb-4">Icons</Heading>
                        <div className="flex items-center gap-4">
                            <Icon name="heart" size="sm" className="text-red-500" />
                            <Icon name="user" size="md" className="text-blue-500" />
                            <Icon name="settings" size="lg" className="text-gray-500" />
                            <Icon name="search" size="xl" className="text-green-500" />
                        </div>
                    </div>
                </section>

                {/* Typography Section */}
                <section className="bg-white rounded-lg p-8 shadow-sm">
                    <Heading level={2} className="text-gray-900 mb-6 border-b pb-2">
                        Typography
                    </Heading>

                    <div className="space-y-6">
                        <div>
                            <Label className="text-gray-600 mb-2 block">Headings</Label>
                            <div className="space-y-2">
                                <Heading level={1}>Heading 1 - Main Page Title</Heading>
                                <Heading level={2}>Heading 2 - Section Title</Heading>
                                <Heading level={3}>Heading 3 - Subsection</Heading>
                                <Heading level={4}>Heading 4 - Component Title</Heading>
                                <Heading level={5}>Heading 5 - Small Title</Heading>
                                <Heading level={6}>Heading 6 - Micro Title</Heading>
                            </div>
                        </div>

                        <div>
                            <Label className="text-gray-600 mb-2 block">Body Text</Label>
                            <div className="space-y-2">
                                <Body size="xl">Extra large body text for important content</Body>
                                <Body size="lg">Large body text for emphasis</Body>
                                <Body size="md">Medium body text for regular content</Body>
                                <Body size="sm">Small body text for secondary information</Body>
                            </div>
                        </div>

                        <div>
                            <Label className="text-gray-600 mb-2 block">Labels & Captions</Label>
                            <div className="space-y-2">
                                <Label size="lg">Large Label</Label>
                                <Label size="md">Medium Label</Label>
                                <Label size="sm">Small Label</Label>
                                <Caption size="lg">Large Caption Text</Caption>
                                <Caption size="md">Medium Caption Text</Caption>
                                <Caption size="sm">Small Caption Text</Caption>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Molecules Section */}
                <section className="bg-white rounded-lg p-8 shadow-sm">
                    <Heading level={2} className="text-gray-900 mb-6 border-b pb-2">
                        Molecules
                    </Heading>

                    {/* Stat Cards */}
                    <div className="mb-8">
                        <Heading level={3} className="text-gray-700 mb-4">Stat Cards</Heading>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard
                                title="Total Donations"
                                value="$125,430"
                                change="+12.5%"
                                trend="up"
                                icon="heart"
                            />
                            <StatCard
                                title="Active Volunteers"
                                value="1,247"
                                change="+8.2%"
                                trend="up"
                                icon="user"
                            />
                            <StatCard
                                title="Projects Completed"
                                value="89"
                                change="-2.1%"
                                trend="down"
                                icon="check"
                            />
                        </div>
                    </div>

                    {/* User Profiles */}
                    <div className="mb-8">
                        <Heading level={3} className="text-gray-700 mb-4">User Profiles</Heading>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                            <UserProfile
                                name="Dr. Sarah Johnson"
                                role="Medical Director"
                                avatar="/api/placeholder/48/48"
                                status="online"
                            />
                            <UserProfile
                                name="Michael Chen"
                                role="Volunteer Coordinator"
                                avatar="/api/placeholder/48/48"
                                status="offline"
                            />
                        </div>
                    </div>

                    {/* Search Box */}
                    <div className="mb-8">
                        <Heading level={3} className="text-gray-700 mb-4">Search Box</Heading>
                        <div className="max-w-md">
                            <SearchBox placeholder="Search projects, volunteers, or donations..." />
                        </div>
                    </div>
                </section>

                {/* Organisms Section */}
                <section className="bg-white rounded-lg p-8 shadow-sm">
                    <Heading level={2} className="text-gray-900 mb-6 border-b pb-2">
                        Organisms
                    </Heading>

                    {/* Stats Grid */}
                    <div className="mb-8">
                        <Heading level={3} className="text-gray-700 mb-4">Stats Grid</Heading>
                        <StatsGrid />
                    </div>

                    {/* Header */}
                    <div className="mb-8">
                        <Heading level={3} className="text-gray-700 mb-4">Header Component</Heading>
                        <div className="border rounded-lg overflow-hidden">
                            <Header />
                        </div>
                    </div>
                </section>

                {/* Color Palette */}
                <section className="bg-white rounded-lg p-8 shadow-sm">
                    <Heading level={2} className="text-gray-900 mb-6 border-b pb-2">
                        Color Palette
                    </Heading>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Primary Colors */}
                        <div>
                            <Label className="text-gray-600 mb-3 block">Primary Colors</Label>
                            <div className="space-y-2">
                                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                                    <div key={shade} className="flex items-center gap-3">
                                        <div
                                            className={`w-12 h-8 rounded border bg-primary-${shade}`}
                                        />
                                        <Caption className="text-gray-600">primary-{shade}</Caption>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Secondary Colors */}
                        <div>
                            <Label className="text-gray-600 mb-3 block">Secondary Colors</Label>
                            <div className="space-y-2">
                                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                                    <div key={shade} className="flex items-center gap-3">
                                        <div
                                            className={`w-12 h-8 rounded border bg-secondary-${shade}`}
                                        />
                                        <Caption className="text-gray-600">secondary-{shade}</Caption>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Accent Colors */}
                        <div>
                            <Label className="text-gray-600 mb-3 block">Accent Colors</Label>
                            <div className="space-y-2">
                                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                                    <div key={shade} className="flex items-center gap-3">
                                        <div
                                            className={`w-12 h-8 rounded border bg-accent-${shade}`}
                                        />
                                        <Caption className="text-gray-600">accent-{shade}</Caption>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Interactive Examples */}
                <section className="bg-white rounded-lg p-8 shadow-sm">
                    <Heading level={2} className="text-gray-900 mb-6 border-b pb-2">
                        Interactive Examples
                    </Heading>

                    <div className="space-y-8">
                        {/* Form Example */}
                        <div>
                            <Heading level={3} className="text-gray-700 mb-4">Contact Form</Heading>
                            <div className="max-w-md space-y-4">
                                <Input label="Full Name" placeholder="Enter your full name" />
                                <Input label="Email" type="email" placeholder="Enter your email" />
                                <Input label="Message" placeholder="Enter your message" multiline rows={4} />
                                <Button variant="primary" size="md" className="w-full">
                                    Send Message
                                </Button>
                            </div>
                        </div>

                        {/* Card Layout Example */}
                        <div>
                            <Heading level={3} className="text-gray-700 mb-4">Project Cards</Heading>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Avatar size="md" fallback={`P${i}`} />
                                            <div>
                                                <Heading level={4}>Health Project {i}</Heading>
                                                <Caption className="text-gray-500">Active Campaign</Caption>
                                            </div>
                                        </div>
                                        <Body size="sm" className="text-gray-600 mb-4">
                                            Supporting healthcare access in underserved communities through innovative solutions.
                                        </Body>
                                        <div className="flex items-center justify-between">
                                            <Badge variant="success">Active</Badge>
                                            <Button variant="outline" size="sm">Learn More</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default ComponentShowcase;