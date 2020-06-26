const debounce = (func, timer) => {
    let timeout;
    return function debouncedFunc() {
        const context = this;
        const args = arguments;
        console.log(`timeout ${timeout} cleared`);
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), timer);
        console.log(`timeout ${timeout} created`);
    }
}

export default debounce;