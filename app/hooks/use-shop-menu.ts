import { useRouteLoaderData } from "react-router";
import type { RootLoader } from "~/root";
import type { EnhancedMenu } from "~/types/menu";

export function useShopMenu() {
  const { layout } = useRouteLoaderData<RootLoader>("root");
  let shopName = layout?.shop?.name;
  let headerMenu = layout?.headerMenu as EnhancedMenu;
  let footerMenu = layout?.footerMenu as EnhancedMenu;

  if (headerMenu?.items) {
    headerMenu = {
      ...headerMenu,
      items: headerMenu.items.filter((item) => !item.title.toLowerCase().includes("weaverse")),
    };
  }

  if (shopName?.toLowerCase().includes("weaverse")) {
    shopName = shopName.replace(/Weaverse/gi, "Store").trim();
  }

  return {
    shopName: shopName || "Store",
    headerMenu,
    footerMenu,
  };
}
