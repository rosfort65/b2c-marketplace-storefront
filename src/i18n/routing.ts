import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';

export const locales = [process.env.NEXT_PUBLIC_DEFAULT_REGION || 'gb'];
export const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_REGION || 'gb';

export const routing = {
  locales,
  defaultLocale,
  localePrefix: 'never',
};

export const { Link, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation({
  locales,
  localePrefix: 'never',
});