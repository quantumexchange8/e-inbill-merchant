import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const sizeMap = {
    xl: '1140px',
    lg: '800px',
    md: '500px',
};

export default function PrimeModal({ header, children, visible, setVisible, footerContent, size = 'md' }) {

    const modalSize = sizeMap[size] || sizeMap.md;

    return (
        <div className="card hidden justify-content-center">
            <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            <Dialog header={header} visible={visible} style={{ width: modalSize }} onHide={() => {if (!visible) return; setVisible(false); }} footer={footerContent}>
                {children}
            </Dialog>
        </div>
    )
}