import React, { Component } from 'react';
import Modal from 'react-modal';
import { Grid, Typography, Chip, Button } from '@material-ui/core';

Modal.setAppElement('#root')


// Props
// closeModal:
// closeModal()
// data:
// {…}
// 30:
// {…}
// description:
// "Mother’s Day celebrates the achievements and efforts of mothers and mother figures."
// locations:
// "All"
// name:
// "Mother's Day"
// states:
// "All"
// type:
// Array[1]
// date:

class CustomModal extends Component {
    closeModal = () => this.props.closeModal();
    render() {
        const options = { day: "numeric", month: "long", year: "numeric" }
        let { date } = this.props.data;
        const dateObj = new Date(date);
        let formatDate = dateObj.toLocaleString("en-US", options).split(",")
        formatDate = formatDate[0].split(" ").reverse().join(" ") + formatDate[1];
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    onRequestClose={this.closeModal}
                >
                    <Grid container alignItems={"center"} justify={"center"} direction={"column"} spacing={40}>
                        <Grid item>
                            <Typography variant={"h3"}>
                                {formatDate}
                            </Typography>
                        </Grid>
                        {
                            Object.keys(this.props.data).map((val, idx) => {
                                if (val === "date")
                                    return (<></>);
                                return (
                                    <>
                                        <Grid item md={9} lg={8} xs={12} key={idx}>
                                            <Typography variant={"h4"} style={{fontWeight: "bold"}}>
                                                {this.props.data[val].name}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={9} lg={8} xs={12} key={idx}>
                                            <Grid container alignItems={"center"} justify={"center"} spacing={40}>
                                                {this.props.data[val].type.map((val, idx) => (
                                                    <>
                                                        <Grid item key={idx}>
                                                            <Chip label={val} color={"primary"}/>
                                                        </Grid>
                                                    </>
                                                ))}
                                            </Grid>
                                        </Grid>
                                        <Grid item md={9} lg={8} xs={12} key={idx} style={{fontSize:'20px'}}>
                                            {this.props.data[val].description}
                                        </Grid>
                                    </>
                                )
                            })
                        }
                        <Grid item md={9} lg={8} xs={12}>
                            <Button variant={"contained"} color={"secondary"} onClick={this.closeModal}>Close</Button>
                        </Grid>
                    </Grid>
                </Modal>
            </div>
        )
    }
}

export default CustomModal;
