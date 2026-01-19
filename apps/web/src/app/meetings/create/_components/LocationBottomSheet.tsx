'use client';

import { useEffect, useMemo, useState } from 'react';

import { Station } from '@/app/meetings/create/_models/types';
import BottomSheet from '@/components/ui/BottomSheet';
import Input from '@/components/ui/Input';
import { useInputState } from '@/hooks/useInputState';
import { stationsApi } from '@/services/stations';

import LocationItem from './LocationItem';

interface LocationBottomSheetProps {
  isOpen: boolean;
  onStationSelect: (station: Station) => void;
  onClose: () => void;
}

const LocationBottomSheet = ({ isOpen, onStationSelect, onClose }: LocationBottomSheetProps) => {
  const [stations, setStations] = useState<Station[]>([]);
  const { value, handleChange, handleClear } = useInputState('');

  useEffect(() => {
    const getStations = async () => {
      const stations = await stationsApi.getStations();
      setStations(stations);
    };

    getStations();
  }, []);

  const filteredStations = useMemo(() => {
    const query = value.trim();
    if (!query) return [];
    return stations.filter((station: Station) => station.name.startsWith(query)).slice(0, 10);
  }, [value, stations]);

  const handleClickStation = (station: Station) => {
    onStationSelect(station);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <BottomSheet title="모임 장소" showCloseButton onClose={onClose}>
      <div className="flex h-150 flex-col gap-2">
        <Input
          type="search"
          value={value}
          onChange={handleChange}
          onClear={handleClear}
          showClearButton
          placeholder="지하철역으로 검색"
        />

        {filteredStations.length > 0 && (
          <div className="mt-3 overflow-y-auto">
            {filteredStations.map((station) => (
              <LocationItem
                key={station.id}
                station={station}
                searchQuery={value.trim()}
                onClick={() => handleClickStation(station)}
              />
            ))}
          </div>
        )}

        {value && filteredStations.length === 0 && (
          <div className="mt-12 text-center text-neutral-500">검색 결과가 없습니다</div>
        )}
      </div>
    </BottomSheet>
  );
};

export default LocationBottomSheet;
