import { AlertIcon } from "./Icon/outline";

export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <div {...props} className={'text-xs font-medium text-red-500 leading-tight ' + className}>
            <div className="flex items-center gap-1">
                <AlertIcon />
                <p>{message}</p>
            </div>
        </div>
    ) : null;
}
