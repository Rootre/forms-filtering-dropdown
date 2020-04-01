import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import Dropdown from '@rootre/forms-dropdown';
import dropdownStyles from '@rootre/forms-dropdown/styles.scss';

import useFilterItems from './useFilterItems';

import styles from './styles.scss';

const highlightedKey = 'highlightedResult';

export default function FilteringDropdown(
    {
        items = [],
        searchIn = 'label',
        labelKey = 'label',
        initialIsOpened = false,
        initialSearchText = '',
        texts = {
            noResults: 'No results...',
            searchPlaceholder: 'filter items...',
        },
        ...rest
    }
) {
    const [filteredItems, searchText, setSearchText] = useFilterItems(items, searchIn, initialSearchText);
    const inputRef = useRef();
    const openController = useState(initialIsOpened);
    const [isOpen] = openController;

    function itemTemplate(item, handleSelect, index) {
        const {header, [highlightedKey]: highlightedLabel, [labelKey]: label} = item;

        return (
            <div key={index} className={classNames(dropdownStyles.item, {
                [styles.header]: header,
            })} onClick={() => !header && handleSelect(item)}>
                {header ? label : highlightedLabel ? <span dangerouslySetInnerHTML={{__html: highlightedLabel}}/> : label}
            </div>
        );
    }

    if (items.length && filteredItems.length === 0) {
        filteredItems.push({
            header: true,
            [labelKey]: texts.noResults,
        });
    }

    useEffect(() => {
        isOpen && inputRef.current && inputRef.current.focus();
    }, [isOpen]);

    return (
        <Dropdown
            controllers={{
                open: openController,
            }}
            items={filteredItems.reduce((acc, item) => {
                acc.push(item);

                return acc;
            }, [{
                header: true,
                [labelKey]: (
                    <div className={styles.input}>
                        <input ref={inputRef} value={searchText} onChange={e => setSearchText(e.target.value)} placeholder={texts.searchPlaceholder}/>
                    </div>
                ),
            }])}
            itemTemplate={itemTemplate}
            labelKey={labelKey}
            {...rest}
        />
    );
}