import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createProfile, getCurrentProfile} from '../../actions/profileActions.js';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import isEmpty from '../../validation/is-empty';

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

	componentDidMount() {
		this.props.getCurrentProfile();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.errors) {
			this.setState({errors: nextProps.errors});
		}

		if(nextProps.profile.profile) {
			const profile = nextProps.profile.profile;
			const skillsCSV = profile.skills.join(',');

			// if !profile.field, make empty str
			['company', 'website', 'location', 'githubusername', 'bio'].forEach(field => {
				profile[field] = !isEmpty(profile[field]) ? profile[field] : '';
			})

			profile.social = !isEmpty(profile.social) ? profile.social : {};

			['twitter', 'facebook', 'youtube', 'linkedin', 'instagram'].forEach(field => {
				profile.social[field] = !isEmpty(profile.social[field]) ? profile.social[field] : '';
			})

		}
	}

	onSubmit(e) {
		e.preventDefault();
		const {handle, company, website, location, status, skills, githubusername, bio, twitter, facebook, linkedin, youtube, instagram} = this.state;
		const profileData = {handle, company, website, location, status, skills, githubusername, bio, twitter, facebook, linkedin, youtube, instagram};
		this.props.createProfile(profileData, this.props.history);
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	render() {
		const {errors, displaySocialInputs} = this.state;
		let socialInputs;
		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup
						placeholder="Twitter Profile Url"
						name="twitter"
						icon="fab fa-twitter"
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}
					/>
					<InputGroup
						placeholder="Facebook Profile Url"
						name="facebook"
						icon="fab fa-facebook"
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>
					<InputGroup
						placeholder="LinkedIn Profile Url"
						name="linkedin"
						icon="fab fa-linkedin"
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedin}
					/>
					<InputGroup
						placeholder="Youtube Profile Url"
						name="youtube"
						icon="fab fa-youtube"
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}
					/>
					<InputGroup
						placeholder="Instagram Profile Url"
						name="instagram"
						icon="fab fa-instagram"
						value={this.state.instagram}
						onChange={this.onChange}
						error={errors.instagram}
					/>
				</div>
			)
		}
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
							<h1 className="display-4 text-center">Edit Profile</h1>
							<small className="d-block pb-3 text-muted">* = required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup 
								placeholder="* Profile Handle"
								name="handle"
								value={this.state.handle}
								onChange={this.onChange}
								error={errors.handle}
								info="A unique handle for your profile URL. Your full name, company name, nickname, etc."
								/>
								<SelectListGroup 
								placeholder="Status"
								name="status"
								value={this.state.status}
								onChange={this.onChange}
								options={options}
								error={errors.status}
								info="Give us an idea of the current status of your career"
								/>
								<TextFieldGroup 
								placeholder="Company"
								name="company"
								value={this.state.company}
								onChange={this.onChange}
								error={errors.company}
								info="What company do you work for?"
								/>
								<TextFieldGroup 
								placeholder="Website"
								name="website"
								value={this.state.website}
								onChange={this.onChange}
								error={errors.website}
								info="Do you have a website you want to share?"
								/>
								<TextFieldGroup 
								placeholder="Location"
								name="location"
								value={this.state.location}
								onChange={this.onChange}
								error={errors.location}
								info="City or city and state suggested (eg. Boston, Ma)"
								/>
								<TextFieldGroup 
								placeholder="Skills"
								name="skills"
								value={this.state.skills}
								onChange={this.onChange}
								error={errors.skills}
								info="Please use comma separated values (eg. HTML,CSS,JavaScript, PHP)"
								/>
								<TextFieldGroup 
								placeholder="Github Username"
								name="githubusername"
								value={this.state.githubusername}
								onChange={this.onChange}
								error={errors.githubusername}
								info="If you want your latest repos and a Github Link, include your username"
								/>
								<TextAreaFieldGroup 
								placeholder="Short Bio"
								name="bio"
								value={this.state.bio}
								onChange={this.onChange}
								error={errors.bio}
								info="Tell us a little about yourself"
								/>

								<div className="mb-3">
									<button 
									type="button"
									onClick={() => {
										this.setState(prevState => ({
											displaySocialInputs: !prevState.displaySocialInputs
										}))
									}} className="btn btn-light">
									Add Social Network Links
									</button>
									<span className="text-muted">Optional</span>
								</div>
								{socialInputs}
								<input type="submit" value="Save" className="btn btn-info btn-block mt-4"/>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = ({profile, errors}) => ({
	profile, errors
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(CreateProfile));