'use client';

import { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import { ToastContainer } from './ToastContainer';

const ToastProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    //서버사이드 렌더링에서 하이드레이션 오류를 방지하기 위해 플래그 설정
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(<ToastContainer />, document.body);
};

export { ToastProvider };
