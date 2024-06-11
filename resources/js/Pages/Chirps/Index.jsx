import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
import Chirp from '@/Components/Chirp';
import NavLink from '@/Components/NavLink';

export default function Index({ auth, chirps }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('chirps.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Chirps" />

            <div className="max-w-2xl p-4 mx-auto sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <textarea
                        value={data.message}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={e => setData('message', e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>Chirp</PrimaryButton>
                </form>

                <div className="mt-6 bg-white divide-y rounded-lg shadow-sm">
                    {chirps?.data?.map(chirp =>
                        <Chirp key={chirp.id} chirp={chirp} />
                    )}
                </div>
                <div className="mt-6">
                    {chirps?.data?.length > 0 && (
                        <div className="flex justify-between">
                            {chirps?.links.map(link => (
                                <NavLink
                                    key={link.label}
                                    href={link.url}
                                    className={`inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm ${link.active ? 'bg-gray-100' : ''}`}
                                    activeClassName="bg-gray-100"
                                    active={link.active}
                                    disabled={link.label === '&laquo; Previous' && link.url === null}
                                >
                                    {link.label === '&laquo; Previous' ? 'Previous' : link.label === 'Next &raquo;' ? 'Next' : link.label}
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}