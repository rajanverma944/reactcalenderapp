import React from 'react';
import Tabs from "./Components/Tabs";
import Calender from "./Components/Calender";
import { Grid, withStyles, Typography, Chip } from '@material-ui/core';


const style = {
  fullWidth: {
    width: "100%"
  },
  center: {
    margin: "2rem 0 5rem auto",
    textAlign: "center",
  },
  heading: {
    color: "#f16d32"
  }
}

class App extends React.Component {
  state = {
    selectedTab: 0,
    isTodayAHoliday: false,
    data: {}
  }

  switchContent = (selectedTab) => this.setState({ selectedTab });

  todayIsHoliday = (item) => {
    if (!this.state.isTodayAHoliday)
      this.setState((oldState) => ({ ...oldState, isTodayAHoliday: true, data: item }), () => console.log(this.state))
  }
//check if the current date is holdiay or not
  getHeading = () => {
    if (this.state.isTodayAHoliday)
      return (
        <>
          {

            Object.keys(this.state.data).map((val, idx) => {
              if (val === "date")
                return (<></>);
              return (

                <>
                  <Grid item md={9} lg={8} xs={12} key={idx}>
                    <Typography variant={"h5"}>
                      Hey, you got Holiday today.
                    </Typography>
                  </Grid>
                  <Grid item md={9} lg={8} xs={12} key={idx}>
                    <Typography variant={"h4"}>
                      {this.state.data[val].name}
                    </Typography>
                  </Grid>
                  <Grid item md={9} lg={8} xs={12} key={idx}>
                    <Grid container alignItems={"center"} justify={"center"} spacing={40}>
                      {this.state.data[val].type.map((val, idx) => (
                        <>
                          <Grid item key={idx}>
                            <Chip label={val} color={"secondary"} />
                          </Grid>
                        </>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item md={9} lg={8} xs={12} key={idx}>
                    {this.state.data[val].description}
                  </Grid>
                </>

              )
            })


          }
        </>
      )
    else
      return (
        <Grid item lg={8} md={8} xs={12}>
          <Typography variant={"h3"}>No Holiday Today</Typography>
        </Grid>
      )
  }

  // helps switch the  tabs using state variable and terniary operator
  getContent = () => this.state.selectedTab === 0 ? <Calender todayIsHoliday={this.todayIsHoliday} /> : <Calender invert todayIsHoliday={this.todayIsHoliday} />

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <Grid container justify={"center"} alignItems={"center"} className={classes.center} spacing={40}>
          {this.getHeading()}
        </Grid>
        <Grid container justify={"center"} alignItems={"center"}>
          <Grid item lg={8} md={8} xs={12}>
            <Tabs switchContent={this.switchContent} />
          </Grid>
        </Grid>
        <Grid container justify={"center"} alignItems={"center"} className={classes.center}>
          <Grid item lg={8} md={8} xs={12}>
            {this.getContent()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(style)(App);
