import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const gears = ['킥판', '숏핀', '롱핀', '패들', '스노클'];

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
    <section className='border-1 border-gray-200 rounded space-y-4 p-4 m-4'>
      <h2 className='text-lg font-semibold mb-2'>장비</h2>
      <div className='flex flex-wrap gap-4'>
        {gears.map((item) => (
          <label key={item} className='flex items-center gap-1'>
            <input
              type='checkbox'
              checked={selectedGear.includes(item)} // 현재 선택 여부
              onChange={() => handleChange(item)} // 수동 토글
            />
            {item}
          </label>
        ))}
      </div>
    </section>
  );
}
