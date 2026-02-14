import { useRouteLoaderData } from "react-router";
import type { RootLoader } from "~/root";
import type { EnhancedMenu } from "~/types/menu";

export function useShopMenu() {
  const { layout } = useRouteLoaderData<RootLoader>("root");
  const shopName = layout?.shop?.name || "PROJECT BY SMEETA";
  const headerMenu = layout?.headerMenu as EnhancedMenu;
  const footerMenu = layout?.footerMenu as EnhancedMenu;
  if (headerMenu?.items) {
    headerMenu.items = headerMenu.items.filter(
      (item) =>
        ![
          "Weaverse",
          "Documentation",
          "Pricing",
          "Themes library",
          "Github",
        ].includes(item.title),
    );
  }

  return {
    shopName,
    headerMenu,
    footerMenu,
  };
}
