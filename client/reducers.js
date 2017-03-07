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

const toggle_track = (state, action) => {
    return {
        tracking: !state.tracking
    }
};

export default {
    move,
    resize,
    toggle_track
};