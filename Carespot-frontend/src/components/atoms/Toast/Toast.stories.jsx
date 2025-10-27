import { useState } from 'react';
import Toast from './Toast';
import { ToastProvider, useToast } from './ToastContainer';
import Button from '../Button/Button';

export default {
  title: 'Atoms/Toast',
  component: Toast,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
    },
  },
};

export const Default = {
  args: {
    type: 'info',
    title: 'Information',
    message: 'This is an informational message.',
    dismissible: true,
  },
};

export const Success = {
  args: {
    type: 'success',
    title: 'Success!',
    message: 'Your donation has been processed successfully.',
    dismissible: true,
  },
};

export const Error = {
  args: {
    type: 'error',
    title: 'Error',
    message: 'There was an error processing your request. Please try again.',
    dismissible: true,
  },
};

export const Warning = {
  args: {
    type: 'warning',
    title: 'Warning',
    message: 'Please verify your information before proceeding.',
    dismissible: true,
  },
};

export const WithoutTitle = {
  args: {
    type: 'info',
    message: 'This toast has no title, just a message.',
    dismissible: true,
  },
};

export const NonDismissible = {
  args: {
    type: 'error',
    title: 'Critical Error',
    message: 'This error requires immediate attention.',
    dismissible: false,
    duration: 0,
  },
};

// Interactive demo component
const ToastDemo = () => {
  const { success, error, warning, info } = useToast();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Toast Notification Demo</h3>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => success('Donation successful!', { title: 'Thank you!' })}
          variant="primary"
        >
          Success Toast
        </Button>
        <Button
          onClick={() => error('Payment failed. Please try again.', { title: 'Payment Error' })}
          variant="danger"
        >
          Error Toast
        </Button>
        <Button
          onClick={() => warning('Please verify your email address.', { title: 'Verification Required' })}
          variant="warning"
        >
          Warning Toast
        </Button>
        <Button
          onClick={() => info('New volunteer opportunities available!', { title: 'Update' })}
          variant="secondary"
        >
          Info Toast
        </Button>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Click the buttons above to see toast notifications appear in the top-right corner.
          They will automatically dismiss after 5 seconds or can be manually closed.
        </p>
      </div>
    </div>
  );
};

export const InteractiveDemo = () => (
  <ToastProvider position="top-right">
    <ToastDemo />
  </ToastProvider>
);

export const AllTypes = () => {
  const [toasts, setToasts] = useState([
    { id: 1, type: 'success', title: 'Success!', message: 'Operation completed successfully.' },
    { id: 2, type: 'error', title: 'Error', message: 'Something went wrong.' },
    { id: 3, type: 'warning', title: 'Warning', message: 'Please check your input.' },
    { id: 4, type: 'info', title: 'Info', message: 'Here is some information.' },
  ]);

  const handleDismiss = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="space-y-4 max-w-md">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          {...toast}
          onDismiss={handleDismiss}
        />
      ))}
    </div>
  );
};