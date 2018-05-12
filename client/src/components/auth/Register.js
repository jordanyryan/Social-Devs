import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions.js';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			errors: {}
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.errors) {
			this.setState({errors: nextProps.errors});
		}
	}

	componentDidMount() {
		if(this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		const {name, email, password, password2} = this.state;
		const newUser = {name, email, password, password2};

		this.props.registerUser(newUser, this.props.history);
	}

	render() {
		const {errors} = this.state;

		return (
			<div className="register">
			    <div className="container">
			      <div className="row">
			        <div className="col-md-8 m-auto">
			          <h1 className="display-4 text-center">Sign Up</h1>
			          <p className="lead text-center">Create your Social Devs account</p>
			          <form noValidate onSubmit={this.onSubmit}>
			          	<TextFieldGroup name="name" type="name" placeholder="Name" onChange={this.onChange} error={errors.name} value={this.state.name}/>
			          	<TextFieldGroup name="email" type="email" placeholder="Email Address" onChange={this.onChange} error={errors.email} value={this.state.email} info="This site uses Gravatar so if you want a profile image, use a Gravatar email"/>
			            <TextFieldGroup name="password" type="password" placeholder="Password" onChange={this.onChange} error={errors.password} value={this.state.password}/>
			            <TextFieldGroup name="password2" type="password" placeholder="Confirm Password" onChange={this.onChange} error={errors.password2} value={this.state.password2}/>
			            <input type="submit" className="btn btn-info btn-block mt-4" />
			          </form>
			        </div>
			      </div>
			    </div>
  </div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = ({auth, errors}) => ({
	auth, errors
})




export default connect(mapStateToProps, {registerUser})(withRouter(Register));