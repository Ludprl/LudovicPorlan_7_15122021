import { GET_POSTS, LIKE_POST, UNLIKE_POST } from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return action.payload;
        case LIKE_POST:
            return state.map((post) => {
                if (post.id === action.payload.postId) {
                    return {
                        ...post,
                        Likes: [action.payload.userId, ...post.Likes],
                    };
                }
                return post;
            });
        case UNLIKE_POST:
            return state.map((post) => {
                if (post.id === action.payload.postId) {
                    return {
                        ...post,
                        Likes: post.Likes.filter(
                            (id) => id !== action.payload.userId
                        ),
                    };
                }
                return post;
            });
        default:
            return state;
    }
}
