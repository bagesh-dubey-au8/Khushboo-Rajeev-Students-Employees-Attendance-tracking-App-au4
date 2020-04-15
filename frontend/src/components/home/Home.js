import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postAttendance, getAttendance } from "../../actions/attendanceActions";
import moment from "moment";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      status: "",
      date: "",
      reason: "",
      errors: {},
    };
    /* binding change and submit events to "this" */
    // this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const time = moment().format("h:mm:ss a");
    if (time === "9:00:00 am" || time <= "10:00:00 am") {
      this.setState({
        status: "Present",
      });
    } else if (time === "10:01:00 am" || time <= "5:00:00 pm") {
      this.setState({
        status: "Late",
      });
    } else {
      this.setState({
        status: "Absent",
      });
    }
  }

  // onChange(e) {
  //   this.setState({ [e.target.name]: e.target.value });
  // }

  onSubmit(e) {
    //to overide the default form behaviour
    e.preventDefault();

    const { user } = this.props.auth;
    console.log("consoling name ", user.name);
    const attendance = {
      username: user.username,
      status: this.state.status,
      date: Date.now(),
      reason: "",
      errors: {},
    };
    console.log("attendance", attendance);
    console.log("state has", this.state);

    this.props.postAttendance(attendance);
  }

  render() {
    const { user } = this.props.auth;
    // const { userAttendance } = this.props.attendance;
    // console.log("userAttendance", userAttendance);
    // console.log("user", user);

    return (
      <div className='container-fluid mt-5'>
        <div className='row'>
          <div className='container userdetail col-sm-12'>
            <div>
              <p className='mt-5'>Hi, {user.name}</p>
              <p>Joining Date is : {user.joined}</p>
              <p>Registered Email :{user.email}</p>
              <p>Registered Mobile : {user.mobile}</p>
              <p>current department :{user.department}</p>
            </div>
          </div>

          <div className='container markattendance mt-4 col-sm-12'>
            {/* <div>
              <p>
                {" "}
                <textarea
                  className='mt-4'
                  placeholder='Reason for being late today.. '
                  name='reason'
                  rows='2'
                  cols='30'></textarea>
              </p>
              <p>
                {" "}
                <button
                  type='submit'
                  className='btn btn-success markbtn mb-4'
                  type='submit'
                  disabled={this.state.click === false ? "" : "disable"}
                  onClick={() => {
                    this.handleAttendance();
                  }}>
                  I'm Present
                </button>{" "}
              </p>
              <br></br>
              {}
              <p
                className='mt-5'
                hidden={
                  this.state.status && this.state.click === true ? "" : "hidden"
                }>
                {" "}
                Successfully Submitted
              </p>
            </div> */}
            <form onSubmit={this.onSubmit}>
              <button className='btn btn-danger' type='submit'>
                Mark Attendance
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  // attendance: PropTypes.object.isRequired,
  postAttendance: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  attendance: state.userAttendance,
});

export default connect(mapStateToProps, { postAttendance, getAttendance })(
  Home
);
