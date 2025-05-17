import 'server-only';
import { cookies as nextCookies } from 'next/headers';

export const getAuthHeaders = async (): Promise<{ authorization: string } | {}> => {
  try {
    const cookies = nextCookies();
    const token = cookies.get('_medusa_jwt')?.value;

    if (!token) {
      return {};
    }

    return { authorization: `Bearer ${token}` };
  } catch (error) {
    return {};
  }
};

export const getCacheTag = async (tag: string): Promise<string> => {
  try {
    const cookies = nextCookies();
    const cacheId = cookies.get('_medusa_cache_id')?.value;

    if (!cacheId) {
      return '';
    }

    return `${tag}-${cacheId}`;
  } catch (error) {
    return '';
  }
};

export const getCacheOptions = async (tag: string): Promise<{ tags: string[] } | {}> => {
  if (typeof window !== 'undefined') {
    return {};
  }

  try {
    const cacheTag = await getCacheTag(tag);

    if (!cacheTag) {
      return {};
    }

    return { tags: [`${cacheTag}`] };
  } catch (error) {
    return {};
  }
};

export const setAuthToken = async (token: string) => {
  try {
    const cookies = nextCookies();
    cookies.set('_medusa_jwt', token, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
  } catch (error) {
    console.error('Failed to set auth token:', error);
  }
};

export const removeAuthToken = async () => {
  try {
    const cookies = nextCookies();
    cookies.set('_medusa_jwt', '', {
      maxAge: -1,
    });
  } catch (error) {
    console.error('Failed to remove auth token:', error);
  }
};

export const getCartId = async () => {
  try {
    const cookies = nextCookies();
    return cookies.get('_medusa_cart_id')?.value;
  } catch (error) {
    return null;
  }
};

export const setCartId = async (cartId: string) => {
  try {
    const cookies = nextCookies();
    cookies.set('_medusa_cart_id', cartId, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
  } catch (error) {
    console.error('Failed to set cart ID:', error);
  }
};

export const removeCartId = async () => {
  try {
    const cookies = nextCookies();
    cookies.set('_medusa_cart_id', '', {
      maxAge: -1,
    });
  } catch (error) {
    console.error('Failed to remove cart ID:', error);
  }
};