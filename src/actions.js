function predict(imageURL) {
    return { type: "PREDICT", payload:{imageURL:imageURL} };
}

function predictSuccess(data) {
    return { type: "PREDICT_SUCCESS", payload:{data:data} };
}

function predictFail() {
    return {type:"PREDICT_FAIL"}
}

export const actions = {
    predict,
    predictSuccess,
    predictFail
}