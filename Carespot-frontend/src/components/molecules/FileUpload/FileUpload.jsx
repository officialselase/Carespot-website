import { useState, useRef, useCallback } from 'react';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';

const FileUpload = ({
    accept = '*/*',
    multiple = false,
    maxSize = 10 * 1024 * 1024, // 10MB default
    maxFiles = 5,
    onFilesChange,
    onError,
    disabled = false,
    className = '',
    children
}) => {
    const [files, setFiles] = useState([]);
    const [dragActive, setDragActive] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const validateFile = useCallback((file) => {
        const errors = [];

        if (file.size > maxSize) {
            errors.push(`File size exceeds ${(maxSize / 1024 / 1024).toFixed(1)}MB limit`);
        }

        if (accept !== '*/*') {
            const acceptedTypes = accept.split(',').map(type => type.trim());
            const fileType = file.type;
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

            const isAccepted = acceptedTypes.some(type => {
                if (type.startsWith('.')) {
                    return type === fileExtension;
                }
                if (type.includes('*')) {
                    const baseType = type.split('/')[0];
                    return fileType.startsWith(baseType);
                }
                return type === fileType;
            });

            if (!isAccepted) {
                errors.push(`File type not accepted. Accepted types: ${accept}`);
            }
        }

        return errors;
    }, [accept, maxSize]);

    const processFiles = useCallback((newFiles) => {
        const fileArray = Array.from(newFiles);
        const validFiles = [];
        const errors = [];

        // Check total file count
        if (!multiple && fileArray.length > 1) {
            errors.push('Only one file is allowed');
            onError?.(errors);
            return;
        }

        if (files.length + fileArray.length > maxFiles) {
            errors.push(`Maximum ${maxFiles} files allowed`);
            onError?.(errors);
            return;
        }

        fileArray.forEach((file, index) => {
            const fileErrors = validateFile(file);
            if (fileErrors.length === 0) {
                const fileWithPreview = {
                    file,
                    id: Date.now() + index,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    preview: null
                };

                // Generate preview for images
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        fileWithPreview.preview = e.target.result;
                        setFiles(prev => prev.map(f =>
                            f.id === fileWithPreview.id ? fileWithPreview : f
                        ));
                    };
                    reader.readAsDataURL(file);
                }

                validFiles.push(fileWithPreview);
            } else {
                errors.push(`${file.name}: ${fileErrors.join(', ')}`);
            }
        });

        if (errors.length > 0) {
            onError?.(errors);
        }

        if (validFiles.length > 0) {
            const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
            setFiles(updatedFiles);
            onFilesChange?.(updatedFiles);
        }
    }, [files, multiple, maxFiles, validateFile, onError, onFilesChange]);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (disabled) return;

        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles?.length > 0) {
            processFiles(droppedFiles);
        }
    }, [disabled, processFiles]);

    const handleFileInput = useCallback((e) => {
        const selectedFiles = e.target.files;
        if (selectedFiles?.length > 0) {
            processFiles(selectedFiles);
        }
        // Reset input value to allow selecting the same file again
        e.target.value = '';
    }, [processFiles]);

    const removeFile = useCallback((fileId) => {
        const updatedFiles = files.filter(f => f.id !== fileId);
        setFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
    }, [files, onFilesChange]);

    const openFileDialog = useCallback(() => {
        if (!disabled) {
            fileInputRef.current?.click();
        }
    }, [disabled]);

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className={`w-full ${className}`}>
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={handleFileInput}
                className="hidden"
                disabled={disabled}
            />

            {/* Drop zone */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={openFileDialog}
                className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          transition-colors duration-200
          ${dragActive
                        ? 'border-primary-400 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
            >
                {children || (
                    <div className="space-y-2">
                        <Icon
                            name="upload"
                            className={`mx-auto h-12 w-12 ${dragActive ? 'text-primary-400' : 'text-gray-400'
                                }`}
                        />
                        <div className="text-sm text-gray-600">
                            <span className="font-medium text-primary-600 hover:text-primary-500">
                                Click to upload
                            </span>
                            {' '}or drag and drop
                        </div>
                        <p className="text-xs text-gray-500">
                            {accept === '*/*' ? 'Any file type' : accept} up to {(maxSize / 1024 / 1024).toFixed(1)}MB
                            {multiple && ` (max ${maxFiles} files)`}
                        </p>
                    </div>
                )}
            </div>

            {/* File previews */}
            {files.length > 0 && (
                <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">
                        Selected Files ({files.length})
                    </h4>
                    <div className="space-y-2">
                        {files.map((fileData) => (
                            <div
                                key={fileData.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                            >
                                <div className="flex items-center space-x-3">
                                    {/* Image preview */}
                                    {fileData.preview ? (
                                        <img
                                            src={fileData.preview}
                                            alt={fileData.name}
                                            className="w-10 h-10 object-cover rounded"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                                            <Icon name="file" className="w-5 h-5 text-gray-400" />
                                        </div>
                                    )}

                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {fileData.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatFileSize(fileData.size)}
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="small"
                                    onClick={() => removeFile(fileData.id)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Icon name="x" className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;