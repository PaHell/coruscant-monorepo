// from: https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940
// great fight there#
// typed by @pahell
export function debounce<F extends (...args: unknown[]) => PromiseLike<ReturnType<F>> | ReturnType<F>>(func: F, waitFor: number) {
      let timeout: number | null = null;
      return (...args: Parameters<F>) =>
            new Promise(resolve => {
                  if (timeout) {
                        clearTimeout(timeout);
                  }
                  timeout = setTimeout(() => resolve(func(...args)), waitFor);
            });
}