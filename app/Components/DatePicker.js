var React = require('react-native');
var {
  DatePickerIOS,
  StyleSheet
} = React;

var DatePicker = React.createClass({
  getDefaultProps: function () {
    return {
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    };
  },

  getInitialState: function() {
    return {
      date: this.props.date,
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
    };
  },

  onDateChange: function(date) {
    this.setState({
      date: date
    });
    this.props.onDateChange(date);
  },

  onTimezoneChange: function(event) {
    var offset = parseInt(event.nativeEvent.text, 10);
    if (isNaN(offset)) {
      return;
    }
    this.setState({timeZoneOffsetInHours: offset});
  },

  render: function() {
    return(
      <DatePickerIOS
        {...this.props}
        mode="datetime"
        timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
        onDateChange={this.onDateChange}
      />
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

module.exports = DatePicker;
