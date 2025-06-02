import React, { useEffect, useState } from 'react';
import { BarChart, Bar } from 'recharts';

interface PaymentAnalyticsProps {
  data: { date: string; value: number }[];
}

const PaymentAnalytics: React.FC<PaymentAnalyticsProps> = ({ data }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [previousValue, setPreviousValue] = useState(0);
  const [percentChange, setPercentChange] = useState(0);

  useEffect(() => {
    if (data.length > 0) {
      setCurrentValue(data[data.length - 1].value);
      setPreviousValue(data.length > 1 ? data[data.length - 2].value : 0);
    }
  }, [data]);

  useEffect(() => {
    if (previousValue !== 0) {
      const percentChange = ((currentValue - previousValue) / previousValue * 100) as number;
      setPercentChange(percentChange);
    } else {
      setPercentChange(0);
    }
  }, [currentValue, previousValue]);

  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((item) => item.value));
    const dataMin = Math.min(...data.map((item) => item.value));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  return (
    <div className="bg-white/5 border-white/10 p-4 rounded-md">
      <h3 className="text-lg font-medium text-white mb-2">Payment Analytics</h3>
      <div className="flex items-baseline justify-between">
        <div className="space-y-2">
          <p className="text-2xl font-bold text-white">${currentValue.toFixed(2)}</p>
          <p className="text-sm text-gray-400">Total Revenue</p>
        </div>
        <div className={`text-sm font-medium ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
        </div>
      </div>
      <div className="mt-4">
        <BarChart width={300} height={100} data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="#8884d8" stopOpacity={1} />
              <stop offset={off} stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Bar dataKey="value" stroke="#8884d8" fill="url(#colorUv)" />
        </BarChart>
      </div>
    </div>
  );
};

export default PaymentAnalytics;
