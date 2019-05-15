import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class MyTabs extends Component {
    state = {
        value: 0
    }
//sets the state variable value to new value and then passes it further
    handleChange = (event, newValue) => {
        this.setState({ value: newValue }, () => this.props.switchContent(newValue));
    }

    render() {
        return (
            <Paper>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    centered
                    variant={"fullWidth"}
                >
                    <Tab label="Upcoming Holidays" />
                    <Tab label="Passed Holidays" />
                </Tabs>
            </Paper>
        )
    }
}

export default MyTabs;
