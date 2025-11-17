import { CUISINE_MAP } from '@/app/_constants/cuisine';
import { MeetingParticipant, MenuItem } from '@/app/_services/overview';
import {
  CurrentUserSelection,
  LeafCountPerMain,
  MainCount,
} from '@/app/events/[eventId]/analysis/_models';

/** 표시명을 살짝 정제 (예: "동남아 음식" -> "동남아") */
const normalizeMainName = (name: string) => name.replace(/음식$/, '').trim();

/** 객체 얕은 복사 및 값 증분 */
const inc = <T,>(obj: Partial<Record<number, T>>, key: number, factory: () => T): T => {
  if (!obj[key]) obj[key] = factory();
  return obj[key];
};

// core utils -----------------------------------------------------------------
/**
 * 1) 큰 카테고리별 인원 수 (includeMainIds에 포함된 id만 집계)
 */
export function summarizeMainCounts(participants: MeetingParticipant[]): MainCount {
  const result: MainCount = {};

  for (const p of participants) {
    for (const cat of p.selectedCategories) {
      if (!(cat.id in CUISINE_MAP)) continue; // 존재하지 않는 카테고리는 무시

      const bucket = inc(result, cat.id, () => ({
        id: cat.id,
        name: normalizeMainName(cat.name),
        count: 0,
      }));
      bucket.count += 1;
    }
  }

  return result;
}

/**
 * 2) 메인 카테고리별 leaf(세부메뉴) 인원 수
 */
export function summarizeLeafCounts(participants: MeetingParticipant[]): LeafCountPerMain {
  const result: LeafCountPerMain = {};

  for (const p of participants) {
    for (const cat of p.selectedCategories) {
      if (!(cat.id in CUISINE_MAP)) continue; // 존재하지 않는 카테고리는 무시

      const mainBucket = inc(result, cat.id, () => ({
        mainId: cat.id,
        mainName: normalizeMainName(cat.name),
        total: 0,
        leaves: {} as Record<number, { id: number; name: string; count: number }>,
      }));

      // 한 사람이 해당 main을 선택했다는 의미에서 total +1
      mainBucket.total += 1;

      for (const leaf of cat.leafCategoryList) {
        const leafBucket = inc(mainBucket.leaves, leaf.id, () => ({
          id: leaf.id,
          name: leaf.name,
          count: 0,
        }));
        leafBucket.count += 1;
      }
    }
  }

  return result;
}

/**
 * 3) 현재 사용자 선택 추출
 */
export function getCurrentUserSelection(
  participants: MeetingParticipant[],
  currentUserId?: number
): CurrentUserSelection {
  const current = participants.find((p) => p.userId === currentUserId);
  if (!current) {
    return { userId: null, mainCategories: [], leavesByMain: {} };
  }

  const mainCategories = current.selectedCategories.map((c) => ({
    id: c.id,
    name: normalizeMainName(c.name),
  }));

  const leavesByMain: Record<number, MenuItem[]> = {};
  for (const c of current.selectedCategories) {
    leavesByMain[c.id] = c.leafCategoryList.map((l) => ({ id: l.id, name: l.name }));
  }

  return { userId: current.userId, mainCategories, leavesByMain };
}

/**
 * 종합 결과 한 번에
 */
export function buildPreferenceSummary(
  participantList: MeetingParticipant[],
  currentUserId?: number
) {
  const mainCounts = summarizeMainCounts(participantList);
  const leafCounts = summarizeLeafCounts(participantList);
  const currentUser = getCurrentUserSelection(participantList, currentUserId);

  // UI에 바로 뿌리기 좋게 정렬된 배열들도 같이 리턴 (count desc)
  const mainCountsArr = Object.values(mainCounts).sort((a, b) => b.count - a.count);

  const leafCountsArr = Object.values(leafCounts)
    .sort((a, b) => b.total - a.total)
    .map((m) => ({
      mainId: m.mainId,
      mainName: m.mainName,
      total: m.total,
      leaves: Object.values(m.leaves).sort((a, b) => b.count - a.count),
    }));

  return { mainCounts, mainCountsArr, leafCounts, leafCountsArr, currentUser };
}
