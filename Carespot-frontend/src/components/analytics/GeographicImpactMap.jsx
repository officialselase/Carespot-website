import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AnimatedCounter from '../atoms/AnimatedCounter/AnimatedCounter';

const GeographicImpactMap = ({ data }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [viewMode, setViewMode] = useState('impact'); // impact, donations, volunteers

  const getRegionColor = (region, mode) => {
    const maxValue = Math.max(...data.regions.map(r => r[mode]));
    const intensity = region[mode] / maxValue;
    
    if (mode === 'impact') {
      return `rgba(239, 68, 68, ${0.3 + intensity * 0.7})`; // Red scale
    } else if (mode === 'donations') {
      return `rgba(34, 197, 94, ${0.3 + intensity * 0.7})`; // Green scale
    } else {
      return `rgba(59, 130, 246, ${0.3 + intensity * 0.7})`; // Blue scale
    }
  };

  const formatValue = (value, mode) => {
    if (mode === 'donations') {
      return `$${value.toLocaleString()}`;
    }
    return value.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h3 className="text-xl font-bold text-color-text-primary">
          Geographic Impact Distribution
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-color-text-secondary">View by:</span>
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="impact">People Helped</option>
            <option value="donations">Donations</option>
            <option value="volunteers">Volunteers</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="relative">
              {/* Ghana Map Placeholder - In real implementation, use a proper map library */}
              <div className="aspect-[4/3] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <i className="fas fa-map text-4xl text-gray-400 mb-4"></i>
                  <p className="text-gray-500 font-medium">Interactive Ghana Map</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Click regions below to explore impact data
                  </p>
                </div>
                
                {/* Simulated map regions */}
                <div className="absolute inset-0 p-4">
                  <div className="grid grid-cols-3 gap-2 h-full">
                    {data.regions.slice(0, 6).map((region, index) => (
                      <div
                        key={region.name}
                        className={`rounded-lg border-2 cursor-pointer transition-all duration-300 flex items-center justify-center text-xs font-medium ${
                          selectedRegion?.name === region.name
                            ? 'border-red-500 shadow-lg scale-105'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: getRegionColor(region, viewMode) }}
                        onClick={() => setSelectedRegion(region)}
                      >
                        <div className="text-center p-2">
                          <div className="font-semibold text-gray-800">
                            {region.name.split(' ')[0]}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {formatValue(region[viewMode], viewMode)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-color-text-secondary">Impact Level:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: getRegionColor({ [viewMode]: 0.2 * Math.max(...data.regions.map(r => r[viewMode])) }, viewMode) }}></div>
                    <span className="text-xs text-gray-500">Low</span>
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: getRegionColor({ [viewMode]: 0.6 * Math.max(...data.regions.map(r => r[viewMode])) }, viewMode) }}></div>
                    <span className="text-xs text-gray-500">Medium</span>
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: getRegionColor({ [viewMode]: Math.max(...data.regions.map(r => r[viewMode])) }, viewMode) }}></div>
                    <span className="text-xs text-gray-500">High</span>
                  </div>
                </div>
                
                <div className="text-sm text-color-text-secondary">
                  Coverage: <span className="font-semibold text-color-text-primary">{data.coverage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Region Details */}
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-semibold text-color-text-primary mb-4">
              National Overview
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-color-text-secondary">Total Regions</span>
                <span className="font-semibold text-color-text-primary">
                  {data.totalRegions}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-color-text-secondary">Coverage</span>
                <span className="font-semibold text-green-600">
                  {data.coverage}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-color-text-secondary">Total Impact</span>
                <AnimatedCounter
                  target={data.regions.reduce((sum, region) => sum + region.impact, 0)}
                  className="font-semibold text-color-text-primary"
                  duration={2000}
                />
              </div>
            </div>
          </div>

          {/* Selected Region Details */}
          {selectedRegion ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h4 className="font-semibold text-color-text-primary mb-4">
                {selectedRegion.name} Region
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-color-text-secondary">People Helped</span>
                  <AnimatedCounter
                    target={selectedRegion.impact}
                    className="font-semibold text-color-text-primary"
                    duration={1500}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-color-text-secondary">Donations</span>
                  <AnimatedCounter
                    target={selectedRegion.donations}
                    prefix="$"
                    className="font-semibold text-green-600"
                    duration={1500}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-color-text-secondary">Volunteers</span>
                  <AnimatedCounter
                    target={selectedRegion.volunteers}
                    className="font-semibold text-blue-600"
                    duration={1500}
                  />
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="text-xs text-color-text-secondary mb-2">Impact Distribution</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${(selectedRegion.impact / Math.max(...data.regions.map(r => r.impact))) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-6 text-center">
              <i className="fas fa-mouse-pointer text-2xl text-gray-400 mb-3"></i>
              <p className="text-gray-500 font-medium">Select a Region</p>
              <p className="text-sm text-gray-400 mt-1">
                Click on a region in the map to view detailed impact data
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Regional Rankings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h4 className="font-semibold text-color-text-primary mb-6">
          Regional Impact Rankings
        </h4>
        <div className="space-y-3">
          {data.regions
            .sort((a, b) => b[viewMode] - a[viewMode])
            .map((region, index) => (
              <div
                key={region.name}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                  selectedRegion?.name === region.name
                    ? 'bg-red-50 border border-red-200'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedRegion(region)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-800' :
                    index === 2 ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-color-text-primary">
                      {region.name}
                    </div>
                    <div className="text-sm text-color-text-secondary">
                      {region.volunteers} volunteers active
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-color-text-primary">
                    {formatValue(region[viewMode], viewMode)}
                  </div>
                  <div className="text-sm text-color-text-secondary">
                    {viewMode === 'impact' ? 'people helped' :
                     viewMode === 'donations' ? 'donated' : 'volunteers'}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

GeographicImpactMap.propTypes = {
  data: PropTypes.shape({
    regions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        impact: PropTypes.number.isRequired,
        donations: PropTypes.number.isRequired,
        volunteers: PropTypes.number.isRequired,
      })
    ).isRequired,
    totalRegions: PropTypes.number.isRequired,
    coverage: PropTypes.number.isRequired,
  }).isRequired,
};

export default GeographicImpactMap;