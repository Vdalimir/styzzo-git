/** @jsx h */
import {
    AutocompleteComponents,
    AutocompletePlugin,
    getAlgoliaResults,
} from "@algolia/autocomplete-js";
import { SearchResponse } from "@algolia/client-search";
import { __ } from "@wordpress/i18n";
import { h } from "preact";

import { ALGOLIA_PRODUCTS_INDEX_NAME, LOCALE } from "../constants";
import { searchClient } from "../searchClient";
import { ProductHit } from "../types/ProductHit";

export const productsPlugin: AutocompletePlugin<ProductHit, {}> = {
    getSources({ query }) {
        if (!query) {
            return [];
        }

        return [
            {
                sourceId: "productsPlugin",
                getItems({ setContext }) {
                    return getAlgoliaResults<ProductHit>({
                        searchClient,
                        queries: [
                            {
                                indexName: ALGOLIA_PRODUCTS_INDEX_NAME,
                                query,
                                params: {
                                    filters: `locale:${LOCALE}`,
                                    hitsPerPage: 10,
                                    attributesToSnippet: ["excerpt:35"],
                                    snippetEllipsisText: "…",
                                },
                            },
                        ],
                        transformResponse({ hits, results }) {
                            setContext({
                                nbProducts: (
                                    results[0] as SearchResponse<ProductHit>
                                ).nbHits,
                            });

                            return hits;
                        },
                    });
                },
                onSelect({ setIsOpen }) {
                    setIsOpen(true);
                },
                templates: {
                    header({ state, Fragment }) {
                        return (
                            <Fragment>
                                <div className="aa-SourceHeaderTitle">
                                    {__("Товари для", "frontenda-store")}{" "}
                                    {state.query}
                                </div>
                                <div className="aa-SourceHeaderLine" />
                            </Fragment>
                        );
                    },
                    item({ item, components }) {
                        return (
                            <ProductItem hit={item} components={components} />
                        );
                    },
                    footer({ state }) {
                        return (
                            state.context.nbProducts > 10 && (
                                <div className="mt-4 text-center">
                                    <a
                                        href="https://example.org/"
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="btn-primary"
                                    >
                                        {__(
                                            "Дивитись всі товари",
                                            "frontenda-store"
                                        )}{" "}
                                        ({state.context.nbProducts})
                                    </a>
                                </div>
                            )
                        );
                    },
                },
            },
        ];
    },
};

function formatPrice(value: number) {
    return value.toLocaleString("uk-UA");
}

type ProductItemProps = {
    hit: ProductHit;
    components: AutocompleteComponents;
};

function ProductItem({ hit, components }: ProductItemProps) {
    return (
        <a
            href={hit.url}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex gap-3"
            data-id={hit.objectID}
        >
            <div className="flex aspect-square h-14 w-14 flex-none items-center justify-center rounded border p-1 lg:h-20 lg:w-20">
                <img
                    src={hit.thumbnnail}
                    alt={hit.title}
                    className="h-full w-full"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between overflow-hidden">
                {hit.sku && (
                    <div className="mb-1 text-xs text-[#8D8D8D]">
                        <components.Highlight hit={hit} attribute="sku" />
                    </div>
                )}
                <div className="truncate text-sm lg:text-base">
                    <components.Highlight hit={hit} attribute="title" />
                </div>
                <div className="flex flex-row-reverse justify-end gap-3">
                    {hit.sale_price && (
                        <div className="flex gap-2 text-red [&~div]:text-[#8D8D8D] [&~div]:line-through">
                            <div data-currency="€">
                                {formatPrice(hit.sale_price)}
                            </div>
                            <span className="after:content-['!']">
                                {__("Акція", "frontenda-store")}
                            </span>
                        </div>
                    )}
                    <div data-currency="€">
                        {formatPrice(hit.regular_price)}
                    </div>
                </div>
            </div>
            <div className="hidden items-center gap-2 md:flex">
                <button
                    className="opacity-0 hover:!opacity-100 group-hover:opacity-50"
                    type="button"
                    title="Select"
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="currentColor"
                    >
                        <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                    </svg>
                </button>
                <button
                    className="opacity-50 hover:opacity-100 "
                    type="button"
                    title="Select"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 2C13.5913 2 15.1174 2.63214 16.2426 3.75736C17.3679 4.88258 18 6.4087 18 8V9H22V11H20.833L20.076 20.083C20.0552 20.3329 19.9413 20.5658 19.7568 20.7357C19.5723 20.9055 19.3308 20.9999 19.08 21H4.92C4.66925 20.9999 4.4277 20.9055 4.24322 20.7357C4.05875 20.5658 3.94481 20.3329 3.924 20.083L3.166 11H2V9H6V8C6 6.4087 6.63214 4.88258 7.75736 3.75736C8.88258 2.63214 10.4087 2 12 2V2ZM18.826 11H5.173L5.84 19H18.159L18.826 11ZM13 13V17H11V13H13ZM9 13V17H7V13H9ZM17 13V17H15V13H17ZM12 4C10.9738 4 9.98677 4.39444 9.24319 5.10172C8.4996 5.80901 8.05631 6.77504 8.005 7.8L8 8V9H16V8C16 6.97376 15.6056 5.98677 14.8983 5.24319C14.191 4.4996 13.225 4.05631 12.2 4.005L12 4Z" />
                    </svg>
                </button>
            </div>
        </a>
    );
}
