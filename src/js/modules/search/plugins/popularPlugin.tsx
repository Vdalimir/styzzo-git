/** @jsx h */
import { h } from "preact";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";
import { searchClient } from "../searchClient";
import { PopularHit } from "../types/PopularHit";
import { ALGOLIA_PRODUCTS_SUGGESTIONS_INDEX_NAME, LOCALE } from "../constants";
import { __ } from "@wordpress/i18n";

export const popularPlugin = createQuerySuggestionsPlugin({
    searchClient,
    indexName: ALGOLIA_PRODUCTS_SUGGESTIONS_INDEX_NAME,
    getSearchParams() {
        return {
            query: "",
            hitsPerPage: 6,
            filters: `locale:${LOCALE}`,
        };
    },
    transformSource({ source }) {
        return {
            ...source,
            sourceId: "popularPlugin",
            getItemInputValue({ item }) {
                return item.query;
            },
            onSelect({ setIsOpen }) {
                setIsOpen(true);
            },
            templates: {
                header({ Fragment }) {
                    return (
                        <Fragment>
                            <span className="aa-SourceHeaderTitle">
                                {__("Часто шукають", "frontenda-store")}
                            </span>
                            <div className="aa-SourceHeaderLine" />
                        </Fragment>
                    );
                },
                item({ item }) {
                    return <PopularItem hit={item} />;
                },
            },
        };
    },
});

type PopularItemProps = {
    hit: PopularHit;
};

function PopularItem({ hit }: PopularItemProps) {
    return (
        <div className="cursor-pointer rounded bg-red-girl bg-opacity-50 px-2 py-0.5 text-sm before:mr-2 before:font-icon before:content-['\e902'] hover:bg-opacity-100 active:bg-red-boy">
            {hit.query}
        </div>
    );
}
