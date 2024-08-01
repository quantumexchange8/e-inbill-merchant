import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Button from '@/Components/Button';
import InputIconWrapper from '@/Components/InputIconWrapper';
import { EyeOff, EyeOn } from '@/Components/Icon/outline';

export default function Login({ status, canResetPassword }) {

    const [date, setDate] = useState(null);
    const [showPassword, setShowPassword ] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>} */}

            <form onSubmit={submit}>
                <div className='flex flex-col items-center gap-[52px]'>
                    <div className='w-full flex flex-col gap-[42px]'>
                        <div className='flex flex-col space-y-1.5'>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                                hasError={!!errors.email}
                                placeholder='Enter here'
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className="">
                                <InputLabel htmlFor="password" value="Password" />

                                <InputIconWrapper>
                                    <TextInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOn /> : <EyeOff />}
                                    </div>
                                </InputIconWrapper>

                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div className="block">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="ms-2 text-sm text-neutral-900 font-sf-pro font-medium">Remember me</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <Button className='w-full flex justify-center' size='lg' disabled={processing}>
                        <span className='text-sm font-medium'>
                            Log In
                        </span>
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
