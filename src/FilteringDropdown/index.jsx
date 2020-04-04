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
        controllers = {
            active: null,
            open: null,
        },
        searchIn = 'label',
        labelKey = 'label',
        initialIsOpened = false,
        initialSearchText = '',
        texts = {
            noResults: 'No results...',
            searchPlaceholder: 'Filter items...',
        },
        ...rest
    }
) {
    const [filteredItems, searchText, setSearchText] = useFilterItems(items, searchIn, initialSearchText);
    const inputRef = useRef();
    const openController = controllers.open || useState(initialIsOpened);
    const [isOpen] = openController;

    function itemTemplate(item, handleSelect, index) {
        const {_disabled, [highlightedKey]: highlightedLabel, [labelKey]: label} = item;

        return (
            <div key={index} className={classNames(dropdownStyles.item, {
                [styles.disabled]: _disabled,
            })} onClick={() => !_disabled && handleSelect(item)}>
                {highlightedLabel ? <span dangerouslySetInnerHTML={{__html: highlightedLabel}}/> : label}
            </div>
        );
    }
    function itemsTemplate(items, handleSelect) {
        return (
          <>
              <div className={styles.input}>
                  <input ref={inputRef} value={searchText} onChange={e => setSearchText(e.target.value)} placeholder={texts.searchPlaceholder}/>
              </div>
              <div className={dropdownStyles.list}>
                  {items.map((item, index) => itemTemplate(item, handleSelect, index))}
              </div>
          </>
        )
    }

    if (items.length && filteredItems.length === 0) {
        filteredItems.push({
            _disabled: true,
            [labelKey]: texts.noResults,
        });
    }

    useEffect(() => {
        isOpen && inputRef.current && inputRef.current.focus();
    }, [isOpen]);

    return (
        <Dropdown
            controllers={{
                ...controllers,
                open: openController,
            }}
            items={filteredItems}
            itemTemplate={itemTemplate}
            itemsTemplate={itemsTemplate}
            labelKey={labelKey}
            {...rest}
        />
    );
}