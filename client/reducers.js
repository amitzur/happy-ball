const move = (state, action) => {
    return {
        left: action.left,
        top: action.top
    };
};

const resize = (state, action) => {
    return {
        scale: action.scale
    };
};

export default {
    move,
    resize
};