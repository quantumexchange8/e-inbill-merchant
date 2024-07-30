export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded text-indigo-600 shadow-sm focus:border-none focus:outline-none focus:ring-0' +
                className
            }
        />
    );
}
