import React from 'react'
import { action, linkTo } from '@kadira/storybook'
import { specs, describe, it } from 'storybook-addon-specifications'
import { mount } from "enzyme";
import { expect } from "chai";

import CRUKSearchkitSelect from '../../src/components/ui/list/CRUKSearchkitSelect';

module.exports = (searchkit) => {
  const defaultItems = [
    { key: "a", label: "Item 1" },
    { key: "b", label: "Item 2", doc_count: 11, disabled: true },
    { key: "c", title: "Item 3", doc_count: 12 },
    { key: "d", title: "Item 4", doc_count: 15 },
  ];

  const selectedItems = [
    { key: "a", label: "Item 1" }
  ];

  const story = (
    <div className="container">
      <CRUKSearchkitSelect
        selectedItems={selectedItems}
        items={defaultItems}
        setItems={() => null}
      />
    </div>
  );

  return story;
}
