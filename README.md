# react-native-safely-nested-list
For those rare times a nested FlatList needs to take over.

## 😔 Seriously?
All this `Component` is used for is for cases where a `List` needs to consume a parent's motion event data for the duration it's `contentOffset` is greater than `0`. You probably don't need it.

## 🚀 Getting Started
You can install via [npm](https://www.npmjs.com/package/@cawfree/react-native-safely-nested-list):
```
npm install --save @cawfree/react-native-safely-nested-list
```
Also, using [yarn](https://www.npmjs.com/package/@cawfree/react-native-safely-nested-list):
```
yarn add @cawfree/react-native-safely-nested-list
```

## ✍️  Example

```javascript
import React from 'react';
import {FlatList, Dimensions} from 'react-native';
import SafelyNestedList from '@cawfree/react-native-safely-nested-list';

const {
  width,
  height,
} = Dimensions.get('window');

export default class SafelyNestedList extends React.Component {
  state = {
    nestedScrollEnabled: false,
  }
  render() {
    const {
      nestedScrollEnabled,
    } = this.state;
    return (
      <FlatList
        style={{
          width,
          height: height * 0.5,
        }}
        data={['blue', 'red']}
        onEndReached={(e) => this.setState({
          nestedScrollEnabled: true,
        })}
        renderItem={({ item: backgroundColor, index }) => (
          <SafelyNestedList
            style={{
              width,
              height,
              backgroundColor,
            }}
          />
        )}
      />
    );
  }
}
```

## ✌️ License
[MIT](https://opensource.org/licenses/MIT).


