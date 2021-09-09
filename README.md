# Shortcut buttons
[![CircleCI](https://circleci.com/gh/jcsmorais/shortcut-buttons-flatpickr/tree/master.svg?style=shield)](https://circleci.com/gh/jcsmorais/shortcut-buttons-flatpickr/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/jcsmorais/shortcut-buttons-flatpickr/badge.svg?branch=master)](https://coveralls.io/github/jcsmorais/shortcut-buttons-flatpickr?branch=master)
[![npm version](https://badge.fury.io/js/shortcut-buttons-flatpickr.svg)](https://badge.fury.io/js/shortcut-buttons-flatpickr)
[![flatpickr](https://img.shields.io/badge/flatpickr-4.6.3-brightgreen.svg)](https://flatpickr.js.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/jcsmorais/shortcut-buttons-flatpickr/master/LICENSE)
[![](https://data.jsdelivr.com/v1/package/npm/shortcut-buttons-flatpickr/badge)](https://www.jsdelivr.com/package/npm/shortcut-buttons-flatpickr)

Shortcut buttons is a plugin for [flatpickr](https://flatpickr.js.org/) that provides users an alternative way to interact with the datetime picker.

![material_blue](https://user-images.githubusercontent.com/712667/39291812-091dd72c-48e9-11e8-9d3f-1eefd57be20a.png)
![material_green](https://user-images.githubusercontent.com/712667/39291811-090776bc-48e9-11e8-9a79-deed7306be37.png)
![confetti](https://user-images.githubusercontent.com/712667/39291814-0938bbc8-48e9-11e8-81b1-14a05f6fcd99.png)
![material_red](https://user-images.githubusercontent.com/712667/39291810-08ee5042-48e9-11e8-8f82-25eb76ce1068.png)
![light](https://user-images.githubusercontent.com/712667/39291809-08ba48d8-48e9-11e8-942d-33f68742f94f.png)
![dark](https://user-images.githubusercontent.com/712667/39291815-094fdbbe-48e9-11e8-9d54-f822d299317c.png)

# Motivation
Shortcut buttons development has been motivated by the need of having a fast, flexible and seemless alternative way for users to select specific date(s) without being forced to navigate through their calendars and individually select those date(s).

# Installation
Installing as a module:
```bash
yarn add shortcut-buttons-flatpickr
```

Installing on non-module environments:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/shortcut-buttons-flatpickr@0.1.0/dist/themes/light.min.css">
<script src="https://cdn.jsdelivr.net/npm/shortcut-buttons-flatpickr@0.1.0/dist/shortcut-buttons-flatpickr.min.js"></script>
```

# API
| Params                | Type                     | Description                                                                                                                                                                      |
|-----------------------|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `button`              | `Object`, `Object[]`     | Button(s).                                                                                                                                                                       |
| `[button.attributes]` | `Object`                 | Button's attributes.<br/>Supported attributes: `accesskey`, `aria-label`, `class` and `tabindex`.                                                                                                     |
| `button.label`        | `string`                 | Button's label.                                                                                                                                                                  |
| `[label]`             | `string`                 | Label including a word/sentence stating that the user can use the calendar or one of the buttons.                                                                                |
| `onClick`             | `Function`, `Function[]` | Callback(s) invoked when plugin's buttons are clicked. Each callback is fed with two parameters:<br/>`index` - the index of the clicked button.<br/>`fp` - flatpickr's instance. |
| `[theme]`             | `string`                 | Flatpickr's theme, defaults to `light` if none supplied.                                                                                                                         |

# Usage Examples
* [Beginning Of Time](http://bit.ly/2jjcQK0)
* [Clear Date Selection](http://bit.ly/2wrPyYp)
* [Quick Month Selection](http://bit.ly/2KdleFS)
* [US Holidays Navigator](http://bit.ly/2raWK9D)
* [Yesterday, Today and Tomorrow](http://bit.ly/2KrWMC0)
