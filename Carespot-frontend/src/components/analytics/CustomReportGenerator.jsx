import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CustomReportGenerator = ({ dashboardData }) => {
  const [reportConfig, setReportConfig] = useState({
    title: '',
    dateRange: 'last30days',
    metrics: [],
    format: 'pdf',
    recipients: '',
    schedule: 'manual'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReports, setGeneratedReports] = useState([
    {
      id: 1,
      title: 'Monthly Impact Report - June 2024',
      type: 'Impact Summary',
      generatedAt: '2024-06-30T10:30:00Z',
      format: 'PDF',
      size: '2.4 MB',
      downloads: 15
    },
    {
      id: 2,
      title: 'Volunteer Engagement Analysis',
      type: 'Volunteer Metrics',
      generatedAt: '2024-06-28T14:15:00Z',
      format: 'Excel',
      size: '1.8 MB',
      downloads: 8
    },
    {
      id: 3,
      title: 'Donation Trends Q2 2024',
      type: 'Financial Report',
      generatedAt: '2024-06-25T09:45:00Z',
      format: 'PDF',
      size: '3.1 MB',
      downloads: 22
    }
  ]);

  const availableMetrics = [
    { id: 'donations', label: 'Donation Analytics', category: 'Financial' },
    { id: 'volunteers', label: 'Volunteer Metrics', category: 'Human Resources' },
    { id: 'impact', label: 'Community Impact', category: 'Impact' },
    { id: 'geography', label: 'Geographic Distribution', category: 'Geographic' },
    { id: 'engagement', label: 'User Engagement', category: 'Engagement' },
    { id: 'projects', label: 'Project Performance', category: 'Projects' },
    { id: 'growth', label: 'Growth Metrics', category: 'Analytics' },
    { id: 'retention', label: 'Retention Analysis', category: 'Analytics' }
  ];

  const reportTemplates = [
    {
      id: 'monthly-impact',
      name: 'Monthly Impact Report',
      description: 'Comprehensive overview of monthly activities and impact',
      metrics: ['donations', 'volunteers', 'impact', 'projects']
    },
    {
      id: 'donor-analysis',
      name: 'Donor Analysis Report',
      description: 'Detailed analysis of donation patterns and donor behavior',
      metrics: ['donations', 'geography', 'engagement', 'retention']
    },
    {
      id: 'volunteer-report',
      name: 'Volunteer Performance Report',
      description: 'Volunteer engagement, skills, and retention analysis',
      metrics: ['volunteers', 'engagement', 'retention', 'projects']
    },
    {
      id: 'executive-summary',
      name: 'Executive Summary',
      description: 'High-level overview for stakeholders and board members',
      metrics: ['donations', 'volunteers', 'impact', 'growth']
    }
  ];

  const handleMetricToggle = (metricId) => {
    setReportConfig(prev => ({
      ...prev,
      metrics: prev.metrics.includes(metricId)
        ? prev.metrics.filter(id => id !== metricId)
        : [...prev.metrics, metricId]
    }));
  };

  const handleTemplateSelect = (template) => {
    setReportConfig(prev => ({
      ...prev,
      title: template.name,
      metrics: template.metrics
    }));
  };

  const handleGenerateReport = async () => {
    if (!reportConfig.title || reportConfig.metrics.length === 0) {
      alert('Please provide a report title and select at least one metric.');
      return;
    }

    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      const newReport = {
        id: generatedReports.length + 1,
        title: reportConfig.title,
        type: 'Custom Report',
        generatedAt: new Date().toISOString(),
        format: reportConfig.format.toUpperCase(),
        size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
        downloads: 0
      };
      
      setGeneratedReports(prev => [newReport, ...prev]);
      setIsGenerating(false);
      
      // Reset form
      setReportConfig({
        title: '',
        dateRange: 'last30days',
        metrics: [],
        format: 'pdf',
        recipients: '',
        schedule: 'manual'
      });
    }, 3000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-color-text-primary">
          Custom Report Generator
        </h3>
        <div className="flex items-center gap-2 text-sm text-color-text-secondary">
          <i className="fas fa-info-circle"></i>
          <span>Generate tailored reports for stakeholders</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Report Configuration */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-semibold text-color-text-primary mb-4">
              Report Configuration
            </h4>
            
            <div className="space-y-4">
              {/* Report Title */}
              <div>
                <label className="block text-sm font-medium text-color-text-secondary mb-2">
                  Report Title
                </label>
                <input
                  type="text"
                  value={reportConfig.title}
                  onChange={(e) => setReportConfig(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter report title..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-color-text-secondary mb-2">
                  Date Range
                </label>
                <select
                  value={reportConfig.dateRange}
                  onChange={(e) => setReportConfig(prev => ({ ...prev, dateRange: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="last7days">Last 7 days</option>
                  <option value="last30days">Last 30 days</option>
                  <option value="last3months">Last 3 months</option>
                  <option value="last6months">Last 6 months</option>
                  <option value="lastyear">Last year</option>
                  <option value="custom">Custom range</option>
                </select>
              </div>

              {/* Format */}
              <div>
                <label className="block text-sm font-medium text-color-text-secondary mb-2">
                  Export Format
                </label>
                <div className="flex gap-3">
                  {['pdf', 'excel', 'csv'].map((format) => (
                    <label key={format} className="flex items-center">
                      <input
                        type="radio"
                        name="format"
                        value={format}
                        checked={reportConfig.format === format}
                        onChange={(e) => setReportConfig(prev => ({ ...prev, format: e.target.value }))}
                        className="mr-2"
                      />
                      <span className="text-sm text-color-text-primary capitalize">
                        {format}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Recipients */}
              <div>
                <label className="block text-sm font-medium text-color-text-secondary mb-2">
                  Email Recipients (optional)
                </label>
                <input
                  type="text"
                  value={reportConfig.recipients}
                  onChange={(e) => setReportConfig(prev => ({ ...prev, recipients: e.target.value }))}
                  placeholder="email1@example.com, email2@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Quick Templates */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-semibold text-color-text-primary mb-4">
              Quick Templates
            </h4>
            <div className="space-y-3">
              {reportTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-3 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 cursor-pointer transition-colors"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="font-medium text-color-text-primary">
                    {template.name}
                  </div>
                  <div className="text-sm text-color-text-secondary mt-1">
                    {template.description}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {template.metrics.map((metricId) => {
                      const metric = availableMetrics.find(m => m.id === metricId);
                      return (
                        <span
                          key={metricId}
                          className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded"
                        >
                          {metric?.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics Selection */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-semibold text-color-text-primary mb-4">
              Select Metrics to Include
            </h4>
            
            <div className="space-y-4">
              {Object.entries(
                availableMetrics.reduce((acc, metric) => {
                  if (!acc[metric.category]) acc[metric.category] = [];
                  acc[metric.category].push(metric);
                  return acc;
                }, {})
              ).map(([category, metrics]) => (
                <div key={category}>
                  <h5 className="font-medium text-color-text-secondary mb-2">
                    {category}
                  </h5>
                  <div className="space-y-2">
                    {metrics.map((metric) => (
                      <label
                        key={metric.id}
                        className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={reportConfig.metrics.includes(metric.id)}
                          onChange={() => handleMetricToggle(metric.id)}
                          className="mr-3"
                        />
                        <span className="text-sm text-color-text-primary">
                          {metric.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <button
              onClick={handleGenerateReport}
              disabled={isGenerating || !reportConfig.title || reportConfig.metrics.length === 0}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                isGenerating || !reportConfig.title || reportConfig.metrics.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center gap-2">
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Generating Report...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <i className="fas fa-file-alt"></i>
                  <span>Generate Report</span>
                </div>
              )}
            </button>
            
            {reportConfig.metrics.length > 0 && (
              <p className="text-sm text-color-text-secondary mt-2 text-center">
                {reportConfig.metrics.length} metric{reportConfig.metrics.length !== 1 ? 's' : ''} selected
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Generated Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-semibold text-color-text-primary">
            Generated Reports
          </h4>
          <span className="text-sm text-color-text-secondary">
            {generatedReports.length} report{generatedReports.length !== 1 ? 's' : ''} available
          </span>
        </div>

        <div className="space-y-3">
          {generatedReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  report.format === 'PDF' ? 'bg-red-100 text-red-600' :
                  report.format === 'EXCEL' ? 'bg-green-100 text-green-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <i className={`fas ${
                    report.format === 'PDF' ? 'fa-file-pdf' :
                    report.format === 'EXCEL' ? 'fa-file-excel' :
                    'fa-file-csv'
                  }`}></i>
                </div>
                <div>
                  <div className="font-medium text-color-text-primary">
                    {report.title}
                  </div>
                  <div className="text-sm text-color-text-secondary">
                    {report.type} • Generated {formatDate(report.generatedAt)} • {report.size}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-color-text-secondary">
                  {report.downloads} downloads
                </span>
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded transition-colors">
                  <i className="fas fa-download mr-1"></i>
                  Download
                </button>
                <button className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-600 text-sm font-medium rounded transition-colors">
                  <i className="fas fa-share mr-1"></i>
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

CustomReportGenerator.propTypes = {
  dashboardData: PropTypes.object.isRequired,
};

export default CustomReportGenerator;