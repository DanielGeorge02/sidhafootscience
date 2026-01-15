import Client from "shopify-buy";

export const shopify = Client.buildClient({
  domain: "YOUR_STORE.myshopify.com",
  storefrontAccessToken: "YOUR_STOREFRONT_TOKEN",
});
