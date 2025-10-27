import { useState, useEffect } from 'react';
import performanceMonitor from '../utils/performanceMonitor.js';

const PerformanceDashboard = ({ isVisible = false }) => {
  const [report, setReport] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const updateReport = () => {
      setReport(performanceMonitor.getReport());
    };

    // Initial report
    updateReport();

    // Update every 5 seconds
    const interval = setInterval(updateReport, 5000);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible || !report) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertColor = (level) => {
    switch (level) {
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Collapsed view */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className={`px-4 py-2 rounded-lg shadow-lg font-medium ${getStatusColor(report.summary.status)}`}
        >
          Performance: {report.summary.score}/100
        </button>
      )}

      {/* Expanded view */}
      {isExpanded && (
        <div className="bg-white rounded-lg shadow-xl border max-w-md w-80 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-gray-900">Performance Monitor</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="overflow-y-auto max-h-80">
            {/* Performance Score */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Score</span>
                <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(report.summary.status)}`}>
                  {report.summary.score}/100
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    report.summary.score >= 90 ? 'bg-green-500' :
                    report.summary.score >= 75 ? 'bg-blue-500' :
                    report.summary.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${report.summary.score}%` }}
                ></div>
              </div>
            </div>

            {/* Core Web Vitals */}
            <div className="p-4 border-b">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Core Web Vitals</h4>
              <div className="space-y-2">
                {['FCP', 'LCP', 'FID', 'CLS'].map(metric => {
                  const data = report.metrics[metric];
                  if (!data) return null;
                  
                  return (
                    <div key={metric} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{metric}</span>
                      <span className="font-mono">
                        {metric === 'CLS' ? data.current.toFixed(3) : `${Math.round(data.current)}ms`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Alerts */}
            {report.alerts.length > 0 && (
              <div className="p-4 border-b">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Alerts</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {report.alerts.slice(-5).map((alert, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded text-xs border ${getAlertColor(alert.level)}`}
                    >
                      <div className="font-medium capitalize">{alert.level}</div>
                      <div className="mt-1">{alert.message}</div>
                      <div className="text-xs opacity-75 mt-1">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {report.summary.recommendations.length > 0 && (
              <div className="p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Recommendations</h4>
                <div className="space-y-2">
                  {report.summary.recommendations.map((rec, index) => (
                    <div key={index} className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceDashboard;