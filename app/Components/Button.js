var React = require('react-native');
var {
  TouchableHighlight,
  Text,
  StyleSheet
} = React;

var Button = React.createClass({
  onPress: function() {
    this.props.onPress();
  },

  getOpacity: function() {
    if (this.props.disabled) {
      return 0.25;
    } else {
      return 1;
    }
  },

  render: function() {
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + this.props.text);
    return(
      <TouchableHighlight
        style={[styles.button, {opacity: this.getOpacity()}]}
        onPress={this.onPress}
      >
        <Text style={styles.buttonText}>{this.props.text.toUpperCase()}</Text>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498DB',
    margin: 10,
    borderRadius: 4
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    letterSpacing: 6,
    textAlign: 'center',
    fontWeight: '700',
    padding: 16,
    borderRadius: 4
  }
});

module.exports = Button;
