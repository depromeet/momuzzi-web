'use client';

import { useMemo } from 'react';

import { cn } from '@/app/_lib/cn';
import { MeetingOverview } from '@/app/_services/overview';
import { PIE_GRADIENTS } from '@/app/events/[eventId]/analysis/_components/PieChart/chart';
import { buildPreferenceSummary } from '@/app/events/[eventId]/analysis/_utils';

const MenuPreferenceList = ({ history }: { history: MeetingOverview }) => {
  const { leafCountsArr, currentUser } = buildPreferenceSummary(
    history?.participantList || [],
    history?.currentUserId
  );

  const myLeafIdsByMain = useMemo(() => {
    const map = new Map<number, Set<number>>();
    const byMain = currentUser?.leavesByMain || {};
    for (const [k, arr] of Object.entries(byMain)) {
      const mainId = Number(k);
      map.set(mainId, new Set(arr.map((l) => l.id)));
    }
    return map;
  }, [currentUser]);

  if (!leafCountsArr.length) {
    return (
      <section className="flex flex-col gap-3 px-4 py-6 text-neutral-600">
        아직 선택 정보가 없어요.
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-3">
      {leafCountsArr.map((mainCategory, index) => {
        if (mainCategory.mainId === 3) {
          return null;
        }
        return (
          <div key={mainCategory.mainId} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-4 py-1">
              <div
                className="h-2 w-2 rounded-full"
                style={{ background: PIE_GRADIENTS[index].stops[0].color }}
              />
              <span className="body-3 font-semibold text-white">{mainCategory.mainName}</span>
            </div>
            <div
              className={cn(
                'flex flex-wrap gap-3 px-4 pb-4',
                mainCategory.leaves.length === 0 && 'hidden'
              )}
            >
              {mainCategory.leaves.map((leaf) => {
                const isMyLeaf = myLeafIdsByMain.get(mainCategory.mainId)?.has(leaf.id);

                return (
                  <div
                    key={leaf.id}
                    className={cn(
                      'flex gap-2 rounded-[3.75rem] bg-neutral-1500 px-3 py-1',
                      isMyLeaf && 'bg-neutral-1400'
                    )}
                  >
                    <span className="body-3 font-semibold text-white">{leaf.name}</span>
                    <span className="body-3 font-semibold text-neutral-700">{leaf.count}명</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default MenuPreferenceList;
