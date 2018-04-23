/*
 * Copyright (c) 2018 João Morais under the MIT license.
 * https://github.com/jcsmorais/shortcut-buttons-flatpickr/
 */

import { Instance as Flatpickr } from 'flatpickr/dist/types/instance.d';

export namespace ShortcutButtonsFlatpickr {
    export type OnClickSignature = (index: number, fp: Flatpickr) => void;

    export type Button = {
        label: string,
    };

    export type Config = {
        button: Button | Button[],
        label?: string,
        onClick?: OnClickSignature | OnClickSignature[],
        theme?: string,
    };
}

const defaultConfig: Partial<ShortcutButtonsFlatpickr.Config> = {
    theme: 'light',
};

/**
 * Adds shortcut buttons to flatpickr providing users an alternative way to interact with the datetime picker.
 *
 * Example usage:
 *
 * ```ts
 * flatpickr('.target-input-element', {
 *     // ...
 *     plugins: [ShortcutButtonsPlugin({
 *         button: {
 *             label: 'The Beginning Of Time',
 *         },
 *         onClick: (index: number, fp: Flatpickr) => {
 *             // Do something when a button is clicked
 *         },
 *         theme: 'light',
 *     })],
 * })
 * ```
 *
 * @param config Configuration options.
 *
 * Supported options are:
 *    `button`: button(s).
 *    `button.label`: button's label.
 *    `label`: label including a word/sentence stating that the user can use the calendar or one of the buttons.
 *    `onClick`: callback(s) invoked when plugin's buttons are clicked.
 *    `theme`: flatpickr's theme.
 */
export function ShortcutButtonsPlugin(config: ShortcutButtonsFlatpickr.Config) {
    const cfg = { ...defaultConfig, ...config };

    return (fp: Flatpickr) => {
        /**
         * Element that wraps this plugin's dependent elements.
         */
        let wrapper: HTMLElement;

        /**
         * Handles click events on plugin's button.
         */
        function onClick(event: Event) {
            event.stopPropagation();
            event.preventDefault();

            const target = event.target as HTMLButtonElement;
            if (target.tagName.toLowerCase() !== 'button' || typeof cfg.onClick === 'undefined') {
                return;
            }

            const index = parseInt(target.dataset.index, 10);

            const callbacks: ShortcutButtonsFlatpickr.OnClickSignature[] = Array.isArray(cfg.onClick) ?
                cfg.onClick :
                [cfg.onClick];

            for (const callback of callbacks) {
                if (typeof callback === 'function') {
                    callback(index, fp);
                }
            }
        }

        return {
            /**
             * Initialize plugin.
             */
            onReady: () => {
                wrapper = document.createElement('div');
                wrapper.classList.add('shortcut-buttons-flatpickr-wrapper', cfg.theme);

                if (typeof cfg.label !== 'undefined' && cfg.label.length) {
                    const label = document.createElement('div');
                    label.classList.add('shortcut-buttons-flatpickr-label');
                    label.textContent = cfg.label;

                    wrapper.appendChild(label);
                }

                const buttons = document.createElement('div');
                buttons.classList.add('shortcut-buttons-flatpickr-buttons');

                (Array.isArray(cfg.button) ? cfg.button : [cfg.button]).forEach((b, index) => {
                    const button = document.createElement('button');
                    button.classList.add('shortcut-buttons-flatpickr-button');
                    button.textContent = b.label;
                    button.dataset.index = String(index);

                    buttons.appendChild(button);
                });

                wrapper.appendChild(buttons);

                fp.calendarContainer.appendChild(wrapper);

                wrapper.addEventListener('click', onClick);
            },

            /**
             * Clean up before flatpickr is destroyed.
             */
            onDestroy: () => {
                wrapper.removeEventListener('click', onClick);
                wrapper = undefined;
            },
        };
    };
}
