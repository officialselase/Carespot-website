// src/pages/VolunteerHubPage.jsx - CareSpot Volunteer Community Hub

import { useState, useEffect } from 'react';
import Button from '../components/atoms/Button/Button';
import Badge from '../components/atoms/Badge/Badge';
import AnimatedCounter from '../components/atoms/AnimatedCounter/AnimatedCounter';
import Hero from '../components/Hero';
import Section from '../components/Section';

const VolunteerHubPage = ({ navigateTo }) => {
    const [communityStats, setCommunityStats] = useState(null);
    const [impactStories, setImpactStories] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [volunteerSpotlight, setVolunteerSpotlight] = useState(null);
    const [recentAchievements, setRecentAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHubData();
    }, []);

    const fetchHubData = async () => {
        try {
            setLoading(true);

            // Mock data - replace with actual API calls from backend

            const mockCommunityStats = {
                totalVolunteers: 1247,
                activeThisMonth: 342,
                totalHoursThisMonth: 8934,
                totalHoursAllTime: 45678,
                livesImpacted: 15678,
                communitiesServed: 45,
                ongoingProjects: 23,
                completedProjects: 187
            };

            const mockRecentAchievements = [
                {
                    id: 1,
                    volunteer: "Akosua Frimpong",
                    achievement: "Completed 500 volunteer hours",
                    date: "2024-10-25",
                    badge: "Dedication Champion"
                },
                {
                    id: 2,
                    volunteer: "Samuel Nkrumah",
                    achievement: "Led 10 successful health workshops",
                    date: "2024-10-23",
                    badge: "Health Educator"
                },
                {
                    id: 3,
                    volunteer: "Mary Adjei",
                    achievement: "Recruited 15 new volunteers",
                    date: "2024-10-20",
                    badge: "Community Builder"
                }
            ];

            const mockImpactStories = [
                {
                    id: 1,
                    title: "Mobile Clinic Reaches Remote Village",
                    description: "Thanks to our volunteer drivers and medical assistants, we provided healthcare to 150 people in Abokobi who hadn't seen a doctor in over a year.",
                    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    impact: "150 people served",
                    date: "2024-10-20",
                    volunteers: ["John Doe", "Grace Osei", "Kwame Asante"],
                    category: "Healthcare"
                },
                {
                    id: 2,
                    title: "Nutrition Program Transforms School",
                    description: "Our volunteer nutritionists and educators helped implement a school feeding program that improved attendance by 40% and test scores by 25%.",
                    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    impact: "300 children benefited",
                    date: "2024-10-18",
                    volunteers: ["Mary Adjei", "Samuel Nkrumah"],
                    category: "Nutrition"
                },
                {
                    id: 3,
                    title: "Health Education Saves Lives",
                    description: "Community health workshops led by volunteers resulted in early detection of diabetes in 45 community members, potentially saving lives.",
                    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    impact: "45 early diagnoses",
                    date: "2024-10-15",
                    volunteers: ["Dr. Sarah Mensah", "Akosua Frimpong"],
                    category: "Education"
                }
            ];

            const mockUpcomingEvents = [
                {
                    id: 1,
                    title: "Community Health Fair - Tema",
                    date: "2024-11-02",
                    time: "08:00 - 16:00",
                    location: "Tema Community Center",
                    volunteersNeeded: 15,
                    volunteersRegistered: 8,
                    skills: ["Health Screening", "Registration", "Translation"],
                    urgency: "high"
                },
                {
                    id: 2,
                    title: "Volunteer Appreciation Dinner",
                    date: "2024-11-08",
                    time: "18:00 - 21:00",
                    location: "CareSpot Office, Accra",
                    volunteersNeeded: 0,
                    volunteersRegistered: 67,
                    skills: [],
                    urgency: "none",
                    type: "social"
                },
                {
                    id: 3,
                    title: "Mobile Clinic - Abokobi",
                    date: "2024-11-10",
                    time: "07:00 - 15:00",
                    location: "Abokobi Village Square",
                    volunteersNeeded: 12,
                    volunteersRegistered: 5,
                    skills: ["Medical Support", "Data Collection", "Community Outreach"],
                    urgency: "medium"
                }
            ];

            const mockVolunteerSpotlight = {
                name: "Grace Osei",
                title: "Nutrition Program Coordinator",
                image: "https://images.unsplash.com/photo-1594824388853-d0c2d8e8b6b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                quote: "Volunteering with CareSpot has shown me that small actions can create ripple effects of positive change. Every child we help today becomes a healthier adult tomorrow.",
                achievements: ["500+ hours volunteered", "Led 15 nutrition workshops", "Trained 25 new volunteers"],
                joinedDate: "2023-06-15",
                favoriteProject: "School Feeding Program"
            };

            setCommunityStats(mockCommunityStats);
            setImpactStories(mockImpactStories);
            setUpcomingEvents(mockUpcomingEvents);
            setVolunteerSpotlight(mockVolunteerSpotlight);
            setRecentAchievements(mockRecentAchievements);

        } catch (error) {
            console.error('Error fetching hub data:', error);
        } finally {
            setLoading(false);
        }
    };



    const getUrgencyColor = (urgency) => {
        const colors = {
            'high': 'red',
            'medium': 'yellow',
            'low': 'green',
            'none': 'gray'
        };
        return colors[urgency] || 'gray';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <main className="pt-20">
            {/* Hero Section */}
            <Hero
                title="CareSpot Volunteer Community"
                subtitle="Compassion in Action"
                description="Discover the incredible impact our volunteer community is making across Ghana. Join thousands of passionate individuals transforming lives through healthcare access and education."
                backgroundImage="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                primaryAction={{
                    text: "Join Our Community",
                    onClick: () => navigateTo("Volunteer")
                }}
                secondaryAction={{
                    text: "View Opportunities",
                    onClick: () => {
                        document.getElementById('upcoming-events').scrollIntoView({ behavior: 'smooth' });
                    }
                }}
            />

            {/* Community Impact Stats */}
            <Section
                title="Our Community Impact"
                subtitle="Making a Difference Together"
                backgroundColor="bg-white"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                            <AnimatedCounter target={communityStats?.totalVolunteers || 0} duration={1500} />
                        </div>
                        <div className="text-gray-600">Active Volunteers</div>
                        <div className="text-sm text-blue-600 mt-1">Growing every day</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">
                            <AnimatedCounter target={communityStats?.livesImpacted || 0} duration={2000} />
                        </div>
                        <div className="text-gray-600">Lives Impacted</div>
                        <div className="text-sm text-green-600 mt-1">Across Ghana</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-purple-600 mb-2">
                            <AnimatedCounter target={communityStats?.totalHoursAllTime || 0} duration={2500} />
                        </div>
                        <div className="text-gray-600">Hours Volunteered</div>
                        <div className="text-sm text-purple-600 mt-1">All time</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-red-600 mb-2">
                            <AnimatedCounter target={communityStats?.communitiesServed || 0} duration={1800} />
                        </div>
                        <div className="text-gray-600">Communities Served</div>
                        <div className="text-sm text-red-600 mt-1">And counting</div>
                    </div>
                </div>
            </Section>

            {/* Recent Impact Stories */}
            <Section
                title="Recent Impact Stories"
                subtitle="Real Stories, Real Impact"
                backgroundColor="bg-color-bg-secondary"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {impactStories.map((story) => (
                        <div key={story.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <img
                                src={story.image}
                                alt={story.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <Badge variant="success" className="text-xs">
                                        {story.category}
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                        {new Date(story.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-3">{story.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{story.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-blue-600">{story.impact}</span>
                                    <div className="flex -space-x-2">
                                        {story.volunteers.slice(0, 3).map((volunteer, index) => (
                                            <div
                                                key={index}
                                                className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                                                title={volunteer}
                                            >
                                                {volunteer.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        ))}
                                        {story.volunteers.length > 3 && (
                                            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                                                +{story.volunteers.length - 3}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Upcoming Events */}
            <Section
                id="upcoming-events"
                title="Upcoming Volunteer Events"
                subtitle="Join Us in Making a Difference"
                backgroundColor="bg-white"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map((event) => (
                        <div key={event.id} className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">{event.title}</h3>
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <span className="mr-2">📍</span>
                                            {event.location}
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mr-2">📅</span>
                                            {new Date(event.date).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mr-2">🕐</span>
                                            {event.time}
                                        </div>
                                    </div>
                                </div>
                                {event.urgency !== 'none' && (
                                    <Badge variant={getUrgencyColor(event.urgency)} className="text-xs">
                                        {event.urgency === 'high' ? 'Urgent' : event.urgency}
                                    </Badge>
                                )}
                            </div>

                            {event.volunteersNeeded > 0 && (
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600">Volunteers Needed</span>
                                        <span className="text-gray-900 font-medium">
                                            {event.volunteersNeeded} more
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                                            style={{
                                                width: `${(event.volunteersRegistered / (event.volunteersNeeded + event.volunteersRegistered)) * 100}%`
                                            }}
                                        ></div>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {event.volunteersRegistered} volunteers already signed up
                                    </div>
                                </div>
                            )}

                            {event.skills.length > 0 && (
                                <div className="mb-4">
                                    <div className="text-sm text-gray-600 mb-2">Skills needed:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {event.skills.map((skill, index) => (
                                            <Badge key={index} variant="info" className="text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-6">
                                {event.type === 'social' ? (
                                    <Button variant="outline" className="w-full">
                                        Learn More
                                    </Button>
                                ) : (
                                    <Button variant="primary" className="w-full">
                                        {event.volunteersNeeded > 0 ? 'Volunteer Now' : 'Learn More'}
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Volunteer Spotlight */}
            <Section
                title="Volunteer Spotlight"
                subtitle="Celebrating Our Community Heroes"
                backgroundColor="bg-color-bg-secondary"
            >
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl p-8 text-white text-center">
                        <img
                            src={volunteerSpotlight?.image}
                            alt={volunteerSpotlight?.name}
                            className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-white/30"
                        />
                        <h3 className="text-2xl font-bold mb-2">{volunteerSpotlight?.name}</h3>
                        <p className="text-purple-100 mb-6">{volunteerSpotlight?.title}</p>

                        <blockquote className="text-lg italic mb-8 max-w-2xl mx-auto">
                            "{volunteerSpotlight?.quote}"
                        </blockquote>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {volunteerSpotlight?.achievements.map((achievement, index) => (
                                <div key={index} className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                                    <div className="text-yellow-300 text-2xl mb-2">✨</div>
                                    <div className="text-sm">{achievement}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            {/* Recent Achievements */}
            <Section
                title="Recent Community Achievements"
                subtitle="Celebrating Our Volunteers"
                backgroundColor="bg-white"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recentAchievements.map((achievement) => (
                        <div key={achievement.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                            <div className="text-center mb-4">
                                <div className="text-4xl mb-3">🏆</div>
                                <h3 className="font-bold text-gray-900 mb-1">{achievement.volunteer}</h3>
                                <Badge variant="warning" className="text-xs">
                                    {achievement.badge}
                                </Badge>
                            </div>
                            <p className="text-gray-700 text-sm text-center mb-3">
                                {achievement.achievement}
                            </p>
                            <div className="text-xs text-gray-500 text-center">
                                {new Date(achievement.date).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* This Month's Top Volunteers */}
            <Section
                title="This Month's Top Volunteers"
                subtitle="Recognizing Outstanding Dedication"
                backgroundColor="bg-color-bg-secondary"
            >
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="space-y-4">
                            {[
                                { name: "Akosua Frimpong", hours: 32, rank: 1, badge: "🥇" },
                                { name: "Samuel Nkrumah", hours: 28, rank: 2, badge: "🥈" },
                                { name: "Mary Adjei", hours: 24, rank: 3, badge: "🥉" },
                                { name: "John Doe", hours: 22, rank: 4, badge: "�" },
                                { name: "Grace Osei", hours: 20, rank: 5, badge: "🏅" }
                            ].map((volunteer) => (
                                <div
                                    key={volunteer.rank}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <span className="text-2xl">{volunteer.badge}</span>
                                        <div>
                                            <span className="font-medium text-gray-900">{volunteer.name}</span>
                                            <div className="text-sm text-gray-600">Rank #{volunteer.rank}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-blue-600">{volunteer.hours}h</div>
                                        <div className="text-xs text-gray-500">this month</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            {/* Call to Action */}
            <Section
                title="Ready to Join Our Community?"
                subtitle="Start Your Volunteer Journey Today"
                backgroundColor="bg-gradient-to-r from-blue-600 to-green-600"
            >
                <div className="text-center text-white">
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Join thousands of passionate volunteers making a real difference in communities across Ghana.
                        Every hour you contribute creates lasting impact.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            variant="primary"
                            onClick={() => navigateTo("Volunteer")}
                            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
                        >
                            Start Volunteering
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navigateTo("Contact")}
                            className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4"
                        >
                            Learn More
                        </Button>
                    </div>
                </div>
            </Section>
        </main>
    );
};

export default VolunteerHubPage;