import React, { useState } from 'react';
import { JournalEntry } from '../data/journalData';
import { TrendingUp, Calendar, Sprout, BarChart3, Filter } from 'lucide-react';

interface JournalChartProps {
  entries: JournalEntry[];
}

export const JournalChart: React.FC<JournalChartProps> = ({ entries }) => {
  const [metric, setMetric] = useState<'actions' | 'plastic' | 'compost'>('actions');
  const [timeRange, setTimeRange] = useState<'7d' | '14d' | '30d'>('14d');

  // Generate date slots for the selected window
  const daysCount = timeRange === '7d' ? 7 : timeRange === '14d' ? 14 : 30;

  const chartData = React.useMemo(() => {
    const today = new Date();
    const dataPoints: {
      dateStr: string; // YYYY-MM-DD
      displayDate: string; // "24 Sep"
      displayDay: string; // "Wed"
      actions: number;
      plastic: number;
      compostGrams: number;
    }[] = [];

    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const displayDate = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
      const displayDay = d.toLocaleDateString('en-US', { weekday: 'narrow' });

      // Match entries for this date
      const matchingEntries = entries.filter(e => e.date === dateStr);
      const actionsCount = matchingEntries.reduce((acc, curr) => acc + (curr.count || 1), 0);
      const plasticCount = matchingEntries.reduce((acc, curr) => acc + (curr.estimatedPlasticAvoided || 0), 0);
      const compostGrams = matchingEntries.reduce((acc, curr) => acc + (curr.estimatedCompostGrams || 0), 0);

      dataPoints.push({
        dateStr,
        displayDate,
        displayDay,
        actions: actionsCount,
        plastic: plasticCount,
        compostGrams
      });
    }

    return dataPoints;
  }, [entries, daysCount]);

  // Compute maximum value for scaling
  const maxValue = React.useMemo(() => {
    const vals = chartData.map(d => {
      if (metric === 'actions') return d.actions;
      if (metric === 'plastic') return d.plastic;
      return d.compostGrams;
    });
    const max = Math.max(...vals, 1);
    // Round up for clean chart ceiling
    return Math.max(max, metric === 'compost' ? 200 : 4);
  }, [chartData, metric]);

  const totalValue = React.useMemo(() => {
    return chartData.reduce((acc, curr) => {
      if (metric === 'actions') return acc + curr.actions;
      if (metric === 'plastic') return acc + curr.plastic;
      return acc + curr.compostGrams;
    }, 0);
  }, [chartData, metric]);

  // SVG coordinate calculations for pristine responsive Line Chart
  const svgWidth = 800;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  const points = chartData.map((d, index) => {
    const val = metric === 'actions' ? d.actions : metric === 'plastic' ? d.plastic : d.compostGrams;
    const x = paddingX + (index / (chartData.length - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - (val / maxValue) * (svgHeight - paddingY * 2);
    return { x, y, val, ...d };
  });

  // Construct SVG path string (Bezier or smooth line)
  const linePath = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
  }, '');

  // Construct filled area path
  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x},${svgHeight - paddingY} L ${points[0].x},${svgHeight - paddingY} Z`
    : '';

  const getMetricTitle = () => {
    switch (metric) {
      case 'actions': return 'Daily Sustainable Actions Logged';
      case 'plastic': return 'Single-Use Plastics Diverted';
      case 'compost': return 'Grams of Soil Humus Generated';
    }
  };

  const getUnit = () => {
    switch (metric) {
      case 'actions': return 'actions';
      case 'plastic': return 'items';
      case 'compost': return 'g';
    }
  };

  return (
    <div className="bg-[#FAF2EB] border-2 border-[#843E1F]/20 rounded-2xl p-6 sm:p-8 space-y-6">
      
      {/* Chart Control Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8D4C4] pb-5">
        <div>
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#843E1F] mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>Adoption Trend Visualization</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#24211D]">
            {getMetricTitle()}
          </h3>
          <p className="text-xs text-[#6B5A4E] mt-0.5">
            Total for this period: <strong className="text-[#843E1F] text-sm tabular-nums">{totalValue.toLocaleString()} {getUnit()}</strong>
          </p>
        </div>

        {/* Metric and Range Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Metric Selector */}
          <div className="flex items-center bg-[#F2ECE2] p-1 rounded-xl border border-[#DECDBB]">
            <button
              onClick={() => setMetric('actions')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                metric === 'actions'
                  ? 'bg-[#843E1F] text-white shadow-xs'
                  : 'text-[#6B5A4E] hover:text-[#24211D]'
              }`}
            >
              Actions
            </button>
            <button
              onClick={() => setMetric('plastic')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                metric === 'plastic'
                  ? 'bg-[#843E1F] text-white shadow-xs'
                  : 'text-[#6B5A4E] hover:text-[#24211D]'
              }`}
            >
              Plastic Diverted
            </button>
            <button
              onClick={() => setMetric('compost')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                metric === 'compost'
                  ? 'bg-[#2D4A3E] text-white shadow-xs'
                  : 'text-[#6B5A4E] hover:text-[#24211D]'
              }`}
            >
              Soil Humus (g)
            </button>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center bg-[#F2ECE2] p-1 rounded-xl border border-[#DECDBB]">
            {(['7d', '14d', '30d'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors uppercase ${
                  timeRange === range
                    ? 'bg-[#3B2616] text-[#FBF9F5] shadow-xs'
                    : 'text-[#786657] hover:text-[#24211D]'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Line Chart Canvas */}
      <div className="relative bg-[#FBF9F5] border border-[#DECDBB] rounded-xl p-4 sm:p-6 shadow-xs overflow-hidden">
        
        {/* Metric Ceiling Legend */}
        <div className="flex items-center justify-between text-[11px] text-[#8C7A6D] mb-2 font-mono">
          <span>Scale Max: {maxValue} {getUnit()}</span>
          <span>Timeline: {chartData[0]?.displayDate} &rarr; {chartData[chartData.length - 1]?.displayDate}</span>
        </div>

        {/* SVG Graphic */}
        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-48 sm:h-56 overflow-visible"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={metric === 'compost' ? '#2D4A3E' : '#843E1F'} stopOpacity="0.25" />
                <stop offset="100%" stopColor={metric === 'compost' ? '#2D4A3E' : '#843E1F'} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = svgHeight - paddingY - ratio * (svgHeight - paddingY * 2);
              const gridVal = Math.round(ratio * maxValue);
              return (
                <g key={i}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={svgWidth - paddingX}
                    y2={y}
                    stroke="#E6D9C8"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text
                    x={paddingX - 8}
                    y={y + 3}
                    textAnchor="end"
                    className="text-[9px] fill-[#8C7A6D] font-mono"
                  >
                    {gridVal}
                  </text>
                </g>
              );
            })}

            {/* Area Fill */}
            {points.length > 1 && (
              <path
                d={areaPath}
                fill="url(#chartGradient)"
              />
            )}

            {/* Main Trend Line */}
            {points.length > 1 && (
              <path
                d={linePath}
                fill="none"
                stroke={metric === 'compost' ? '#2D4A3E' : '#843E1F'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Data Points and Interactivity */}
            {points.map((pt, i) => {
              const isHighlight = pt.val > 0;
              return (
                <g key={i} className="group cursor-pointer">
                  {/* Vertical hover indicator */}
                  <line
                    x1={pt.x}
                    y1={paddingY}
                    x2={pt.x}
                    y2={svgHeight - paddingY}
                    stroke="#D9C8B5"
                    strokeWidth="1"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />

                  {/* Dot */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHighlight ? 4.5 : 2.5}
                    className={`transition-transform duration-200 group-hover:scale-150 ${
                      isHighlight
                        ? metric === 'compost'
                          ? 'fill-[#2D4A3E] stroke-white stroke-2'
                          : 'fill-[#843E1F] stroke-white stroke-2'
                        : 'fill-[#C9B7A5]'
                    }`}
                  />

                  {/* Data Tooltip on Hover */}
                  <g className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <rect
                      x={Math.min(Math.max(pt.x - 45, 10), svgWidth - 100)}
                      y={pt.y - 34}
                      width="90"
                      height="26"
                      rx="6"
                      fill="#24211D"
                    />
                    <text
                      x={Math.min(Math.max(pt.x, 55), svgWidth - 55)}
                      y={pt.y - 17}
                      textAnchor="middle"
                      className="text-[10px] fill-white font-medium font-mono"
                    >
                      {pt.val} {getUnit()} ({pt.displayDate})
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* X-Axis Dates Labels */}
        <div className="flex justify-between items-center px-4 pt-2 text-[10px] text-[#786657] font-medium border-t border-[#E6D9C8]">
          {points.filter((_, idx) => {
            if (timeRange === '7d') return true;
            if (timeRange === '14d') return idx % 2 === 0;
            return idx % 4 === 0;
          }).map((pt, idx) => (
            <div key={idx} className="text-center">
              <span className="block text-[9px] text-[#8C7A6D]">{pt.displayDay}</span>
              <span>{pt.displayDate}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Narrative Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#594B40]">
        <div className="p-3 bg-[#FBF9F5] border border-[#E6D9C8] rounded-xl flex items-start gap-2">
          <Calendar className="w-4 h-4 text-[#843E1F] shrink-0 mt-0.5" />
          <span>
            <strong>Consistency Index:</strong> {chartData.filter(d => d.actions > 0).length} of {daysCount} days logged with active zero-waste practices.
          </span>
        </div>
        <div className="p-3 bg-[#FBF9F5] border border-[#E6D9C8] rounded-xl flex items-start gap-2">
          <Sprout className="w-4 h-4 text-[#2D4A3E] shrink-0 mt-0.5" />
          <span>
            <strong>Average Soil Return:</strong> {(totalValue / daysCount).toFixed(1)} {getUnit()} per day returned clean to the biosphere.
          </span>
        </div>
        <div className="p-3 bg-[#FBF9F5] border border-[#E6D9C8] rounded-xl flex items-start gap-2">
          <BarChart3 className="w-4 h-4 text-[#843E1F] shrink-0 mt-0.5" />
          <span>
            <strong>Peak Progress Day:</strong> {points.reduce((max, p) => p.val > max.val ? p : max, points[0])?.displayDate} ({Math.max(...points.map(p => p.val))} {getUnit()}).
          </span>
        </div>
      </div>

    </div>
  );
};
