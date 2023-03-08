const onMessageNotification = (isDisplayNotification) => {
    return {
        type: "MESSAGE_NOTIFICATION",
        payload: isDisplayNotification
    }
}

export default onMessageNotification