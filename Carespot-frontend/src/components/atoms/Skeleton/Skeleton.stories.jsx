import Skeleton, { SkeletonCard, SkeletonProfile, SkeletonStats, SkeletonList, SkeletonTable } from './Skeleton';

export default {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'title', 'heading', 'button', 'avatar', 'card', 'image', 'circle', 'rectangle'],
    },
  },
};

export const Default = {
  args: {
    variant: 'text',
    animate: true,
  },
};

export const Variants = () => (
  <div className="space-y-4">
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Text</h3>
      <Skeleton variant="text" />
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Title</h3>
      <Skeleton variant="title" />
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Heading</h3>
      <Skeleton variant="heading" />
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Button</h3>
      <Skeleton variant="button" />
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Avatar</h3>
      <Skeleton variant="avatar" />
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Image</h3>
      <Skeleton variant="image" />
    </div>
  </div>
);

export const CardSkeleton = () => (
  <div className="max-w-sm">
    <SkeletonCard />
  </div>
);

export const ProfileSkeleton = () => (
  <div className="max-w-md">
    <SkeletonProfile />
  </div>
);

export const StatsSkeleton = () => (
  <div className="grid grid-cols-3 gap-6">
    <SkeletonStats />
    <SkeletonStats />
    <SkeletonStats />
  </div>
);

export const ListSkeleton = () => (
  <div className="max-w-md">
    <SkeletonList items={5} />
  </div>
);

export const TableSkeleton = () => (
  <div className="max-w-4xl">
    <SkeletonTable rows={5} columns={4} />
  </div>
);

export const LoadingPage = () => (
  <div className="max-w-4xl mx-auto p-6 space-y-8">
    {/* Header */}
    <div className="text-center">
      <Skeleton variant="heading" className="mx-auto mb-4" width="300px" />
      <Skeleton variant="text" className="mx-auto" width="500px" />
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SkeletonStats />
      <SkeletonStats />
      <SkeletonStats />
    </div>

    {/* Content Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>

    {/* Profile List */}
    <div className="space-y-4">
      <Skeleton variant="title" width="200px" />
      <SkeletonList items={4} />
    </div>
  </div>
);