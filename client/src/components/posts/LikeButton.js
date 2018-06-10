import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {likePost } from '../../actions/postActions';


class LikeButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			likedByUser: false,
			likes: 0
		}
	}

	onLikeClick(id) {
		this.props.likePost(id);
	}

	componentDidMount() {
		const {post} = this.props;
		const likes = this.props.post.likes.length;
		const likedByUser = post.likes.find(x => x.user === this.props.auth.user.id) ? true : false;
		this.setState({likes, likedByUser});
	}

	render() {
		const {post} = this.props;
		const buttonClass = this.state.likedByUser ? "btn btn-info mr-1" : "btn btn-light mr-1";
		const iClass = this.state.likedByUser ? "fas fa-thumbs-up mx-2" : "fas text-info fa-thumbs-up mx-2";
		return (
			<button type="button" onClick={this.onLikeClick.bind(this, post._id)} className={buttonClass}>
	          <i className={iClass}></i>
	          <span className="badge badge-light">{this.state.likes}</span>
	        </button>
		)
	}
}

LikeButton.propTypes = {
	likePost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired
}

const mapStateToProps = ({auth}) => ({
	auth
});

export default connect(mapStateToProps, {likePost})(LikeButton);