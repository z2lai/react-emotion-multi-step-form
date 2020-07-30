function throttle(func, period) {
    let isThrottled = false;
    let args;
    let context;

    function throttledFunc() {
        if (isThrottled) {
            args = arguments;
            context = this;
            return;
        }

        isThrottled = true;
        func.apply(this, arguments);

        setTimeout(function () {
            isThrottled = false;
            if (args) {
                throttledFunc.apply(context, args);
                args = context = null;
            }
        }, period);
    }

    return throttledFunc;
}

export default throttle;