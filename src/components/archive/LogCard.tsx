import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
import { SwimLog } from '@/types/log';
import { StrokeChart } from './StrokeChart'; // 차트
import Image from 'next/image';
import { IoLocationSharp } from 'react-icons/io5';
import { getDurationFormat } from '@/utils/format';
import { toOneDecimal } from '@/utils/math';
import { GEARS } from '@/constants/gear';
import { IoChevronForward } from 'react-icons/io5';

interface Props {
  log: SwimLog;
}

export function LogCard({ log }: Props) {
  return (
    <Card className='rounded-2xl shadow-md'>
      <CardContent className='py-4 space-y-2'>
        {/* 상단 날짜 및 수영장 정보 */}
        <div className='flex justify-between'>
          <div className='flex justify-start text-sm text-muted-foreground items-center'>
            <div className='mr-1 '>{log.date}</div>|{' '}
            <div className='flex items-center ml-1'>
              <IoLocationSharp className='mr-1' />{' '}
              {log.pool ?? '수영장 정보 없음'}
              <span> ({log.lane}m)</span>
            </div>
          </div>
          <button className='flex items-center text-sm cursor-pointer hover:underline transition'>
            더보기
            <div className='flex items-center justify-start bg-slate-100 rounded-full w-4 h-4 ml-1'>
              <IoChevronForward className='font-bold ml-1 w-4 h-4 text-muted-foreground' />
            </div>
          </button>
        </div>

        {/* 일기 제목 */}
        {log.title && <div className='text-lg font-bold py-2'>{log.title}</div>}

        {/* 요약 정보: 거리, 바퀴, 시간, 강도 */}
        <div className='flex flex-wrap gap-4 items-center pt-1 pb-1'>
          {/* 거리 & 바퀴 */}
          <div className='text-xl text-blue-600 font-bold'>
            {log.distance?.toLocaleString()} m
          </div>
          <div className='text-sm text-gray-500'>
            {log.distance ? `${toOneDecimal(log.distance / 50)} 바퀴` : `거리`}
          </div>

          {/* 시간 */}
          <div className='text-xl text-blue-600 font-bold'>
            {getDurationFormat(log.startTime, log.endTime)}
          </div>
          <div className='text-sm text-gray-500'>
            {log.startTime.slice(0, 5)} - {log.endTime.slice(0, 5)}
          </div>

          {/* 강도 */}
          <div className='text-xl text-blue-600 font-bold'>{log.intensity}</div>
          <div className='text-sm text-gray-500'>운동강도</div>

          {/* (Todo) 수영 유형 */}
          {/* <Badge
            variant='outline'
            className='text-blue-600 border-blue-600 mr-2'
          >
            실내수영
          </Badge> */}
        </div>
        {/* 영법별 거리 시각화*/}
        {log.strokeInputMode === 'manual' &&
          log.strokeDistances &&
          Object.keys(log.strokeDistances).length > 0 && (
            <div className='max-w-[100%] sm:max-w-[80%] xs:max-w-full'>
              <StrokeChart data={log.strokeDistances} />
            </div>
          )}

        {/* 장비, 썸네일, 일기 여부 */}
        <div className='flex gap-4 items-center mt-4'>
          {log.gear?.length > 0 && (
            <div className='flex gap-4 items-center mt-2'>
              {log.gear?.map((g) => {
                const gearInfo = GEARS.find((item) => item.name === g);

                if (!gearInfo) return null;

                return (
                  <div key={g} className='flex flex-col items-center space-y-1'>
                    <div className='w-[56px] h-[56px] bg-slate-100 rounded-xl flex items-center justify-center'>
                      <Image
                        src={gearInfo.src}
                        alt={g}
                        width={32}
                        height={32}
                        className='object-contain opacity-60'
                      />
                    </div>
                    <span className='text-sm text-muted-foreground'>{g}</span>
                  </div>
                );
              })}
            </div>
          )}
          {/* 썸네일 */}
          {log.thumbnailUrl && (
            <div className='flex flex-col items-center space-y-1'>
              <Image
                src={log.thumbnailUrl}
                alt='썸네일'
                width={48}
                height={48}
                className='rounded-md object-cover'
              />

              <span className='text-sm text-muted-foreground'>사진</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
