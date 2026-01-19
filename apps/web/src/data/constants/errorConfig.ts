export const ERROR_CONFIG = {
  C4043: {
    code: 'C4043',
    title: '존재하지 않은 모임이에요',
    message: `찾으시는 모임이 변경 혹은 삭제되어\n찾을 수 없어요.`,
  },
  C4097: {
    code: 'C4097',
    title: '앗, 설문 시간이 지났어요!',
    message: `설문 참여 시간이 마감되었어요.\n다음 기회에 참여해 주세요.`,
  },
  C4099: {
    code: 'C4099',
    title: '앗, 참여 인원이 가득 찼어요!',
    message: `이미 모든 인원이 설문에 참여했어요.\n다음 설문에 함께해 주세요.`,
  },
  T002: {
    code: 'T002',
    title: '존재하지 않은 모임이에요',
    message: `찾으시는 모임이 변경 혹은 삭제되어\n찾을 수 없어요.`,
  },
  T003: {
    code: 'T003',
    title: '존재하지 않은 모임이에요',
    message: `찾으시는 모임이 변경 혹은 삭제되어\n찾을 수 없어요.`,
  },
  DEFAULT: {
    code: 'DEFAULT',
    title: '문제가 발생했어요',
    message: `예상치 못한 오류가 발생했어요.\n잠시 후 다시 시도해주세요.`,
  },
} as const;

export const getErrorConfig = (
  errorCode: string
): (typeof ERROR_CONFIG)[keyof typeof ERROR_CONFIG] => {
  return ERROR_CONFIG[errorCode as keyof typeof ERROR_CONFIG] ?? ERROR_CONFIG.DEFAULT;
};
