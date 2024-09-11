import React from 'react';

const Circle = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g clipPath="url(#clip0_1_1013)">
            <path d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8C14.6668 4.3181 11.6821 1.33333 8.00016 1.33333C4.31826 1.33333 1.3335 4.3181 1.3335 8C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z" stroke="#D6EEFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_1_1013">
                <rect width="16" height="16" fill="white"/>
            </clipPath>
            </defs>
        </svg>
    );
}

const DashboardIcon = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className={className} {...rest} fill="none">
            <path d="M7 2.5H3.83333C3.36662 2.5 3.13327 2.5 2.95501 2.59083C2.79821 2.67072 2.67072 2.79821 2.59083 2.95501C2.5 3.13327 2.5 3.36662 2.5 3.83333V7C2.5 7.46671 2.5 7.70007 2.59083 7.87833C2.67072 8.03513 2.79821 8.16261 2.95501 8.24251C3.13327 8.33333 3.36662 8.33333 3.83333 8.33333H7C7.46671 8.33333 7.70007 8.33333 7.87833 8.24251C8.03513 8.16261 8.16261 8.03513 8.24251 7.87833C8.33333 7.70007 8.33333 7.46671 8.33333 7V3.83333C8.33333 3.36662 8.33333 3.13327 8.24251 2.95501C8.16261 2.79821 8.03513 2.67072 7.87833 2.59083C7.70007 2.5 7.46671 2.5 7 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.1667 2.5H13C12.5333 2.5 12.2999 2.5 12.1217 2.59083C11.9649 2.67072 11.8374 2.79821 11.7575 2.95501C11.6667 3.13327 11.6667 3.36662 11.6667 3.83333V7C11.6667 7.46671 11.6667 7.70007 11.7575 7.87833C11.8374 8.03513 11.9649 8.16261 12.1217 8.24251C12.2999 8.33333 12.5333 8.33333 13 8.33333H16.1667C16.6334 8.33333 16.8667 8.33333 17.045 8.24251C17.2018 8.16261 17.3293 8.03513 17.4092 7.87833C17.5 7.70007 17.5 7.46671 17.5 7V3.83333C17.5 3.36662 17.5 3.13327 17.4092 2.95501C17.3293 2.79821 17.2018 2.67072 17.045 2.59083C16.8667 2.5 16.6334 2.5 16.1667 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.1667 11.6667H13C12.5333 11.6667 12.2999 11.6667 12.1217 11.7575C11.9649 11.8374 11.8374 11.9649 11.7575 12.1217C11.6667 12.2999 11.6667 12.5333 11.6667 13V16.1667C11.6667 16.6334 11.6667 16.8667 11.7575 17.045C11.8374 17.2018 11.9649 17.3293 12.1217 17.4092C12.2999 17.5 12.5333 17.5 13 17.5H16.1667C16.6334 17.5 16.8667 17.5 17.045 17.4092C17.2018 17.3293 17.3293 17.2018 17.4092 17.045C17.5 16.8667 17.5 16.6334 17.5 16.1667V13C17.5 12.5333 17.5 12.2999 17.4092 12.1217C17.3293 11.9649 17.2018 11.8374 17.045 11.7575C16.8667 11.6667 16.6334 11.6667 16.1667 11.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 11.6667H3.83333C3.36662 11.6667 3.13327 11.6667 2.95501 11.7575C2.79821 11.8374 2.67072 11.9649 2.59083 12.1217C2.5 12.2999 2.5 12.5333 2.5 13V16.1667C2.5 16.6334 2.5 16.8667 2.59083 17.045C2.67072 17.2018 2.79821 17.3293 2.95501 17.4092C3.13327 17.5 3.36662 17.5 3.83333 17.5H7C7.46671 17.5 7.70007 17.5 7.87833 17.4092C8.03513 17.3293 8.16261 17.2018 8.24251 17.045C8.33333 16.8667 8.33333 16.6334 8.33333 16.1667V13C8.33333 12.5333 8.33333 12.2999 8.24251 12.1217C8.16261 11.9649 8.03513 11.8374 7.87833 11.7575C7.70007 11.6667 7.46671 11.6667 7 11.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const ItemListingIcon = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className={className} {...rest} fill="none">
            <path d="M17.0833 6.06478L9.99997 9.99996M9.99997 9.99996L2.91664 6.06478M9.99997 9.99996L10 17.9167M17.5 13.3821V6.61786C17.5 6.33232 17.5 6.18956 17.4579 6.06222C17.4207 5.94958 17.3599 5.84618 17.2795 5.75893C17.1886 5.66032 17.0638 5.59099 16.8142 5.45232L10.6475 2.02639C10.4112 1.89509 10.293 1.82944 10.1679 1.80371C10.0571 1.78093 9.94288 1.78093 9.83213 1.80371C9.70698 1.82944 9.58881 1.89509 9.35248 2.02639L3.18581 5.45232C2.93621 5.59099 2.8114 5.66032 2.72053 5.75894C2.64013 5.84618 2.57929 5.94958 2.54207 6.06223C2.5 6.18956 2.5 6.33233 2.5 6.61786V13.3821C2.5 13.6677 2.5 13.8104 2.54207 13.9378C2.57929 14.0504 2.64013 14.1538 2.72053 14.241C2.8114 14.3397 2.93621 14.409 3.18581 14.5477L9.35248 17.9736C9.58881 18.1049 9.70698 18.1705 9.83213 18.1963C9.94288 18.2191 10.0571 18.2191 10.1679 18.1963C10.293 18.1705 10.4112 18.1049 10.6475 17.9736L16.8142 14.5477C17.0638 14.409 17.1886 14.3397 17.2795 14.241C17.3599 14.1538 17.4207 14.0504 17.4579 13.9378C17.5 13.8104 17.5 13.6677 17.5 13.3821Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const SaleReportIcon = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className={className} {...rest} fill="none">
            <path d="M11.6663 1.89127V5.33338C11.6663 5.80009 11.6663 6.03345 11.7572 6.21171C11.8371 6.36851 11.9645 6.49599 12.1213 6.57589C12.2996 6.66672 12.533 6.66672 12.9997 6.66672H16.4418M6.66634 12.5V15M13.333 10.8333V15M9.99967 8.74999V15M16.6663 8.32351V14.3333C16.6663 15.7335 16.6663 16.4335 16.3939 16.9683C16.1542 17.4387 15.7717 17.8212 15.3013 18.0608C14.7665 18.3333 14.0665 18.3333 12.6663 18.3333H7.33301C5.93288 18.3333 5.23281 18.3333 4.69803 18.0608C4.22763 17.8212 3.84517 17.4387 3.60549 16.9683C3.33301 16.4335 3.33301 15.7335 3.33301 14.3333V5.66666C3.33301 4.26653 3.33301 3.56646 3.60549 3.03168C3.84517 2.56128 4.22763 2.17882 4.69803 1.93914C5.23281 1.66666 5.93288 1.66666 7.33301 1.66666H10.0095C10.621 1.66666 10.9267 1.66666 11.2144 1.73573C11.4695 1.79697 11.7134 1.89798 11.9371 2.03506C12.1893 2.18966 12.4055 2.40585 12.8379 2.83823L15.4948 5.49508C15.9271 5.92746 16.1433 6.14365 16.2979 6.39594C16.435 6.61963 16.536 6.86349 16.5973 7.11858C16.6663 7.4063 16.6663 7.71203 16.6663 8.32351Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const EinvoiceIcon = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className={className} {...rest} fill="none">
            <path d="M3.33301 6.5C3.33301 5.09987 3.33301 4.3998 3.60549 3.86502C3.84517 3.39462 4.22763 3.01217 4.69803 2.77248C5.23281 2.5 5.93288 2.5 7.33301 2.5H12.6663C14.0665 2.5 14.7665 2.5 15.3013 2.77248C15.7717 3.01217 16.1542 3.39462 16.3939 3.86502C16.6663 4.3998 16.6663 5.09987 16.6663 6.5V17.5L14.3747 15.8333L12.2913 17.5L9.99967 15.8333L7.70801 17.5L5.62467 15.8333L3.33301 17.5V6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const AdminUserIcon = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className={className} {...rest} fill="none">
            <path d="M4.00003 17.3631C4.45197 17.5 5.06239 17.5 6.10004 17.5H13.9001C14.9378 17.5 15.5482 17.5 16.0001 17.3631M4.00003 17.3631C3.90313 17.3337 3.81351 17.2981 3.72853 17.2548C3.30516 17.039 2.96096 16.6948 2.74524 16.2715C2.5 15.7902 2.5 15.1601 2.5 13.9V6.09988C2.5 4.83975 2.5 4.20969 2.74524 3.72838C2.96096 3.30501 3.30516 2.9608 3.72853 2.74509C4.20984 2.49985 4.83991 2.49985 6.10004 2.49985H13.9001C15.1602 2.49985 15.7903 2.49985 16.2716 2.74509C16.695 2.9608 17.0392 3.30501 17.2549 3.72838C17.5002 4.20969 17.5002 4.83975 17.5002 6.09988V13.9C17.5002 15.1601 17.5002 15.7902 17.2549 16.2715C17.0392 16.6948 16.695 17.039 16.2716 17.2548C16.1866 17.2981 16.097 17.3337 16.0001 17.3631M4.00003 17.3631C4.00028 16.7561 4.00392 16.4349 4.05766 16.1647C4.29438 14.9746 5.22468 14.0443 6.41477 13.8076C6.70457 13.75 7.05306 13.75 7.75005 13.75H12.2501C12.9471 13.75 13.2956 13.75 13.5854 13.8076C14.7755 14.0443 15.7058 14.9746 15.9425 16.1647C15.9962 16.4349 15.9999 16.7561 16.0001 17.3631M13.0001 8.1249C13.0001 9.78178 11.6569 11.1249 10.0001 11.1249C8.34321 11.1249 7.00005 9.78178 7.00005 8.1249C7.00005 6.46803 8.34321 5.12487 10.0001 5.12487C11.6569 5.12487 13.0001 6.46803 13.0001 8.1249Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const MyBillingIcon = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className={className} {...rest} fill="none">
            <path d="M18.3337 7.08334H1.66699M1.66699 10.4167H4.62256C5.07271 10.4167 5.29779 10.4167 5.51544 10.4555C5.70862 10.4899 5.89708 10.547 6.07691 10.6255C6.27952 10.7139 6.4668 10.8388 6.84136 11.0885L7.32596 11.4115C7.70052 11.6612 7.88779 11.7861 8.0904 11.8745C8.27024 11.9531 8.4587 12.0101 8.65188 12.0445C8.86952 12.0833 9.0946 12.0833 9.54476 12.0833H10.4559C10.906 12.0833 11.1311 12.0833 11.3488 12.0445C11.542 12.0101 11.7304 11.9531 11.9102 11.8745C12.1129 11.7861 12.3001 11.6612 12.6747 11.4115L13.1593 11.0885C13.5338 10.8388 13.7211 10.7139 13.9237 10.6255C14.1036 10.547 14.292 10.4899 14.4852 10.4555C14.7029 10.4167 14.9279 10.4167 15.3781 10.4167H18.3337M1.66699 6.00001L1.66699 14C1.66699 14.9334 1.66699 15.4001 1.84865 15.7567C2.00844 16.0703 2.2634 16.3252 2.57701 16.485C2.93353 16.6667 3.40024 16.6667 4.33366 16.6667L15.667 16.6667C16.6004 16.6667 17.0671 16.6667 17.4236 16.485C17.7372 16.3252 17.9922 16.0703 18.152 15.7567C18.3337 15.4001 18.3337 14.9334 18.3337 14V6.00001C18.3337 5.06659 18.3337 4.59988 18.152 4.24336C17.9922 3.92976 17.7372 3.67479 17.4236 3.515C17.0671 3.33334 16.6004 3.33334 15.667 3.33334L4.33366 3.33334C3.40024 3.33334 2.93353 3.33334 2.57701 3.515C2.2634 3.67479 2.00844 3.92976 1.84865 4.24336C1.66699 4.59988 1.66699 5.06659 1.66699 6.00001Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const ConfigIcon = ({color, className, ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" className={className} {...rest} fill="none">
            <path d="M12.5421 7.5H4.58333C3.43274 7.5 2.5 6.56726 2.5 5.41667C2.5 4.26607 3.43274 3.33333 4.58333 3.33333H12.5421M7.45791 16.6667H15.4167C16.5673 16.6667 17.5 15.7339 17.5 14.5833C17.5 13.4327 16.5673 12.5 15.4167 12.5H7.45791M2.5 14.5833C2.5 16.1942 3.80584 17.5 5.41667 17.5C7.0275 17.5 8.33333 16.1942 8.33333 14.5833C8.33333 12.9725 7.0275 11.6667 5.41667 11.6667C3.80584 11.6667 2.5 12.9725 2.5 14.5833ZM17.5 5.41667C17.5 7.0275 16.1942 8.33333 14.5833 8.33333C12.9725 8.33333 11.6667 7.0275 11.6667 5.41667C11.6667 3.80584 12.9725 2.5 14.5833 2.5C16.1942 2.5 17.5 3.80584 17.5 5.41667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const MenuIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M2.5 10H17.5M2.5 5H17.5M2.5 15H12.5" stroke="#293C51" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const NotificationIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path d="M9.3333 15.0002H6.66664M12 6.3335C12 5.27263 11.5785 4.25521 10.8284 3.50507C10.0783 2.75492 9.06084 2.3335 7.99997 2.3335C6.93911 2.3335 5.92169 2.75492 5.17154 3.50507C4.4214 4.25521 3.99997 5.27263 3.99997 6.3335C3.99997 8.39362 3.48029 9.80413 2.89975 10.7371C2.41006 11.5241 2.16521 11.9176 2.17419 12.0273C2.18413 12.1489 2.20988 12.1952 2.30782 12.2679C2.39628 12.3335 2.79503 12.3335 3.59254 12.3335H12.4074C13.2049 12.3335 13.6037 12.3335 13.6921 12.2679C13.7901 12.1952 13.8158 12.1489 13.8258 12.0273C13.8347 11.9176 13.5899 11.5241 13.1002 10.7371C12.5197 9.80413 12 8.39362 12 6.3335Z" stroke="#2D465F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="4" r="3.25" fill="#E71B25" stroke="white" strokeWidth="1.5"/>
        </svg>
    );
}

const LogoutIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10.6667 11.3333L14 8M14 8L10.6667 4.66667M14 8H6M6 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.7157 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.07989 2 5.2V10.8C2 11.9201 2 12.4802 2.21799 12.908C2.40973 13.2843 2.71569 13.5903 3.09202 13.782C3.51984 14 4.0799 14 5.2 14H6" stroke="#2D465F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const AlertIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <g clipPath="url(#clip0_2_392)">
                <path d="M6 4V6M6 8H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z" stroke="#E71B25" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_2_392">
                <rect width="12" height="12" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );
}

const CheckIcon = ({ className }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
            <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const Search = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <g clipPath="url(#clip0_52_1234)">
                <path d="M10.5 10.5L8.75005 8.75M10 5.75C10 8.09721 8.09721 10 5.75 10C3.40279 10 1.5 8.09721 1.5 5.75C1.5 3.40279 3.40279 1.5 5.75 1.5C8.09721 1.5 10 3.40279 10 5.75Z" stroke="#6E8193" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_52_1234">
                <rect width="12" height="12" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );
}

const XIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M17 7L7 17M7 7L17 17" stroke="#131B25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const EyeOff = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path d="M7.16196 3.66246C7.4329 3.6224 7.7124 3.60091 8.00028 3.60091C11.4036 3.60091 13.6369 6.60414 14.3871 7.79213C14.4779 7.93591 14.5233 8.00781 14.5488 8.11869C14.5678 8.20197 14.5678 8.33335 14.5487 8.41663C14.5233 8.52751 14.4776 8.59988 14.3861 8.74462C14.1862 9.06101 13.8814 9.50565 13.4777 9.98788M4.48288 4.74427C3.0415 5.72205 2.06297 7.0805 1.61407 7.7911C1.52286 7.93549 1.47725 8.00769 1.45183 8.11857C1.43273 8.20184 1.43272 8.33321 1.45181 8.41648C1.47722 8.52736 1.52262 8.59925 1.61342 8.74303C2.36369 9.93102 4.59694 12.9342 8.00028 12.9342C9.37255 12.9342 10.5546 12.446 11.5259 11.7853M2.00028 2.26758L14.0003 14.2676M6.58606 6.85336C6.22413 7.21529 6.00028 7.71529 6.00028 8.26758C6.00028 9.37215 6.89571 10.2676 8.00028 10.2676C8.55256 10.2676 9.05256 10.0437 9.41449 9.68179" stroke="#92A7B5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const EyeOn = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path d="M1.61342 8.97513C1.52262 8.83137 1.47723 8.75949 1.45182 8.64862C1.43273 8.56534 1.43273 8.43401 1.45182 8.35073C1.47723 8.23986 1.52262 8.16798 1.61341 8.02422C2.36369 6.83624 4.59693 3.83301 8.00027 3.83301C11.4036 3.83301 13.6369 6.83623 14.3871 8.02422C14.4779 8.16798 14.5233 8.23986 14.5487 8.35073C14.5678 8.43401 14.5678 8.56534 14.5487 8.64862C14.5233 8.75949 14.4779 8.83137 14.3871 8.97513C13.6369 10.1631 11.4036 13.1663 8.00027 13.1663C4.59693 13.1663 2.36369 10.1631 1.61342 8.97513Z" stroke="#92A7B5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.00027 10.4997C9.10484 10.4997 10.0003 9.60424 10.0003 8.49967C10.0003 7.39511 9.10484 6.49967 8.00027 6.49967C6.8957 6.49967 6.00027 7.39511 6.00027 8.49967C6.00027 9.60424 6.8957 10.4997 8.00027 10.4997Z" stroke="#92A7B5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const ExportIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 10V10.8C14 11.9201 14 12.4802 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.4802 14 11.9201 14 10.8 14H5.2C4.07989 14 3.51984 14 3.09202 13.782C2.71569 13.5903 2.40973 13.2843 2.21799 12.908C2 12.4802 2 11.9201 2 10.8V10M11.3333 5.33333L8 2M8 2L4.66667 5.33333M8 2V10" stroke="#0674FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const CategoryIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5.6 2H3.06667C2.6933 2 2.50661 2 2.36401 2.07266C2.23856 2.13658 2.13658 2.23856 2.07266 2.36401C2 2.50661 2 2.6933 2 3.06667V5.6C2 5.97337 2 6.16005 2.07266 6.30266C2.13658 6.4281 2.23856 6.53009 2.36401 6.594C2.50661 6.66667 2.6933 6.66667 3.06667 6.66667H5.6C5.97337 6.66667 6.16005 6.66667 6.30266 6.594C6.4281 6.53009 6.53009 6.4281 6.594 6.30266C6.66667 6.16005 6.66667 5.97337 6.66667 5.6V3.06667C6.66667 2.6933 6.66667 2.50661 6.594 2.36401C6.53009 2.23856 6.4281 2.13658 6.30266 2.07266C6.16005 2 5.97337 2 5.6 2Z" stroke="#0674FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.9333 2H10.4C10.0266 2 9.83995 2 9.69734 2.07266C9.5719 2.13658 9.46991 2.23856 9.406 2.36401C9.33333 2.50661 9.33333 2.6933 9.33333 3.06667V5.6C9.33333 5.97337 9.33333 6.16005 9.406 6.30266C9.46991 6.4281 9.5719 6.53009 9.69734 6.594C9.83995 6.66667 10.0266 6.66667 10.4 6.66667H12.9333C13.3067 6.66667 13.4934 6.66667 13.636 6.594C13.7614 6.53009 13.8634 6.4281 13.9273 6.30266C14 6.16005 14 5.97337 14 5.6V3.06667C14 2.6933 14 2.50661 13.9273 2.36401C13.8634 2.23856 13.7614 2.13658 13.636 2.07266C13.4934 2 13.3067 2 12.9333 2Z" stroke="#0674FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.9333 9.33333H10.4C10.0266 9.33333 9.83995 9.33333 9.69734 9.406C9.5719 9.46991 9.46991 9.5719 9.406 9.69734C9.33333 9.83995 9.33333 10.0266 9.33333 10.4V12.9333C9.33333 13.3067 9.33333 13.4934 9.406 13.636C9.46991 13.7614 9.5719 13.8634 9.69734 13.9273C9.83995 14 10.0266 14 10.4 14H12.9333C13.3067 14 13.4934 14 13.636 13.9273C13.7614 13.8634 13.8634 13.7614 13.9273 13.636C14 13.4934 14 13.3067 14 12.9333V10.4C14 10.0266 14 9.83995 13.9273 9.69734C13.8634 9.5719 13.7614 9.46991 13.636 9.406C13.4934 9.33333 13.3067 9.33333 12.9333 9.33333Z" stroke="#0674FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5.6 9.33333H3.06667C2.6933 9.33333 2.50661 9.33333 2.36401 9.406C2.23856 9.46991 2.13658 9.5719 2.07266 9.69734C2 9.83995 2 10.0266 2 10.4V12.9333C2 13.3067 2 13.4934 2.07266 13.636C2.13658 13.7614 2.23856 13.8634 2.36401 13.9273C2.50661 14 2.6933 14 3.06667 14H5.6C5.97337 14 6.16005 14 6.30266 13.9273C6.4281 13.8634 6.53009 13.7614 6.594 13.636C6.66667 13.4934 6.66667 13.3067 6.66667 12.9333V10.4C6.66667 10.0266 6.66667 9.83995 6.594 9.69734C6.53009 9.5719 6.4281 9.46991 6.30266 9.406C6.16005 9.33333 5.97337 9.33333 5.6 9.33333Z" stroke="#0674FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const PlusIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.99998 3.33325V12.6666M3.33331 7.99992H12.6666" stroke="#D6EEFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const ChevronLeft = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#131B25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const EditIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.99998 13.3334H14M2 13.3334H3.11636C3.44248 13.3334 3.60554 13.3334 3.75899 13.2966C3.89504 13.2639 4.0251 13.21 4.1444 13.1369C4.27895 13.0545 4.39425 12.9392 4.62486 12.7086L13 4.3334C13.5523 3.78112 13.5523 2.88569 13 2.3334C12.4477 1.78112 11.5523 1.78112 11 2.3334L2.62484 10.7086C2.39424 10.9392 2.27894 11.0545 2.19648 11.189C2.12338 11.3083 2.0695 11.4384 2.03684 11.5744C2 11.7279 2 11.8909 2 12.2171V13.3334Z" stroke="#313B44" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const DeleteIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4H14M6.5 7V11.5M9.5 7V11.5M2.75 4L3.5 13C3.5 13.3978 3.65804 13.7794 3.93934 14.0607C4.22064 14.342 4.60218 14.5 5 14.5H11C11.3978 14.5 11.7794 14.342 12.0607 14.0607C12.342 13.7794 12.5 13.3978 12.5 13L13.25 4M5.75 4V1.75C5.75 1.55109 5.82902 1.36032 5.96967 1.21967C6.11032 1.07902 6.30109 1 6.5 1H9.5C9.69891 1 9.88968 1.07902 10.0303 1.21967C10.171 1.36032 10.25 1.55109 10.25 1.75V4" stroke="#E71B25" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const UploadIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
            <path d="M21.5 15V16.2C21.5 17.8802 21.5 18.7202 21.173 19.362C20.8854 19.9265 20.4265 20.3854 19.862 20.673C19.2202 21 18.3802 21 16.7 21H8.3C6.61984 21 5.77976 21 5.13803 20.673C4.57354 20.3854 4.1146 19.9265 3.82698 19.362C3.5 18.7202 3.5 17.8802 3.5 16.2V15M17.5 8L12.5 3M12.5 3L7.5 8M12.5 3V15" stroke="#0060FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const DotMenuIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10.0001 10.8333C10.4603 10.8333 10.8334 10.4602 10.8334 9.99992C10.8334 9.53968 10.4603 9.16658 10.0001 9.16658C9.53984 9.16658 9.16675 9.53968 9.16675 9.99992C9.16675 10.4602 9.53984 10.8333 10.0001 10.8333Z" stroke="#D1DBE1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.0001 4.99992C10.4603 4.99992 10.8334 4.62682 10.8334 4.16659C10.8334 3.70635 10.4603 3.33325 10.0001 3.33325C9.53984 3.33325 9.16675 3.70635 9.16675 4.16659C9.16675 4.62682 9.53984 4.99992 10.0001 4.99992Z" stroke="#D1DBE1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.0001 16.6666C10.4603 16.6666 10.8334 16.2935 10.8334 15.8333C10.8334 15.373 10.4603 14.9999 10.0001 14.9999C9.53984 14.9999 9.16675 15.373 9.16675 15.8333C9.16675 16.2935 9.53984 16.6666 10.0001 16.6666Z" stroke="#D1DBE1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const TabMenuIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.99998 8.6665C8.36817 8.6665 8.66665 8.36803 8.66665 7.99984C8.66665 7.63165 8.36817 7.33317 7.99998 7.33317C7.63179 7.33317 7.33331 7.63165 7.33331 7.99984C7.33331 8.36803 7.63179 8.6665 7.99998 8.6665Z" stroke="#92A7B5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.99998 3.99984C8.36817 3.99984 8.66665 3.70136 8.66665 3.33317C8.66665 2.96498 8.36817 2.6665 7.99998 2.6665C7.63179 2.6665 7.33331 2.96498 7.33331 3.33317C7.33331 3.70136 7.63179 3.99984 7.99998 3.99984Z" stroke="#92A7B5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.99998 13.3332C8.36817 13.3332 8.66665 13.0347 8.66665 12.6665C8.66665 12.2983 8.36817 11.9998 7.99998 11.9998C7.63179 11.9998 7.33331 12.2983 7.33331 12.6665C7.33331 13.0347 7.63179 13.3332 7.99998 13.3332Z" stroke="#92A7B5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const ChevronDown = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path d="M4 6.5L8 10.5L12 6.5" stroke="#4C5A66" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const ChevronUp = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path d="M12 10.5L8 6.5L4 10.5" stroke="#8095A7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const SquareShape = ({ className, bgColor }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z" fill={bgColor} stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const CircleShape = ({ className, bgColor }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill={bgColor} stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const PolygonShape = ({ className, bgColor }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 22 20" fill="none">
            <path d="M20.5679 9.22297C20.7255 9.50657 20.8042 9.64838 20.8351 9.79855C20.8625 9.93146 20.8625 10.0685 20.8351 10.2015C20.8042 10.3516 20.7255 10.4934 20.5679 10.777L16.4568 18.177C16.2904 18.4766 16.2072 18.6263 16.0889 18.7354C15.9842 18.8318 15.8601 18.9049 15.7249 18.9495C15.5721 19 15.4008 19 15.0582 19H6.94104C6.5984 19 6.42708 19 6.27428 18.9495C6.1391 18.9049 6.01502 18.8318 5.91033 18.7354C5.79199 18.6263 5.70879 18.4766 5.54239 18.177L1.43128 10.777C1.27372 10.4934 1.19494 10.3516 1.16406 10.2015C1.13672 10.0685 1.13672 9.93146 1.16406 9.79855C1.19494 9.64838 1.27372 9.50657 1.43128 9.22297L5.54239 1.82297C5.70879 1.52345 5.79199 1.37369 5.91033 1.26463C6.01502 1.16816 6.1391 1.09515 6.27428 1.05048C6.42708 1 6.5984 1 6.94104 1L15.0582 1C15.4008 1 15.5721 1 15.7249 1.05049C15.8601 1.09515 15.9842 1.16816 16.0889 1.26463C16.2072 1.37369 16.2904 1.52345 16.4568 1.82297L20.5679 9.22297Z" fill={bgColor} stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const StarShape = ({ className, bgColor }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M11.2827 3.45332C11.5131 2.98638 11.6284 2.75291 11.7848 2.67831C11.9209 2.61341 12.0791 2.61341 12.2152 2.67831C12.3717 2.75291 12.4869 2.98638 12.7174 3.45332L14.9041 7.88328C14.9721 8.02113 15.0061 8.09006 15.0558 8.14358C15.0999 8.19096 15.1527 8.22935 15.2113 8.25662C15.2776 8.28742 15.3536 8.29854 15.5057 8.32077L20.397 9.03571C20.9121 9.11099 21.1696 9.14863 21.2888 9.27444C21.3925 9.38389 21.4412 9.5343 21.4215 9.68377C21.3988 9.85558 21.2124 10.0372 20.8395 10.4004L17.3014 13.8464C17.1912 13.9538 17.136 14.0076 17.1004 14.0715C17.0689 14.128 17.0487 14.1902 17.0409 14.2545C17.0321 14.3271 17.0451 14.403 17.0711 14.5547L17.906 19.4221C17.994 19.9355 18.038 20.1922 17.9553 20.3445C17.8833 20.477 17.7554 20.57 17.6071 20.5975C17.4366 20.6291 17.2061 20.5078 16.7451 20.2654L12.3724 17.9658C12.2361 17.8942 12.168 17.8584 12.0962 17.8443C12.0327 17.8318 11.9673 17.8318 11.9038 17.8443C11.832 17.8584 11.7639 17.8942 11.6277 17.9658L7.25492 20.2654C6.79392 20.5078 6.56341 20.6291 6.39297 20.5975C6.24468 20.57 6.11672 20.477 6.04474 20.3445C5.962 20.1922 6.00603 19.9355 6.09407 19.4221L6.92889 14.5547C6.95491 14.403 6.96793 14.3271 6.95912 14.2545C6.95132 14.1902 6.93111 14.128 6.89961 14.0715C6.86402 14.0076 6.80888 13.9538 6.69859 13.8464L3.16056 10.4004C2.78766 10.0372 2.60121 9.85558 2.57853 9.68377C2.55879 9.5343 2.60755 9.38389 2.71125 9.27444C2.83044 9.14863 3.08797 9.11099 3.60304 9.03571L8.49431 8.32077C8.64642 8.29854 8.72248 8.28742 8.78872 8.25662C8.84736 8.22935 8.90016 8.19096 8.94419 8.14358C8.99391 8.09006 9.02793 8.02113 9.09597 7.88328L11.2827 3.45332Z" fill={bgColor} stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const SearchHistoryIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 14L11.6667 11.6667M13.3333 7.66667C13.3333 10.7963 10.7963 13.3333 7.66667 13.3333C4.53705 13.3333 2 10.7963 2 7.66667C2 4.53705 4.53705 2 7.66667 2C10.7963 2 13.3333 4.53705 13.3333 7.66667Z" stroke="#0674FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const PlanIcon = () => {
    return (
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_di_1904_34755)">
            <rect x="7" y="6" width="28" height="28" rx="4" fill="white"/>
            <rect x="7.5" y="6.5" width="27" height="27" rx="3.5" stroke="#D1DBE1"/>
            <path d="M14 21.7877L20.5838 25.0796C20.6733 25.1244 20.7181 25.1468 20.7651 25.1556C20.8067 25.1634 20.8494 25.1634 20.891 25.1556C20.938 25.1468 20.9828 25.1244 21.0723 25.0796L27.6561 21.7877M14 18.3737L20.5838 15.0818C20.6733 15.0371 20.7181 15.0147 20.7651 15.0059C20.8067 14.998 20.8494 14.998 20.891 15.0059C20.938 15.0147 20.9828 15.0371 21.0723 15.0818L27.6561 18.3737L21.0723 21.6656C20.9828 21.7104 20.938 21.7328 20.891 21.7416C20.8494 21.7494 20.8067 21.7494 20.7651 21.7416C20.7181 21.7328 20.6733 21.7104 20.5838 21.6656L14 18.3737Z" stroke="#4C5A66" strokeWidth="1.36561" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
            <filter id="filter0_di_1904_34755" x="0.2" y="0.2" width="41.6" height="41.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="1"/>
            <feGaussianBlur stdDeviation="3.4"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.421842 0 0 0 0 0.421842 0 0 0 0 0.421842 0 0 0 0.09 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1904_34755"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1904_34755" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="-3"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.901961 0 0 0 0 0.92549 0 0 0 0 0.933333 0 0 0 1 0"/>
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1904_34755"/>
            </filter>
            </defs>
        </svg>
    );
}

export { 
    Circle,
    DashboardIcon,
    ItemListingIcon,
    SaleReportIcon,
    EinvoiceIcon,
    AdminUserIcon,
    MyBillingIcon,
    ConfigIcon,
    MenuIcon,
    NotificationIcon,
    LogoutIcon,
    AlertIcon,
    CheckIcon,
    Search,
    XIcon,
    EyeOff,
    EyeOn,
    ExportIcon,
    CategoryIcon,
    PlusIcon,
    ChevronLeft,
    EditIcon,
    DeleteIcon,
    UploadIcon,
    DotMenuIcon,
    TabMenuIcon,
    ChevronDown,
    ChevronUp,
    SquareShape,
    CircleShape,
    PolygonShape,
    StarShape,
    SearchHistoryIcon,
    PlanIcon,
};