import { LIKE_POST } from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case LIKE_POST:
            return state.map((post) => {
                return {
                    ...post,
                    Likes: [action.payload.userId, action.payload.postId],
                };
            });
        default:
            return state;
    }
}
