import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {
	onDeleteClick(id) {
		this.props.deleteEducation(id, this.props.history);
	}

	render() {
		const education = this.props.education.map(edu => (
			<tr key={edu._id}>
				<td>{edu.school}</td>
				<td>{edu.degree}</td>
				<td><Moment format="MM/DD/YYYY">{edu.from}</Moment> - {edu.to === null ? ' Now' : (<Moment format="MM/DD/YYYY">{edu.to}</Moment>)}</td>
				<td><button onClick={this.onDeleteClick.bind(this, edu._id)} type="button" className="btn btn-danger">Delete</button></td>
			</tr>
		))
		return (
			<div>
				<h4 className="mb-4">Education Credentials</h4>
				<table className="table">
					<thead>
						<tr>
							<th>School</th>
							<th>Degree</th>
							<th>Date</th>
							<th></th>
						</tr>
						{education}
					</thead>
				</table>
			</div>
		)
	}
}

Education.propTypes = {
	deleteEducation: PropTypes.func.isRequired
}

export default connect(null, {deleteEducation})(Education);