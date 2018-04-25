import { Instance as Flatpickr } from 'flatpickr/dist/types/instance.d';
import { ShortcutButtonsFlatpickr, ShortcutButtonsPlugin } from '../index';

// tslint:disable-next-line:no-var-requires
const flatpickr = require('flatpickr/dist/flatpickr.js');

flatpickr.defaultConfig.animate = false;

jest.useFakeTimers();

const createInstance = (config: ShortcutButtonsFlatpickr.Config): Flatpickr => {
    return flatpickr(
        document.createElement('input'),
        {
            plugins: [
                ShortcutButtonsPlugin(config),
            ],
        }
    ) as Flatpickr;
};

describe('ShortcutButtonsPlugin', () => {
    it('should fallback to default theme if none supplied', () => {
        const fp = createInstance({
            button: {
                label: 'test',
            },
        });

        const container = fp.calendarContainer.querySelector('.shortcut-buttons-flatpickr-wrapper.light');

        expect(container).not.toBeNull();

        fp.destroy();
    });

    it('should properly handle config.theme', () => {
        const fp = createInstance({
            button: {
                label: 'test',
            },
            theme: 'dark',
        });

        const container = fp.calendarContainer.querySelector('.shortcut-buttons-flatpickr-wrapper.dark');

        expect(container).not.toBeNull();

        fp.destroy();
    });

    it('should not include plugin\'s label if none supplied', () => {
        const fp = createInstance({
            button: {
                label: 'test',
            },
        });

        const container = fp.calendarContainer.querySelector(
            '.shortcut-buttons-flatpickr-wrapper .shortcut-buttons-flatpickr-label'
        );

        expect(container).toBeNull();

        fp.destroy();
    });

    it('should properly handle given config.label', () => {
        const fp = createInstance({
            button: {
                label: 'test',
            },
            label: 'or',
        });

        const container = fp.calendarContainer.querySelector(
            '.shortcut-buttons-flatpickr-wrapper .shortcut-buttons-flatpickr-label'
        );

        expect(container).not.toBeNull();
        expect(container.textContent).toBe('or');

        fp.destroy();
    });

    it('should properly handle a single config.button', () => {
        const fp = createInstance({
            button: {
                label: 'test',
            },
        });

        const container = fp.calendarContainer.querySelector(
            '.shortcut-buttons-flatpickr-wrapper .shortcut-buttons-flatpickr-buttons'
        );
        const buttons = container.querySelectorAll('.shortcut-buttons-flatpickr-button');
        const button = buttons[0] as HTMLButtonElement;

        expect(buttons.length).toBe(1);
        expect(button.textContent).toBe('test');
        expect(button.dataset.index).toBe('0');

        fp.destroy();
    });

    it('should properly handle multiple config.button', () => {
        const fp = createInstance({
            button: [{
                label: 'test 1',
            }, {
                label: 'test 2',
            }],
        });

        const container = fp.calendarContainer.querySelector(
            '.shortcut-buttons-flatpickr-wrapper .shortcut-buttons-flatpickr-buttons'
        );
        const buttons = container.querySelectorAll('.shortcut-buttons-flatpickr-button');
        const button1 = buttons[0] as HTMLButtonElement;
        const button2 = buttons[1] as HTMLButtonElement;

        expect(buttons.length).toBe(2);

        expect(button1.textContent).toBe('test 1');
        expect(button1.dataset.index).toBe('0');

        expect(button2.textContent).toBe('test 2');
        expect(button2.dataset.index).toBe('1');

        fp.destroy();
    });

    it('should properly handle a single config.onClick callback', () => {
        const onClick = jest.fn();
        const fp = createInstance({
            button: {
                label: 'test',
            },
            onClick,
        });

        const container = fp.calendarContainer.querySelector(
            '.shortcut-buttons-flatpickr-wrapper .shortcut-buttons-flatpickr-buttons'
        );
        const buttons = container.querySelectorAll('.shortcut-buttons-flatpickr-button');
        const button = buttons[0] as HTMLButtonElement;

        button.click();

        expect(onClick.mock.calls.length).toBe(1);
        expect(onClick.mock.calls[0][0]).toBe(0);
        expect(onClick.mock.calls[0][1]).toBe(fp);

        fp.destroy();
    });

    it('should properly handle a single config.onClick callback with multiple buttons', () => {
        const onClick = jest.fn();
        const fp = createInstance({
            button: [{
                label: 'test 1',
            }, {
                label: 'test 2',
            }],
            onClick,
        });

        const container = fp.calendarContainer.querySelector(
            '.shortcut-buttons-flatpickr-wrapper .shortcut-buttons-flatpickr-buttons'
        );
        const buttons = container.querySelectorAll('.shortcut-buttons-flatpickr-button');
        const button1 = buttons[0] as HTMLButtonElement;
        const button2 = buttons[1] as HTMLButtonElement;

        button1.click();
        button2.click();

        expect(onClick.mock.calls.length).toBe(2);

        expect(onClick.mock.calls[0][0]).toBe(0);
        expect(onClick.mock.calls[0][1]).toBe(fp);

        expect(onClick.mock.calls[1][0]).toBe(1);
        expect(onClick.mock.calls[1][1]).toBe(fp);

        fp.destroy();
    });

    it('should properly handle multiple config.onClick callbacks', () => {
        const onClick1 = jest.fn();
        const onClick2 = jest.fn();
        const fp = createInstance({
            button: {
                label: 'test',
            },
            onClick: [
                onClick1,
                onClick2,
            ],
        });

        const container = fp.calendarContainer.querySelector(
            '.shortcut-buttons-flatpickr-wrapper .shortcut-buttons-flatpickr-buttons'
        );
        const buttons = container.querySelectorAll('.shortcut-buttons-flatpickr-button');
        const button = buttons[0] as HTMLButtonElement;

        button.click();

        expect(onClick1.mock.calls.length).toBe(1);
        expect(onClick1.mock.calls[0][0]).toBe(0);
        expect(onClick1.mock.calls[0][1]).toBe(fp);

        expect(onClick2.mock.calls.length).toBe(1);
        expect(onClick2.mock.calls[0][0]).toBe(0);
        expect(onClick2.mock.calls[0][1]).toBe(fp);

        fp.destroy();
    });

    it('should not execute given config.onClick callback if clicked element isn\'t a button', () => {
        const onClick = jest.fn();
        const fp = createInstance({
            button: {
                label: 'test',
            },
            onClick,
        });

        const container = fp.calendarContainer.querySelector(
            '.shortcut-buttons-flatpickr-wrapper .shortcut-buttons-flatpickr-buttons'
        ) as HTMLElement;

        container.click();

        expect(onClick.mock.calls.length).toBe(0);

        fp.destroy();
    });
});
