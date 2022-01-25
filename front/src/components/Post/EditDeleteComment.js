import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../actions/post.actions";
import { UidContext } from "../AppContext";

const EditDeleteComment = (comment, postId) => {
    const userData = useSelector((state) => state.userReducer);
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const handleEdit = (e) => {
        e.preventDefault();

        if (text) {
            dispatch(
                editComment(comment.comment.postId, comment.comment.id, text)
            );
            setText("");
            setEdit(false);
        }
    };
    const handleDelete = () =>
        dispatch(deleteComment(comment.comment.postId, comment.comment.id));

    useEffect(() => {
        if ((uid === comment.comment.userId) | userData.admin) {
            setIsAuthor(true);
            console.log(comment);
        }
        return () => {};
    }, [uid, comment.comment.userId]);

    return (
        <div className="edit-comment">
            {isAuthor && edit === false && (
                <span onClick={() => setEdit(!edit)}>
                    <i class="far fa-edit" alt="edit-comment" />
                </span>
            )}
            {isAuthor && edit && (
                <form
                    action=""
                    onSubmit={handleEdit}
                    className="edit-comment-form"
                >
                    <div
                        className="edit-btn"
                        htmlFor="text"
                        onClick={() => setEdit(!edit)}
                    >
                        <i class="fas fa-edit"></i>
                    </div>
                    <div
                        className="delete-comment-btn"
                        onClick={() => {
                            if (
                                window.confirm(
                                    "Voulez-vous supprimer ce commentaire ?"
                                )
                            )
                                handleDelete();
                        }}
                    >
                        <i class="far fa-trash-alt" alt="delete" />
                    </div>

                    <br />
                    <textarea
                        type="text"
                        name="text"
                        onChange={(e) => setText(e.target.value)}
                        defaultValue={comment.comment.content}
                        cols="25"
                        rows="3"
                    />
                    <br />
                    <input type="submit" value="Valider modifications" />
                </form>
            )}
        </div>
    );
};

export default EditDeleteComment;
