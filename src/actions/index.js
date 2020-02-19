import jsonPlaceholder from '../api/jsonPlaceholder'
import _ from 'lodash';
// export const fetchPosts =  () => {
//     return async (dispatch)=> {
//         const response = await jsonPlaceholder.get('/posts')
//         dispatch({
//             type: 'FETCH_POSTS',
//             payload: response
//         })
//     }


// }

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts())

    //   console.log(' getState().posts-----', getState().posts)
    const userIds = _.uniq(_.map(getState().posts, 'userId'))
    userIds.forEach(id => dispatch(fetchUser(id)))
    // userIds.map(id)

    // _.chain(fetState().posts).map()
}

export const fetchPosts = () => async (dispatch) => {
    const response = await jsonPlaceholder.get('/posts')
    dispatch({
        type: 'FETCH_POSTS',
        payload: response.data
    })
}



export const selectPost = () => {
    return {
        type: 'SELECT_POST'
    }
}


export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
const _fetchUser = _.memoize(async (id, dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data });
});

// export const fetchUser = _.memorize(function (id) {
//     return async function (dispatch) {
//         const response = await jsonPlaceholder.get(`/users/${id}`)
//         dispatch({ type: 'FETCH_USER', payload: response.data })
//     }
// })