import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [isVisible, setIsVisible] = useState(false);

    const showModal = () => setIsVisible(true);
    const hideModal = () => setIsVisible(false);

    return (
        <ModalContext.Provider value={{ isVisible, showModal, hideModal }}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    return useContext(ModalContext);
}
