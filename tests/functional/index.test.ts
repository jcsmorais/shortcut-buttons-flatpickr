import expect from 'expect.js';

// Note that each `browser.keys()` call below includes `\uE000`, an unidentified / null key in order to force the send
// keys command to have an implicit termination.
//
// http://webdriver.io/api/protocol/keys.html
// https://w3c.github.io/webdriver/#keyboard-actions

describe('Focus Trap', () => {
    it('should handle navigation through tabs while on a date picker with a single button', () => {
        browser.url('http://localhost:8008/focus-trap/date-with-single-button.html');

        const calendar = $('#calendar');
        calendar.waitForVisible();
        calendar.click();

        const button1 = $('.shortcut-buttons-flatpickr-button[data-index="0"]');
        button1.waitForVisible();

        // Pressing arrow down + tab on calendar moves focus to button
        browser.keys(['ArrowDown', 'Tab', '\uE000']);
        expect(button1.hasFocus()).to.be.ok();

        // Pressing shift + tab on button moves focus back to calendar
        browser.keys(['Shift', 'Tab', '\uE000']);
        expect(calendar.hasFocus()).to.be.ok();

        // Pressing arrow down + tab on calendar moves focus back to button
        browser.keys(['ArrowDown', 'Tab', '\uE000']);
        expect(button1.hasFocus()).to.be.ok();

        // Pressing tab on the button focus back to calendar
        browser.keys(['Tab', '\uE000']);
        expect(calendar.hasFocus()).to.be.ok();
    });

    it('should handle navigation through tabs while on a date picker with multiple buttons', () => {
        browser.url('http://localhost:8008/focus-trap/date-with-multiple-buttons.html');

        const calendar = $('#calendar');
        calendar.waitForVisible();
        calendar.click();

        const button1 = $('.shortcut-buttons-flatpickr-button[data-index="0"]');
        button1.waitForVisible();

        const button2 = $('.shortcut-buttons-flatpickr-button[data-index="1"]');
        button2.waitForVisible();

        const button3 = $('.shortcut-buttons-flatpickr-button[data-index="2"]');
        button3.waitForVisible();

        // Pressing arrow down + tab on calendar moves focus to first button
        browser.keys(['ArrowDown', 'Tab', '\uE000']);
        expect(button1.hasFocus()).to.be.ok();

        // Pressing shift + tab on first button moves focus back to calendar
        browser.keys(['Shift', 'Tab', '\uE000']);
        expect(calendar.hasFocus()).to.be.ok();

        // Pressing arrow down + tab on calendar moves focus back to first button
        browser.keys(['ArrowDown', 'Tab', '\uE000']);
        expect(button1.hasFocus()).to.be.ok();

        // Pressing tab on first button moves focus to second button
        browser.keys(['Tab', '\uE000']);
        expect(button2.hasFocus()).to.be.ok();

        // Pressing tab on second button moves focus to third button
        browser.keys(['Tab', '\uE000']);
        expect(button3.hasFocus()).to.be.ok();

        // Pressing tab on third button moves focus back to calendar
        browser.keys(['Tab', '\uE000']);
        expect(calendar.hasFocus()).to.be.ok();
    });

    it('should handle navigation through tabs while on a time picker with a single button', () => {
        browser.url('http://localhost:8008/focus-trap/time-with-single-button.html');

        const calendar = $('#calendar');
        calendar.waitForVisible();
        calendar.click();

        const hour = $('input.flatpickr-hour');
        hour.waitForVisible();

        const minute = $('input.flatpickr-minute');
        minute.waitForVisible();

        const amPm = $('.flatpickr-am-pm');
        amPm.waitForVisible();

        const button1 = $('.shortcut-buttons-flatpickr-button[data-index="0"]');
        button1.waitForVisible();

        // After clicking on calendar focus moves automatically to hour field
        expect(hour.hasFocus()).to.be.ok();

        // Pressing tab on hour field moves focus to calendar minute field
        browser.keys(['Tab', '\uE000']);
        expect(minute.hasFocus()).to.be.ok();

        // Pressing tab on minute field moves focus to calendar am/pm field
        browser.keys(['Tab', '\uE000']);
        expect(amPm.hasFocus()).to.be.ok();

        // Pressing tab on am/pm field moves focus to button
        browser.keys(['Tab', '\uE000']);
        expect(button1.hasFocus()).to.be.ok();

        // Pressing shift+tab on button moves focus back to calendar which then automagically moves focus
        // back to hour field
        browser.keys(['Shift', 'Tab', '\uE000']);
        expect(calendar.hasFocus()).to.be.ok();
        browser.waitUntil(() => hour.hasFocus());

        // Tab through time fields and move focus back to button
        browser.keys(['Tab', 'Tab', 'Tab', '\uE000']);
        expect(button1.hasFocus()).to.be.ok();

        // Pressing tab on button moves focus back to calendar
        browser.keys(['Tab', '\uE000']);
        expect(calendar.hasFocus()).to.be.ok();
    });

    it('should handle navigation through tabs while on a time picker with multiple buttons', () => {
        browser.url('http://localhost:8008/focus-trap/time-with-multiple-buttons.html');

        const calendar = $('#calendar');
        calendar.waitForVisible();
        calendar.click();

        const hour = $('input.flatpickr-hour');
        hour.waitForVisible();

        const minute = $('input.flatpickr-minute');
        minute.waitForVisible();

        const amPm = $('.flatpickr-am-pm');
        amPm.waitForVisible();

        const button1 = $('.shortcut-buttons-flatpickr-button[data-index="0"]');
        button1.waitForVisible();

        const button2 = $('.shortcut-buttons-flatpickr-button[data-index="1"]');
        button2.waitForVisible();

        const button3 = $('.shortcut-buttons-flatpickr-button[data-index="2"]');
        button3.waitForVisible();

        // After clicking on calendar focus moves automatically to hour field
        expect(hour.hasFocus()).to.be.ok();

        // Pressing tab on hour field moves focus to calendar minute field
        browser.keys(['Tab', '\uE000']);
        expect(minute.hasFocus()).to.be.ok();

        // Pressing tab on minute field moves focus to calendar am/pm field
        browser.keys(['Tab', '\uE000']);
        expect(amPm.hasFocus()).to.be.ok();

        // Pressing tab on am/pm field moves focus to first button
        browser.keys(['Tab', '\uE000']);
        expect(button1.hasFocus()).to.be.ok();

        // Pressing shift+tab on button moves focus back to calendar which then automagically moves focus
        // back to hour field
        browser.keys(['Shift', 'Tab', '\uE000']);
        expect(calendar.hasFocus()).to.be.ok();
        browser.waitUntil(() => hour.hasFocus());

        // Tab through time fields and move focus back to first button
        browser.keys(['Tab', 'Tab', 'Tab', '\uE000']);
        expect(button1.hasFocus()).to.be.ok();

        // Pressing tab on first button moves focus to second
        browser.keys(['Tab', '\uE000']);
        expect(button2.hasFocus()).to.be.ok();

        // Pressing tab on second button moves focus to third button
        browser.keys(['Tab', '\uE000']);
        expect(button3.hasFocus()).to.be.ok();

        // Pressing tab on third button moves focus back to calendar
        browser.keys(['Tab', '\uE000']);
        expect(calendar.hasFocus()).to.be.ok();
    });

    it('should handle navigation through tabs while on a date and time picker with a single button', () => {
        browser.url('http://localhost:8008/focus-trap/date-time-with-single-button.html');

        const calendar = $('#calendar');
        calendar.waitForVisible();
        calendar.click();

        const button1 = $('.shortcut-buttons-flatpickr-button[data-index="0"]');
        button1.waitForVisible();

        // Pressing arrow down + enter on calendar shows time fields and moves focus to hour field
        browser.keys(['ArrowDown', 'Enter', '\uE000']);

        const time = $('.flatpickr-time');
        time.waitForVisible();

        const hour = $('input.flatpickr-hour');
        hour.waitForVisible();
        browser.waitUntil(() => hour.hasFocus());

        // Tab through time fields and move focus back to button
        browser.keys(['Tab', 'Tab', 'Tab', '\uE000']);
        expect(button1.hasFocus()).to.be.ok();

        // Pressing shift+tab on button moves focus back to calendar
        browser.keys(['Shift', 'Tab', '\uE000']);
        expect(calendar.hasFocus()).to.be.ok();

        // Pressing arrow down + enter on calendar focuses moves focus to hour field
        browser.keys(['ArrowDown', 'Enter', '\uE000']);
        browser.waitUntil(() => hour.hasFocus());

        // Tab through time fields and move focus back to button
        browser.keys(['Tab', 'Tab', 'Tab', '\uE000']);
        expect(button1.hasFocus()).to.be.ok();

        // Pressing tab on button moves focus back to calendar
        browser.keys(['Tab', '\uE000']);
        expect(calendar.hasFocus()).to.be.ok();
    });

    it('should handle navigation through tabs while on a date and time picker with multiple buttons', () => {
        browser.url('http://localhost:8008/focus-trap/date-time-with-multiple-buttons.html');

        const calendar = $('#calendar');
        calendar.waitForVisible();
        calendar.click();

        const button1 = $('.shortcut-buttons-flatpickr-button[data-index="0"]');
        button1.waitForVisible();

        const button2 = $('.shortcut-buttons-flatpickr-button[data-index="1"]');
        button2.waitForVisible();

        const button3 = $('.shortcut-buttons-flatpickr-button[data-index="2"]');
        button3.waitForVisible();

        // Pressing arrow down + enter on calendar shows time fields and moves focus to hour field
        browser.keys(['ArrowDown', 'Enter', '\uE000']);

        const time = $('.flatpickr-time');
        time.waitForVisible();

        const hour = $('input.flatpickr-hour');
        hour.waitForVisible();
        browser.waitUntil(() => hour.hasFocus());

        // Tab through time fields and move focus back to button
        browser.keys(['Tab', 'Tab', 'Tab', '\uE000']);
        expect(button1.hasFocus()).to.be.ok();

        // Pressing shift+tab on button moves focus back to calendar
        browser.keys(['Shift', 'Tab', '\uE000']);
        expect(calendar.hasFocus()).to.be.ok();

        // Pressing arrow down + enter on calendar focuses moves focus to hour field
        browser.keys(['ArrowDown', 'Enter', '\uE000']);
        browser.waitUntil(() => hour.hasFocus());

        // Tab through time fields and move focus back to first button
        browser.keys(['Tab', 'Tab', 'Tab', '\uE000']);
        expect(button1.hasFocus()).to.be.ok();

        // Pressing tab on first button moves focus to second
        browser.keys(['Tab', '\uE000']);
        expect(button2.hasFocus()).to.be.ok();

        // Pressing tab on second button moves focus to third button
        browser.keys(['Tab', '\uE000']);
        expect(button3.hasFocus()).to.be.ok();

        // Pressing tab on third button moves focus back to calendar
        browser.keys(['Tab', '\uE000']);
        expect(calendar.hasFocus()).to.be.ok();
    });
});
