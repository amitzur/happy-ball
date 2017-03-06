const move = (state, action) => {
    return {
        left: action.left,
        top: action.top
    };
};

const resize = (state, action) => {
    return {
        size: action.size
    };
};

export default {
    move,
    resize
};