import React, { Component } from "react";
import axios from "axios";
import CustomModal from "./CustomModal";
import { Paper, Grid, Typography } from "@material-ui/core";



class Teams extends Component {
    state = {
        loading: true,
        modals: new Array(365).fill(false),
        data: {}
    }
    options = { day: "numeric", month: "long" }
    componentDidMount() {
        if (this.state.loading) {
            axios.get("https://calendarific.com/api/v2/holidays?country=IN&year=2019&api_key=41f1dd985d2c9a353355afa980110317f4204edf")
                .then(res => {
                    const { holidays } = res.data.response;
                    let temp = {};
                    holidays.forEach((value, idx) => {
                        let iso = value.date.iso;
                        temp = {
                            ...temp,
                            [iso]: {
                                date: iso,
                                ...temp[iso],
                                [idx]: {
                                    name: value.name,
                                    description: value.description,
                                    type: value.type,
                                    locations: value.locations,
                                    states: value.states
                                }
                            }
                        }
                    });
                    this.setState((oldState) => ({ ...oldState, data: temp, loading: false }))
                }).catch(error=> { this.setState({loading:"d"})});
  }
        }
// loads loading screen when called
    getLoadingScreen = () => (
        <Grid item lg={12} md={4} xs={6} style={{ margin: "0 auto", textAlign: "center" }}>
            <Typography variant="h2">
                Loading...
            </Typography>
        </Grid>
    )
    // loads error screen if api call fails
    getErrorScreen=()=>(
      <Grid item lg={12} md={24} xs={24} style={{ margin: "0 auto", textAlign: "center" }}>
          <Typography variant="h3">
        Error Loading Data
          </Typography>
      </Grid>
    )
    //opens modal when grid elements are clicked
    openModal = (e, idx) => {
        const modals = this.state.modals;
        modals[idx] = true;
        this.setState((oldState) => ({ ...oldState, modals }));
    }
      //closes modal when the close button is clicked
    closeModal = (idx) => {
        const modals = this.state.modals;
        modals[idx] = false;
        this.setState((oldState) => ({ ...oldState, modals }));
    }
    //here it fetches current date of the system and then check if an holiday or not and then proceeds to check if its greater or smaller than it ,also then it attaches modals to each grid item.
    getFetchedData = () => (
        <Grid container wrap="wrap" style={{ textAlign: "center" }} spacing={40}>
            {
                Object.keys(this.state.data).map((item, idx) => {
                    const currDate = new Date();
                    const date = new Date(item);
                    if ( currDate.toDateString() === date.toDateString() )
                        this.props.todayIsHoliday(this.state.data[item]);

                    if (!this.props.invert && date < currDate)
                        return (<></>);
                    else if (this.props.invert && date > currDate)
                        return (<></>);

                    return (
                        <Grid item  lg={3} key={idx}>
                            <Typography variant="h4" style={{fontWeight: "bold"}} onClick={(e) => this.openModal(e, idx)}>
                                {new Date(item).toLocaleString("latn", this.options).split(" ").reverse()[0]}
                                <Typography variant="h5">
                                    {new Date(item).toLocaleString("latn", this.options).split(" ").reverse()[1]}
                                </Typography>
                            </Typography>
                            <CustomModal isOpen={this.state.modals[idx]} closeModal={() => this.closeModal(idx)} data={this.state.data[item]} />
                        </Grid>
                    )
                })
            }
        </Grid>
    )
    render() {
        return (
            <Paper>
                {
             (this.state.loading === true) ?  this.getLoadingScreen() : (this.state.loading === false) ? this.getFetchedData() : this.getErrorScreen()

                }
            </Paper>
        )
    }
}

export default Teams;
