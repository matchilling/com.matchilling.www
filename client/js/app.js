(function(window, document) {
    'use strict'

    let width,
        height,
        animatedHeader,
        canvas,
        ctx,
        circles,
        flashStep = 1,
        flashTrigger,
        hahaha = document.createElement('div'),
        target,
        animateHeader = true;

    document.addEventListener('DOMContentLoaded', function(event) {
        initHeader();
        initHahaha();
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    });

    function initHahaha() {
        hahaha.id = 'hahaha';
        hahaha.style.display = 'none';
        hahaha.style.height = height + 'px';

        document.body.appendChild(hahaha);
        document.getElementById('dontTouchThis').addEventListener('click', function() {
            hahaha.style.display = 'block';
            setTimeout(function() {
                hahaha.style.display = 'none';
            }, 1000);
        });
    }

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {
            x: 0,
            y: height
        };

        animatedHeader = document.getElementById('header-animated');
        animatedHeader.style.height = height + 'px';

        canvas = document.getElementById('hero');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        circles = [];
        for (var x = 0; x < width * 0.5; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }

    function scrollCheck() {
        if (document.body.scrollTop > height)
            animateHeader = false;
        else
            animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        animatedHeader.style.height = height + 'px';
        canvas.width = width;
        canvas.height = height;
    }

    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function Circle() {
        var _this = this;

        (function() {
            _this.pos = {};
            init();
        })();

        function init() {
            _this.pos.x = Math.random() * width;
            _this.pos.y = height + Math.random() * 100;
            _this.alpha = 0.1 + Math.random() * 0.3;
            _this.scale = 0.1 + Math.random() * 0.3;
            _this.velocity = Math.random();
        }

        this.draw = function() {
            if (_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI,
                false);
            ctx.fillStyle = 'rgba(255,147,190,' + _this.alpha + ')';
            ctx.fill();
        };
    }

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }

})(window, document);
