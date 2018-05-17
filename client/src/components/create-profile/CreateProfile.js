import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: '',
			company: '',
			website: '',
			location: '',
			status: '',
			skills: '',
			githubusername: '',
			bio: '',
			twitter: '',
			facebook: '',
			linkedin: '',
			youtube: '',
			instagram: '',
			errors: {}
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();

		console.log('submit');
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	render() {
		const {errors} = this.state;
		const options = [
			{label: 'Select professional status', value: 0},
			{label: 'Developer', value: 'Developer'},
			{label: 'Junior Developer', value: 'Junior Developer'},
			{label: 'Senior Developer', value: 'Senior Developer'},
			{label: 'Manager', value: 'Manager'},
			{label: 'Student or Learning', value: 'Student or Learning'},
			{label: 'Instructor', value: 'Instructor'},
			{label: 'Intern', value: 'Intern'},
			{label: 'Other', value: 'Other'}
		]; // Select options for status
		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Create Your Profile</h1>
							<p className="lead text-center">Let's get some information to make your profile stand out</p>
							<small className="d-block pb-3 text-muted">* = required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup 
								placeholder="* Profile Handle"
								name="handle"
								value={this.state.handle}
								onChange={this.onChange}
								errors={errors.handle}
								info="A unique handle for your profile URL. Your full name, company name, nickname, etc."
								/>
								<SelectListGroup 
								placeholder="Status"
								name="status"
								value={this.state.status}
								onChange={this.onChange}
								options={options}
								errors={errors.status}
								info="Give us an idea of the current status of your career"
								/>
								<TextFieldGroup 
								placeholder="Company"
								name="company"
								value={this.state.company}
								onChange={this.onChange}
								errors={errors.company}
								info="What company do you work for?"
								/>
								<TextFieldGroup 
								placeholder="Website"
								name="website"
								value={this.state.website}
								onChange={this.onChange}
								errors={errors.website}
								info="Do you have a website you want to share?"
								/>
								<TextFieldGroup 
								placeholder="Location"
								name="location"
								value={this.state.location}
								onChange={this.onChange}
								errors={errors.location}
								info="City or city and state suggested (eg. Boston, Ma)"
								/>
								<TextFieldGroup 
								placeholder="Skills"
								name="skills"
								value={this.state.skills}
								onChange={this.onChange}
								errors={errors.skills}
								info="Please use comma separated values (eg. HTML,CSS,JavaScript, PHP)"
								/>
								<TextFieldGroup 
								placeholder="Github Username"
								name="githubusername"
								value={this.state.githubusername}
								onChange={this.onChange}
								errors={errors.githubusername}
								info="If you want your latest repos and a Github Link, include your username"
								/>
								<TextAreaFieldGroup 
								placeholder="Short Bio"
								name="bio"
								value={this.state.bio}
								onChange={this.onChange}
								errors={errors.bio}
								info="Tell us a little about yourself"
								/>

								<div className="mb-3">
									<button onClick={() => {
										this.setState(prevState => ({
											displaySocialInputs: !prevState.displaySocialInputs
										}))
									}} className="btn btn-light">
									Add Social Network Links
									</button>
									<span className="text-muted">Optional</span>
								</div>
								
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = ({profile, errors}) => ({
	profile, errors
});

export default connect(mapStateToProps)(CreateProfile);