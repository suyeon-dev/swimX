'use client';

import { STROKES_KR } from '@/constants/strokes';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

// Record : 특정 Key들을 가진 객체의 value 타입을 통일해서 지정하는 템플릿
const strokeColorMap: Record<string, string> = {
  freestyle: '#2784FC',
  butterfly: '#FAE164',
  backstroke: '#EC6344',
  breaststroke: '#21D081',
  kick: '#B95EFF',
  etc: '#D1D5DA',
};

interface Props {
  data: Record<string, number>;
}

export function StrokeChart({ data }: Props) {
  const strokes = Object.keys(data); //['freestyle', 'butterfly', ...]

  // Recharts에 전달할 차트 데이터 (strokes키들 포함하는 단일 객체 배열)
  // ex: [{ freestyle: 500, butterfly: 200, ... }]
  const chartData = [
    strokes.reduce((acc, key) => {
      acc[key] = data[key]; //각 key에 해당하는 값 누적
      return acc;
    }, {} as Record<string, number>), // 초기값 빈 객체로 시작
  ];

  return (
    <div className='flex flex-col gap-2'>
      {/* 누적 막대 */}
      <ResponsiveContainer width='100%' height={28}>
        <BarChart
          data={chartData}
          layout='vertical'
          barCategoryGap={0}
          margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
        >
          <XAxis type='number' hide />
          <YAxis type='category' dataKey='stroke' hide />
          <Tooltip
            wrapperStyle={{ zIndex: 10 }}
            content={({ payload }) => {
              if (!payload || payload.length === 0) return null;

              return (
                <div className='bg-white p-3 rounded-md shadow-lg border text-sm space-y-1'>
                  {payload.map(({ name, value }) => (
                    <div
                      key={name}
                      style={{
                        color: '#111827',
                        fontWeight: 500,
                      }}
                    >
                      {name} : {value}m
                    </div>
                  ))}
                </div>
              );
            }}
          />
          {/*  막대 렌더링 */}
          {strokes.map((stroke) => (
            <Bar
              key={stroke}
              dataKey={stroke} // 해당 막대를 나타내는 키
              stackId='1' //누적 막대로 처리 (stacked bar)
              fill={strokeColorMap[stroke] ?? '#000000'}
              radius={[0, 0, 0, 0]}
              isAnimationActive={false}
              style={{ opacity: 0.75 }}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      {/* 범례 */}
      <div className='flex items-center gap-4 text-sm mt-1 max-md:flex-wrap md:flex-nowrap'>
        {strokes.map((stroke) => (
          <div key={stroke} className='flex items-center gap-1 flex-nowrap'>
            <span
              className='w-3 h-3 rounded-full '
              style={{
                backgroundColor: strokeColorMap[stroke],
              }}
            />
            <span className='text-muted-foreground'>
              {STROKES_KR[stroke]}{' '}
              <span className='text-gray-700'>{data[stroke]}m</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
