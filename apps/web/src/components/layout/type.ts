import type { PropsWithChildren, ReactNode, CSSProperties } from 'react';

/**
 * 스테이지 컴포넌트 '두 가지 모드'로 분리
 *  - mode="preview": 지금처럼 375×668 고정 캔버스를 스케일 (디자인 QA/스토리북용)
 *  - mode="production": 실제 서비스용. max-w-[375px] w-full mx-auto로 가운데 정렬  일반 반응형(글자 크기는 rem, 레이아웃은 flex/grid).
 * */
type Mode = 'preview' | 'production';

export interface ScaledStageProps extends PropsWithChildren {
  /**
   * 스테이지 동작 모드
   * - preview: 개발/디자인 확인용
   * - production: 실제 배포 환경 렌더링
   * @default 'production'
   */
  mode?: Mode;

  /** 스크롤 허용 여부 (production 모드에서 data-fixed-stage 동작에 영향) */
  allowScroll?: boolean;

  /** 배경 요소 (ReactNode로 전달 가능) */
  backdrop?: ReactNode;

  /** 스테이지 외곽선 표시 여부 */
  showFrame?: boolean;
  /** 외곽선 className (Tailwind 적용 가능) */
  frameClassName?: string;

  /** 라벨 표시 여부 */
  showLabel?: boolean;

  /** 디버그용 outline 표시 여부 */
  debugOutline?: boolean;

  /** 기준 스테이지 너비(px) @default 375 */
  baseWidth?: number;

  /** 기준 스테이지 높이(px) @default 668 */
  baseHeight?: number;

  /** 최대 스케일 배율 (ex. 2 = 200%) @default 1000 (← 단위 정리 필요) */
  maxScalePx?: number;

  /** 최소 스케일 배율 (ex. 0.5 = 50%) @default 0.5 */
  minScalePx?: number;
}

export type StageVars = CSSProperties & {
  '--stage-base-w'?: number | string;
  '--stage-base-h'?: number | string;
  '--stage-max-scale'?: string;
  '--stage-min-scale'?: string;
};
