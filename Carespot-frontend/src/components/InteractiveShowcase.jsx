import { useState } from 'react';
import {
    ProgressBar,
    AnimatedCounter,
    Skeleton,
    SkeletonCard,
    SkeletonStats,
    Toast,
    ToastProvider,
    useToast,
    PageTransition,
    usePageTransition
} from './atoms';
import { ImpactCounter, DonationProgress } from './molecules';
import Button from './atoms/Button/Button';

const InteractiveDemo = () => {
    const { success, error, warning, info } = useToast();
    const { isLoading, withTransition } = usePageTransition();
    const [showSkeletons, setShowSkeletons] = useState(false);

    const sampleCampaigns = [
        {
            id: 1,
            title: 'Emergency Medical Fund',
            description: 'Providing critical medical care for children',
            current: 11880,
            target: 20000,
            donors: 156,
            urgent: true
        },
        {
            id: 2,
            title: 'School Supplies Drive',
            description: 'Educational materials for rural schools',
            current: 8500,
            target: 10000,
            donors: 89
        }
    ];

    const simulatePageLoad = async () => {
        await withTransition(async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
        });
    };

    const toggleSkeletons = () => {
        setShowSkeletons(!showSkeletons);
        setTimeout(() => setShowSkeletons(false), 3000);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Interactive Elements Showcase
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Demonstrating animated progress bars, counters, loading states, and notifications
                </p>
            </div>

            {/* Control Panel */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Interactive Controls</h2>
                <div className="flex flex-wrap gap-4">
                    <Button onClick={() => success('Donation successful!', { title: 'Thank you!' })}>
                        Success Toast
                    </Button>
                    <Button onClick={() => error('Payment failed', { title: 'Error' })} variant="danger">
                        Error Toast
                    </Button>
                    <Button onClick={() => warning('Please verify email', { title: 'Warning' })} variant="warning">
                        Warning Toast
                    </Button>
                    <Button onClick={() => info('New updates available', { title: 'Info' })} variant="secondary">
                        Info Toast
                    </Button>
                    <Button onClick={simulatePageLoad} variant="primary">
                        Simulate Page Load
                    </Button>
                    <Button onClick={toggleSkeletons} variant="secondary">
                        Show Skeletons
                    </Button>
                </div>
            </div>

            {/* Page Transition Demo */}
            <PageTransition isLoading={isLoading} loadingType="homepage">
                <div className="space-y-8">
                    {/* Impact Counters */}
                    <section>
                        <h2 className="text-3xl font-bold text-center mb-8">Impact Statistics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <ImpactCounter
                                value={11880}
                                label="Dollars Raised"
                                description="Supporting communities across Ghana"
                                icon="currency-dollar"
                                prefix="$"
                                color="primary"
                                delay={0}
                            />
                            <ImpactCounter
                                value={10}
                                label="Communities Reached"
                                description="Orphanages and underserved areas"
                                icon="home"
                                color="info"
                                delay={300}
                            />
                            <ImpactCounter
                                value={2050}
                                label="Children Helped"
                                description="Lives transformed through our programs"
                                icon="heart"
                                suffix="+"
                                color="success"
                                delay={600}
                            />
                        </div>
                    </section>

                    {/* Progress Bars */}
                    <section>
                        <h2 className="text-3xl font-bold text-center mb-8">Fundraising Progress</h2>
                        <div className="space-y-6">
                            <ProgressBar
                                current={11880}
                                target={20000}
                                label="Emergency Medical Fund"
                                color="primary"
                                size="large"
                                animated={true}
                            />
                            <ProgressBar
                                current={8500}
                                target={10000}
                                label="School Supplies Drive"
                                color="success"
                                size="medium"
                                animated={true}
                            />
                            <ProgressBar
                                current={3200}
                                target={15000}
                                label="Clean Water Project"
                                color="info"
                                size="medium"
                                animated={true}
                            />
                        </div>
                    </section>

                    {/* Donation Progress Component */}
                    <section>
                        <DonationProgress
                            campaigns={sampleCampaigns}
                            title="Active Campaigns"
                            subtitle="Help us reach our fundraising goals"
                            onDonate={() => success('Thank you for your interest in donating!', { title: 'Donation' })}
                        />
                    </section>
                </div>
            </PageTransition>

            {/* Skeleton Loading Demo */}
            {showSkeletons && (
                <section className="bg-white p-6 rounded-lg border">
                    <h2 className="text-2xl font-semibold mb-6">Loading States</h2>
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <SkeletonStats />
                            <SkeletonStats />
                            <SkeletonStats />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </div>
                    </div>
                </section>
            )}

            {/* Individual Component Demos */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Animated Counters</h3>
                    <div className="space-y-4">
                        <div className="text-center">
                            <AnimatedCounter target={95.5} suffix="%" size="large" color="success" />
                            <p className="text-gray-600">Success Rate</p>
                        </div>
                        <div className="text-center">
                            <AnimatedCounter target={1250000} prefix="$" size="medium" color="primary" />
                            <p className="text-gray-600">Total Impact</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Progress Variations</h3>
                    <div className="space-y-4">
                        <ProgressBar
                            current={7500}
                            target={10000}
                            label="Healthcare Fund"
                            color="success"
                            size="small"
                        />
                        <ProgressBar
                            current={2000}
                            target={5000}
                            label="Education Fund"
                            color="warning"
                            size="small"
                        />
                        <ProgressBar
                            current={9800}
                            target={10000}
                            label="Nutrition Fund"
                            color="primary"
                            size="small"
                        />
                    </div>
                </div>
            </section>

            {/* Features List */}
            <section className="bg-gradient-to-r from-red-50 to-blue-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Interactive Features Implemented</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-3">✨ Animations & Transitions</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>• Scroll-triggered animated counters</li>
                            <li>• Smooth progress bar animations</li>
                            <li>• Page transition effects</li>
                            <li>• Hover and interaction animations</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-3">🎯 User Experience</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>• Skeleton loading states</li>
                            <li>• Accessible toast notifications</li>
                            <li>• Real-time progress updates</li>
                            <li>• Interactive feedback systems</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

const InteractiveShowcase = () => {
    return (
        <ToastProvider position="top-right">
            <InteractiveDemo />
        </ToastProvider>
    );
};

export default InteractiveShowcase;