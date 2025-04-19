import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Image from 'next/image';
import { GEARS } from '@/constants/gear';

export default function GearSelector() {
  const { control, setValue } = useFormContext();
  const selectedGear: string[] = useWatch({ control, name: 'gear' }) ?? [];

  const handleChange = (item: string) => {
    if (selectedGear.includes(item)) {
      setValue(
        'gear',
        selectedGear.filter((g) => g !== item)
      );
    } else {
      setValue('gear', [...selectedGear, item]);
    }
  };

  useEffect(() => {
    if (!Array.isArray(selectedGear)) {
      setValue('gear', []); //초기화 없으면 react-hook-form이 gear 필드를 모름
    }
  }, [selectedGear, setValue]);

  return (
    <section className='border border-gray-200 rounded-xl px-6 py-5 space-y-4'>
      <div className='flex flex-wrap gap-4'>
        {GEARS.map(({ name, src }) => {
          const selected = selectedGear.includes(name);
          return (
            <div key={name} className='flex flex-col items-center space-y-1'>
              {/* 버튼만 선택 처리 */}
              <button
                type='button'
                onClick={() => handleChange(name)}
                className={`rounded-xl w-[80px] h-[80px] flex items-center justify-center border transition-all 
              ${
                selected
                  ? 'bg-blue-50 border-blue-300'
                  : 'bg-slate-100 border-slate-200 opacity-60 hover:opacity-100'
              }`}
              >
                <Image src={src} alt={name} width={40} height={40} />
              </button>
              {/* 텍스트는 버튼 외부 */}
              <span>{name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
