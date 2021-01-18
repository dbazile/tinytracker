# tinytracker

![Build Status](https://dev.bazile.org/ci/status/tinytracker.svg)

![screenshot](/screenshot.png)

An over-engineered util that I use to keep track of my hours to make
timekeeping reconciliation suck a little less. Also, Pomodoro timer...

I suppose I _could_ just use pen and paper...

https://tinytracker.dev.bazile.org/


# Running

```
$ ./scripts/develop.sh
```


# Building

There is no build involved here. Just drop the `/public` directory
as-is into nginx, httpd, whatever and everything should just work.

That said, I won't perform software necromancy unless someone's paying
so your browser needs to be up to date enough to natively support:

* [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
* [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/var())
* [Default Function Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
* [Object/Array Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

There's probably more but if the browser has the stuff listed above,
it probably has the rest of the ES features I'm using.
