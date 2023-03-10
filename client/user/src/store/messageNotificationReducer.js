const messageNotification = (messageNotification = false, action) => {

    switch (action.type) {
        case ("MESSAGE_NOTIFICATION"):
            return action.payload;

        default:
            return messageNotification
    }
}

export default messageNotification