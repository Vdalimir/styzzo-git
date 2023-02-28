/** @jsx h */
import { h } from "preact";
import { autocomplete } from "@algolia/autocomplete-js";
import { createAlgoliaInsightsPlugin } from "@algolia/autocomplete-plugin-algolia-insights";
import insightsClient from "search-insights";
import { popularPlugin } from "./plugins/popularPlugin";
import { productsPlugin } from "./plugins/productsPlugin";
import { APP_ID, API_KEY } from "./constants";
import { __ } from "@wordpress/i18n";

const appId = APP_ID;
const apiKey = API_KEY;

insightsClient("init", { appId, apiKey, useCookie: true });

const algoliaInsightsPlugin = createAlgoliaInsightsPlugin({ insightsClient });

autocomplete({
    container: "#searchbox",
    plugins: [algoliaInsightsPlugin, popularPlugin, productsPlugin],
    placeholder: __("Пошук", "frontenda-store"),
    autoFocus: true,
    debug: true,
    translations: {
        clearButtonTitle: __("Очистити", "frontenda-store"),
        detachedCancelButtonText: __("Закрити", "frontenda-store"),
        submitButtonTitle: __("Відправити", "frontenda-store"),
    },
    stallThreshold: 1500,
    openOnFocus: true,
    render({ elements, render }, root) {
        const { popularPlugin: popular, productsPlugin: products } = elements;

        render(
            <div className="aa-PanelLayout aa-Panel--scrollable">
                <div className="aa-PanelSection--popular">{popular}</div>
                <div className="aa-PanelSection--products">{products}</div>
            </div>,
            root
        );
    },
});
