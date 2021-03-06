import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LikeButton from './LikeButton';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost } from '../../actions/postActions';


class PostItem extends Component {

	onDeleteClick(id) {
		this.props.deletePost(id);
	}

	render() {
		const {post, auth, showActions} = this.props;

		return (
			<div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <a href="profile.html">
                    <img className="rounded-circle d-none d-md-block" src={post.avatar}
                      alt="" />
                  </a>
                  <br />
                  <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{post.text}</p>
                  {showActions ? (<span><LikeButton post={post} />
                  <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    Comments
                  </Link>
                  {post.user === auth.user.id ? (
          <button onClick={this.onDeleteClick.bind(this, post._id)} type="button" className="btn btn-danger mr-1">
                    <i className="fas fa-times" />
                  </button>
                  ) : null}</span>) : null}
                </div>
              </div>
            </div>
		)
	}
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
	deletePost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = ({auth}) => ({
	auth
})

export default connect(mapStateToProps, {deletePost})(PostItem);