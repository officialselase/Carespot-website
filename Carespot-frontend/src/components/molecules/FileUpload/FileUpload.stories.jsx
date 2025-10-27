import FileUpload from './FileUpload';

export default {
  title: 'Molecules/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  args: {
    onFilesChange: (files) => console.log('Files changed:', files),
    onError: (errors) => console.error('Upload errors:', errors),
  },
};

export const SingleImageOnly = {
  args: {
    accept: 'image/*',
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
    onFilesChange: (files) => console.log('Image files:', files),
    onError: (errors) => console.error('Image upload errors:', errors),
  },
};

export const MultipleDocuments = {
  args: {
    accept: '.pdf,.doc,.docx,.txt',
    multiple: true,
    maxFiles: 10,
    maxSize: 10 * 1024 * 1024, // 10MB
    onFilesChange: (files) => console.log('Document files:', files),
    onError: (errors) => console.error('Document upload errors:', errors),
  },
};

export const SmallFilesOnly = {
  args: {
    accept: '*/*',
    multiple: true,
    maxFiles: 5,
    maxSize: 1024 * 1024, // 1MB
    onFilesChange: (files) => console.log('Small files:', files),
    onError: (errors) => console.error('Small file errors:', errors),
  },
};

export const Disabled = {
  args: {
    disabled: true,
    onFilesChange: (files) => console.log('Files (disabled):', files),
    onError: (errors) => console.error('Upload errors (disabled):', errors),
  },
};

export const CustomContent = {
  args: {
    onFilesChange: (files) => console.log('Custom files:', files),
    onError: (errors) => console.error('Custom upload errors:', errors),
    children: (
      <div className="space-y-2">
        <div className="text-4xl">📁</div>
        <div className="text-lg font-medium text-gray-700">
          Drop your files here
        </div>
        <div className="text-sm text-gray-500">
          Or click to browse
        </div>
      </div>
    ),
  },
};

export const VideoUpload = {
  args: {
    accept: 'video/*',
    multiple: false,
    maxSize: 100 * 1024 * 1024, // 100MB
    onFilesChange: (files) => console.log('Video files:', files),
    onError: (errors) => console.error('Video upload errors:', errors),
  },
};