import React from 'react';
import {
  FlatList,
} from 'react-native';

class SafelyNestedList extends React.Component {
  static propTypes = {
    ListComponent: PropTypes.shape({}).isRequired,
    nestedScrollEnabled: PropTypes.bool,
    onMomentumScrollEnd: PropTypes.func,
    onScrollEndDrag: PropTypes.func,
  }
  static defaultProps = {
    ListComponent: FlatList,
    nestedScrollEnabled: false,
    onMomentumScrollEnd: (e) => { },
    onScrollEndDrag: (e) => { },
  }
  constructor(nextProps) {
    super(nextProps);
    this.state = {
      nestedScrollEnabled: false,
    };
    this.__onMomentumScrollEnd = this.__onMomentumScrollEnd.bind(this);
    this.__onScrollEndDrag = this.__onScrollEndDrag.bind(this);
    this.__handleTransition = this.__handleTransition.bind(this);
  }
  componentWillUpdate(nextProps, nextState) {
    const {
      nestedScrollEnabled,
    } = nextProps;
    if (nestedScrollEnabled !== this.props.nestedScrollEnabled) {
      this.setState(
        {
          nestedScrollEnabled,
        },
      );
    }
  }
  __handleTransition(e, fn) {
    const {
      y,
    } = e.nativeEvent.contentOffset;
    const {
      nestedScrollEnabled,
    } = this.state;
    if (nestedScrollEnabled && y === 0) {
      this.setState(
        {
          nestedScrollEnabled: false,
        },
        () => fn(e),
      );
    }
  }
  __onMomentumScrollEnd(e) {
    const {
      onMomentumScrollEnd,
    } = this.props;
    return this.__handleTransition(
      e,
      onMomentumScrollEnd,
    );
  }
  __onScrollEndDrag(e) {
    const {
      onScrollEndDrag,
    } = this.props;
    return this.__handleTransition(
      e,
      onScrollEndDrag,
    );
  }
  render() {
    const {
      ListComponent: SomeListComponent,
      onScrollEndDrag,
      onMomentumScrollEnd,
      ...extraProps
    } = this.props;
    const {
      nestedScrollEnabled,
      ...extraState
    } = this.state;
    return (
      <SomeListComponent
        {...extraProps}
        onMomentumScrollEnd={this.__onMomentumScrollEnd}
        onScrollEndDrag={this.__onScrollEndDrag}
        nestedScrollEnabled={nestedScrollEnabled}
      />
    );
  }
}

export default SafelyNestedList;
