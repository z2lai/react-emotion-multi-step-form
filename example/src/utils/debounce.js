const debounce = (func, timer) => {
    let timeout;
    return function debouncedFunc() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), timer);
    }
}

export default debounce;