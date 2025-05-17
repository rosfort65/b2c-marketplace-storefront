import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

import {
  CartDropdown,
  HeadingCategories,
  MobileNavbar,
  Navbar,
} from "@/components/cells"
import { Link } from "@/i18n/routing"
import { HeartIcon } from "@/icons"
import { PARENT_CATEGORIES } from "@/const"
import { retrieveCart } from "@/lib/data/cart"
import { UserDropdown } from "@/components/cells/UserDropdown/UserDropdown"
import { retrieveCustomer } from "@/lib/data/customer"
import { getUserWishlists } from "@/lib/data/wishlist"
import { Wishlist } from "@/types/wishlist"
import { Badge } from "@/components/atoms"
import { listCategories } from "@/lib/data/categories"

export const Header = async () => {
  let cart = null;
  let user = null;
  let wishlist: Wishlist[] = [];
  let categories: HttpTypes.StoreProductCategory[] = [];
  let parentCategories: HttpTypes.StoreProductCategory[] = [];

  try {
    [cart, user, { categories: cats, parentCategories: parentCats }] = await Promise.all([
      retrieveCart().catch(() => null),
      retrieveCustomer().catch(() => null),
      listCategories({
        headingCategories: PARENT_CATEGORIES,
      }).catch(() => ({ categories: [], parentCategories: [] }))
    ]);

    categories = cats || [];
    parentCategories = parentCats || [];

    if (user) {
      const response = await getUserWishlists();
      wishlist = response.wishlists;
    }
  } catch (error) {
    console.error('Error loading header data:', error);
  }

  const wishlistCount = wishlist?.[0]?.products.length || 0;

  return (
    <header>
      <div className="flex py-2 lg:px-8 px-4">
        <div className="flex items-center lg:w-1/3">
          <MobileNavbar
            parentCategories={parentCategories}
            childrenCategories={categories}
          />
          <HeadingCategories categories={parentCategories} />
        </div>
        <div className="flex lg:justify-center lg:w-1/3 items-center pl-4 lg:pl-0">
          <Link href="/" className="text-2xl font-bold">
            <Image
              src="/Logo.svg"
              width={126}
              height={40}
              alt="Logo"
              priority
            />
          </Link>
        </div>
        <div className="flex items-center justify-end gap-2 lg:gap-4 w-full lg:w-1/3 py-2">
          <UserDropdown user={user} />
          {user && (
            <Link href="/user/wishlist" className="relative">
              <HeartIcon size={20} />
              {Boolean(wishlistCount) && (
                <Badge className="absolute -top-2 -right-2 w-4 h-4 p-0">
                  {wishlistCount}
                </Badge>
              )}
            </Link>
          )}
          <CartDropdown cart={cart} />
        </div>
      </div>
      <Navbar categories={categories} />
    </header>
  )
}