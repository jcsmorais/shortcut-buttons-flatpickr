import expect from 'expect.js';
import flatpickr from 'flatpickr';
import sinon from 'sinon';
import { ShortcutButtonsFlatpickr, ShortcutButtonsPlugin } from '../../src/index';

flatpickr.defaultConfig.animate = false;

const createInstance = (config: ShortcutButtonsFlatpickr.Config): flatpickr.Instance => {
    return flatpickr(
        document.createElement('input'),
        {
            plugins: [
                ShortcutButtonsPlugin(config),
            ],
        }
    ) as flatpickr.Instance;
};

describe('ShortcutButtonsPlugin', () => {
    before(() => {
        sinon.useFakeTimers();
    });

    it('should fallback to default theme if none supplied', () => {
        const fp = createInstance({
            button: {
                label: 'test',
            },
        });

        const container = fp.calendarContainer.querySelector('.shortcut-buttons-flatpickr-wrapper.light');

        expect(container).not.to.be(null);

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

        expect(container).not.to.be(null);

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

        expect(container).to.be(null);

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

        expect(container).not.to.be(null);
        expect(container.textContent).to.be('or');

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

        expect(buttons.length).to.be(1);
        expect(button.textContent).to.be('test');
        expect(button.dataset.index).to.be('0');

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

        expect(buttons.length).to.be(2);

        expect(button1.textContent).to.be('test 1');
        expect(button1.dataset.index).to.be('0');

        expect(button2.textContent).to.be('test 2');
        expect(button2.dataset.index).to.be('1');

        fp.destroy();
    });

    it('should properly handle a single config.onClick callback', () => {
        const onClick = sinon.spy();
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

        expect(onClick.callCount).to.be(1);
        expect(onClick.getCall(0).calledWith(0, fp)).to.be.ok();

        fp.destroy();
    });

    it('should properly handle a single config.onClick callback with multiple buttons', () => {
        const onClick = sinon.spy();
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

        expect(onClick.callCount).to.be(2);

        expect(onClick.getCall(0).args[0]).to.be(0);
        expect(onClick.getCall(0).args[1]).to.be(fp);

        expect(onClick.getCall(1).args[0]).to.be(1);
        expect(onClick.getCall(1).args[1]).to.be(fp);

        fp.destroy();
    });

    it('should properly handle multiple config.onClick callbacks', () => {
        const onClick1 = sinon.spy();
        const onClick2 = sinon.spy();
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

        expect(onClick1.callCount).to.be(1);

        expect(onClick1.getCall(0).args[0]).to.be(0);
        expect(onClick1.getCall(0).args[1]).to.be(fp);

        expect(onClick2.getCall(0).args[0]).to.be(0);
        expect(onClick2.getCall(0).args[1]).to.be(fp);

        fp.destroy();
    });

    it('should not execute given config.onClick callback if clicked element isn\'t a button', () => {
        const onClick = sinon.spy();
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

        expect(onClick.callCount).to.be(0);

        fp.destroy();
    });
});
