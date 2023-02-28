import type { Hit } from '@algolia/client-search';

type ProductRecord = {
    title: string;
    excerpt: string;
    sku: string;
    url: string;
    price: number,
    regular_price: number,
    sale_price: number,
    thumbnnail: string;
};

export type ProductHit = Hit<ProductRecord>;
