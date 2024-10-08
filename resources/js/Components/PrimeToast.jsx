// GlobalToast.js
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Toast } from 'primereact/toast';

const GlobalToast = forwardRef((props, ref) => {
    const toastRef = useRef(null);

    useImperativeHandle(ref, () => ({
        show: (options) => {
            if (toastRef.current) {
                toastRef.current.show(options);
            }
        }
    }));

    return <Toast ref={toastRef} />;
});

export default GlobalToast;
