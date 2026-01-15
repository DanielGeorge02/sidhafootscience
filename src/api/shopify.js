// shopify.js
const SHOP_URL =
  "https://sidhafootscience.myshopify.com/api/2026-01/graphql.json";
// Replace with your actual Storefront Access Token or use an environment variable at build time
const STOREFRONT_TOKEN = "48152aa9d398038d5a208e7c3677bbfe"; // ← Paste the token here

export async function shopifyFetch(query, variables = {}) {
  const res = await fetch(SHOP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    console.error("Shopify API Error:", res.status);
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}

// Get products
export async function getProducts() {
  return shopifyFetch(`
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            description
            tags
            images(first: 1) {
              edges { 
                node { 
                  url
                  altText
                } 
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
}

// Get product by ID
export async function getProductById(productId) {
  return shopifyFetch(`
    {
      product(id: "${productId}") {
        id
        title
        description
        descriptionHtml
        tags
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  `);
}

// CREATE CART (New Shopify API)
export async function createCart(variantId, quantity = 1, customerInfo = {}) {
  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: [
        {
          merchandiseId: variantId,
          quantity: quantity,
        },
      ],
      buyerIdentity: customerInfo.email
        ? {
            email: customerInfo.email,
            deliveryAddressPreferences: customerInfo.shippingAddress
              ? [
                  {
                    deliveryAddress: {
                      firstName: customerInfo.shippingAddress.firstName,
                      lastName: customerInfo.shippingAddress.lastName,
                      address1: customerInfo.shippingAddress.address1,
                      address2: customerInfo.shippingAddress.address2 || "",
                      city: customerInfo.shippingAddress.city,
                      province: customerInfo.shippingAddress.province,
                      country: customerInfo.shippingAddress.country,
                      zip: customerInfo.shippingAddress.zip,
                      phone: customerInfo.shippingAddress.phone || "",
                    },
                  },
                ]
              : undefined,
          }
        : undefined,
    },
  };

  return shopifyFetch(mutation, variables);
}

// Keep old name for compatibility but use new function
export const createCheckout = createCart;

// UPDATE CHECKOUT WITH CUSTOMER INFO
export async function updateCheckoutEmail(checkoutId, email) {
  const mutation = `
    mutation checkoutEmailUpdateV2($checkoutId: ID!, $email: String!) {
      checkoutEmailUpdateV2(checkoutId: $checkoutId, email: $email) {
        checkout {
          id
          email
        }
        checkoutUserErrors {
          message
          field
        }
      }
    }
  `;

  return shopifyFetch(mutation, { checkoutId, email });
}

// UPDATE SHIPPING ADDRESS
export async function updateCheckoutShippingAddress(
  checkoutId,
  shippingAddress
) {
  const mutation = `
    mutation checkoutShippingAddressUpdateV2($checkoutId: ID!, $shippingAddress: MailingAddressInput!) {
      checkoutShippingAddressUpdateV2(checkoutId: $checkoutId, shippingAddress: $shippingAddress) {
        checkout {
          id
          shippingAddress {
            address1
            city
            province
            zip
          }
        }
        checkoutUserErrors {
          message
          field
        }
      }
    }
  `;

  return shopifyFetch(mutation, { checkoutId, shippingAddress });
}
