import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signIn, getCsrfToken } from 'next-auth/react';
import data from '@ontour/data';

export default function Login({ csrfToken, logoUrl }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const login = async () => {
    try {
      await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
        csrfToken,
      });
      router.push('/');
    } catch (e) {
      console.log('e: ', e);
    }
  };

  return (
    <div className="min-h-full h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center relative h-36">
        <Image
          className="mx-auto h-12 w-auto"
          src={logoUrl}
          layout="fill"
          alt="Logo"
        />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            action="/api/auth/callback/credentials"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sicard-blue-500 focus:border-sicard-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sicard-blue-500 focus:border-sicard-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sicard-blue-600 hover:bg-sicard-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sicard-blue-500"
                onClick={() => login()}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      logoUrl: data.admin.logoUrl,
      csrfToken: await getCsrfToken(context),
    },
  };
}
