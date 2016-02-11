var React = require('react-native');
var {
  View,
  TextInput,
  Text,
  StyleSheet,
  LayoutAnimation
} = React;

var Input = React.createClass({
  getInitialState: function() {
    return {
      height: 63
    }
  },

  getDefaultProps: function() {
    return {
      multiline: false,
      animated: false
    };
  },

  componentWillMount: function() {
    LayoutAnimation.easeInEaseOut();
  },

  onChange: function(event) {
    if (this.props.animated) {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        height: event.nativeEvent.contentSize.height
      });
    }
    this.props.onChange(event.nativeEvent.text);
  },

  getHeight: function() {
    if (this.state.height > 313.5) {
      return 313.5;
    } else {
      return this.state.height;
    }
  },

  render: function() {
    return(
      <TextInput
        {...this.props}
        ref='input'
        defaultValue={this.props.text}
        style={[styles.input, { height: this.getHeight(), marginTop: 63 - this.getHeight() }]}
        onChange={this.onChange}
      />
    );
  }
});

var styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    fontSize: 30,
    padding: 10,
    paddingBottom: 12,
    marginHorizontal: 10,
    borderRadius: 4
  }
});

module.exports = Input;
