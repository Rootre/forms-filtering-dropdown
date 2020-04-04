# Filtering dropdown component

Filtering dropdown for various cases. Extends [@rootre/forms-dropdown](https://www.npmjs.com/package/@rootre/forms-dropdown)

## Installation

With yarn
```
yarn add @rootre/forms-filtering-dropdown
```

or with npm

```
npm install @rootre/forms-filtering-dropdown
```

## Usage

### Basic usage:

```jsx harmony
import React from 'react';
import Dropdown from '@rootre/forms-filtering-dropdown';
import '@rootre/forms-filtering-dropdown/styles.css';

export default function App() {
    const items = [
        {label: 'Cat'},
        {label: 'Dog'},
        {label: 'Rabbit'},
        {label: 'Parrot'},
    ];

    return (
        <div>
            <Dropdown 
                items={items}
                afterChange={item => {
                    console.log('selected item:', item);
                }}
            />
        </div>
    );
}
```

### Note

> 

## Demo

Check out basic [demo page](https://rootre.github.io/forms-filtering-dropdown/)

## Props

> It propagates props to [@rootre/forms-dropdown](https://www.npmjs.com/package/@rootre/forms-dropdown) 
component
>
> ! Note that `itemsTemplate` and `itemTemplate` are already overriden in order to make search input appear and work.
> If you override them yourself, you end up with broken functionality  

#### searchIn: `string`

> default: `label`

Determines which item's object property will be used for searching for matches 

#### initialSearchText: `string`

> default: `''`

If you want to have preset text in search input

#### texts: `object`

For localization of search strings

#### texts.noResults: `string`

> default: `'No results...'`

When no item matches search text

#### texts.searchPlaceholder: `string`

> default: `'Filter items...'`

Placeholder text in search input