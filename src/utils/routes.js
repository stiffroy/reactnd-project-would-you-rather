export const ROUTES = {
    home: '/',
    login: '/login',
    new_poll: '/add',
    view_poll:'/questions/:question_id',
    leaderboard: '/leaderboard',
}

export const questionRoute = (id) => {
    return `/questions/${id}`
}