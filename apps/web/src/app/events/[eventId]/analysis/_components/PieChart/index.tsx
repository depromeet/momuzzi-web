'use client';
import { useState } from 'react';

import { PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

import { cn } from '@/lib/cn';

import { CHART_THEME, PIE_GRADIENTS } from './chart';

type ChartData = Record<string, unknown> & {
  name: string;
  value: number;
};

//-------------------------------- LegendItem 컴포넌트 --------------------------------
interface LegendItemProps {
  chartData: ChartData;
  index: number;
  activeIndex: number | null;
  onClick: () => void;
}

const LegendItem = ({ chartData, index, activeIndex, onClick }: LegendItemProps) => {
  const isFirst = index === 0;
  const isInactive = index !== activeIndex && activeIndex !== null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('flex items-center gap-2', isInactive && 'opacity-20', isFirst && 'mb-2')}
    >
      <div
        className="h-2 w-2 rounded-full"
        style={{ background: PIE_GRADIENTS[index].stops[0].color }}
      />
      <div
        className={cn(
          'flex items-center gap-2 body-3 font-semibold text-white',
          isFirst && 'text-[22px] font-bold'
        )}
      >
        <span>{chartData.name}</span>
        <span>{chartData.value}명</span>
      </div>
    </button>
  );
};

//-------------------------------- PieChart 컴포넌트 --------------------------------
interface PieChartProps {
  data: ChartData[];
}

const PieChart = ({ data }: PieChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleIndexChange = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div
      style={{
        background: CHART_THEME.background,
      }}
      className="flex w-full flex-col items-center gap-6 rounded-[2.25rem] py-8"
    >
      <div className="flex w-full items-center px-6">
        <RechartsPieChart width={100} height={100}>
          <defs>
            {PIE_GRADIENTS.map(({ id, stops }) => (
              <linearGradient key={id} id={id} gradientUnits="userSpaceOnUse">
                {stops.map(({ offset, color }) => (
                  <stop key={offset} offset={offset} stopColor={color} />
                ))}
              </linearGradient>
            ))}
          </defs>

          <Pie
            data={data}
            stroke="none"
            dataKey="value"
            focusable={false}
            className="focus-visible:outline-none"
            outerRadius={50}
            innerRadius={17}
            cornerRadius={10}
            endAngle={450}
            paddingAngle={7}
            onClick={(_entry: unknown, index: number) => handleIndexChange(index)}
          >
            {data.map((_, index) => {
              const isActive = activeIndex === null || activeIndex === index;
              return (
                <Cell
                  key={`cell-${data[index].name}`}
                  fill={`url(#color${index})`}
                  focusable={false}
                  style={{
                    transition: 'opacity 0.3s ease-in-out',
                    cursor: 'pointer',
                    opacity: isActive ? 1 : 0.2,
                  }}
                />
              );
            })}
          </Pie>
        </RechartsPieChart>
        <div className="flex flex-grow flex-col items-center gap-3">
          <span
            className="rounded-sm px-2 label-2 font-semibold"
            style={{
              color: CHART_THEME.labelColor,
              background: CHART_THEME.labelBackground,
            }}
          >
            {CHART_THEME.label}
          </span>
          <div className="flex flex-col items-center gap-2">
            {data.map((chartData, index) => (
              <LegendItem
                key={chartData.name}
                chartData={chartData}
                index={index}
                activeIndex={activeIndex}
                onClick={() => handleIndexChange(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
