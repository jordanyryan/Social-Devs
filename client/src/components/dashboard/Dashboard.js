import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getCurrentProfile} from '../../actions/profileActions';

class Dashboard extends Component {
	componentWillMount() {
		this.props.getCurrentProfile();
	}

	render() {
		return(
			<div>
				Dashboard
			</div>
		)
	}
}

const mapStateToProps = ({profile, profiles, loading}) => ({
	profile, profiles, loading
});

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);