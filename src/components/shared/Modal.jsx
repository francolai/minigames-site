import { useEffect, useRef } from 'react';

import '/src/styles/shared/modal.css';
import { createPortal } from 'react-dom';

function Modal({ className, open, children }) {
  const modalRef = useRef();

  useEffect(() => {
    if (open) {
      modalRef.current.showModal();
    }
  }, [open]);

  return createPortal(
    <dialog ref={modalRef} className={`${className}`}>
      <form method="dialog">{children}</form>
    </dialog>,
    document.body
  );
}

export default Modal;
