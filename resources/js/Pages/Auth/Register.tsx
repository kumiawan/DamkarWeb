import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Input } from '@/components/ui/input';
import { InputError } from '@/components/InputError';
import { Button } from '@/components/ui/button';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    notlp: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <img src="/images/icon/logo-register.svg" />
      <form onSubmit={submit}>
        <div>
          <p className="text-3xl my-4">Isi data diri anda!</p>

          <Input
            id="name"
            name="name"
            value={data.name}
            className="mt-1 block w-80"
            autoComplete="name"
            autoFocus
            onChange={(e) => setData('name', e.target.value)}
            placeholder="name"
            required
          />
          <InputError message={errors.name} className="mt-2 text-red-600" />
        </div>

        <div className="mt-4">
          <Input
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-80"
            autoComplete="username"
            onChange={(e) => setData('email', e.target.value)}
            placeholder="email"
            required
          />
          <InputError message={errors.email} className="mt-2 text-red-600" />
        </div>

        <div className="mt-4">
          <Input
            id="notlp"
            type="notlp"
            name="notlp"
            value={data.notlp}
            className="mt-1 block w-80"
            autoComplete="notlp"
            onChange={(e) => setData('notlp', e.target.value)}
            placeholder="08***"
            required
          />
          <InputError message={errors.email} className="mt-2 text-red-600" />
        </div>

        <div className="mt-4">
          <Input
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-80"
            autoComplete="new-password"
            onChange={(e) => setData('password', e.target.value)}
            placeholder="password"
            required
          />
          <InputError message={errors.password} className="mt-2 text-red-600" />
        </div>

        <div className="mt-4">
          <Input
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-80"
            autoComplete="new-password"
            onChange={(e) => setData('password_confirmation', e.target.value)}
            required
            placeholder="Confirm Password"
          />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Button
            className="w-80 block bg-oren hover:bg-red-600"
            disabled={processing}
          >
            Register
          </Button>
        </div>

        <Link
          href={route('login')}
          className="text-sm text-center block m-4 hover:underline"
        >
          Sudah punya akun?
        </Link>
      </form>
    </GuestLayout>
  );
}
