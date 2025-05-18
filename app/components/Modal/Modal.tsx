/* SCSS */
import './Modal.scss';

/* Interfaces */
import type { ReactNode, JSX } from 'react';
import React, { useRef, useEffect } from 'react';

/* Interace */
interface ModalProps {
    body?: ReactNode;
    title?: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({ body, title, isOpen, onClose }: ModalProps): JSX.Element | null {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={dialogRef} className="modal">

            <div className="modal-body">
                <div className="modal-header">
                    <p>{title}</p>
                    <button className="close-button" onClick={onClose}>x</button>
                </div>
                {body}
            </div>
        </dialog>
    );
}
