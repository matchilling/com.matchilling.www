(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (window, document) {
    'use strict';

    let animateHeader = true,
        width,
        height,
        animatedHeader,
        canvas,
        ctx,
        circles,
        flashStep = 1,
        flashTrigger,
        hahaha = document.createElement('div'),
        scream = new Audio('../assets/audio/death.ogg'),
        target;

    document.addEventListener('DOMContentLoaded', function (event) {
        initHahaha();
        initHeader();
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    });

    function initHahaha() {
        hahaha.id = 'hahaha';
        hahaha.style.display = 'none';
        hahaha.style.height = height + 'px';

        document.body.appendChild(hahaha);
        document.getElementById('dontTouchThis').addEventListener('click', function () {
            scream.play();
            hahaha.style.display = 'block';
            setTimeout(function () {
                hahaha.style.display = 'none';
            }, 2000);
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
        if (document.body.scrollTop > height) animateHeader = false;else animateHeader = true;
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

        (function () {
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

        this.draw = function () {
            if (_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
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
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
})(window, document);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsQ0FBQyxVQUFTLE1BQVQsRUFBaUIsUUFBakIsRUFBMkI7QUFDeEI7O0FBRUEsUUFBSSxnQkFBZ0IsSUFBcEI7QUFBQSxRQUNJLEtBREo7QUFBQSxRQUVJLE1BRko7QUFBQSxRQUdJLGNBSEo7QUFBQSxRQUlJLE1BSko7QUFBQSxRQUtJLEdBTEo7QUFBQSxRQU1JLE9BTko7QUFBQSxRQU9JLFlBQVksQ0FQaEI7QUFBQSxRQVFJLFlBUko7QUFBQSxRQVNJLFNBQVMsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBVGI7QUFBQSxRQVVJLFNBQVMsSUFBSSxLQUFKLENBQVUsMkJBQVYsQ0FWYjtBQUFBLFFBV0ksTUFYSjs7QUFhQSxhQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxVQUFTLEtBQVQsRUFBZ0I7QUFDMUQ7QUFDQTtBQUNBLGVBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsV0FBbEM7QUFDQSxlQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLE1BQWxDO0FBQ0gsS0FMRDs7QUFPQSxhQUFTLFVBQVQsR0FBc0I7QUFDbEIsZUFBTyxFQUFQLEdBQVksUUFBWjtBQUNBLGVBQU8sS0FBUCxDQUFhLE9BQWIsR0FBdUIsTUFBdkI7QUFDQSxlQUFPLEtBQVAsQ0FBYSxNQUFiLEdBQXNCLFNBQVMsSUFBL0I7O0FBRUEsaUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsTUFBMUI7QUFDQSxpQkFBUyxjQUFULENBQXdCLGVBQXhCLEVBQXlDLGdCQUF6QyxDQUEwRCxPQUExRCxFQUFtRSxZQUFXO0FBQzFFLG1CQUFPLElBQVA7QUFDQSxtQkFBTyxLQUFQLENBQWEsT0FBYixHQUF1QixPQUF2QjtBQUNBLHVCQUFXLFlBQVc7QUFDbEIsdUJBQU8sS0FBUCxDQUFhLE9BQWIsR0FBdUIsTUFBdkI7QUFD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S0FBUCxFQUFjLFFBQWQsRUFBd0IsR0FBeEIsQ0FBZDtBQUNBLFNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxRQUFRLE1BQVosSUFBc0IsQ0FBQyxPQUFPLHFCQUE5QyxFQUFxRSxFQUFFLENBQXZFLEVBQTBFO0FBQ3RFLGVBQU8scUJBQVAsR0FBK0IsT0FBTyxRQUFRLENBQVIsSUFBYSx1QkFBcEIsQ0FBL0I7QUFDQSxlQUFPLG9CQUFQLEdBQThCLE9BQU8sUUFBUSxDQUFSLElBQWEsc0JBQXBCLEtBQStDLE9BQU8sUUFBUSxDQUFSLElBQWEsNkJBQXBCLENBQTdFO0FBQ0g7O0FBRUQsUUFBSSxDQUFDLE9BQU8scUJBQVosRUFBbUM7QUFDL0IsZUFBTyxxQkFBUCxHQUErQixVQUFTLFFBQVQsRUFBbUIsT0FBbkIsRUFBNEI7QUFDdkQsZ0JBQUksV0FBVyxJQUFJLElBQUosR0FBVyxPQUFYLEVBQWY7QUFDQSxnQkFBSSxhQUFhLEtBQUssR0FBTCxDQUFTLENBQVQsRUFBWSxNQUFNLFdBQVcsUUFBakIsQ0FBWixDQUFqQjtBQUNBLGdCQUFJLEtBQUssT0FBTyxVQUFQLENBQWtCLFlBQVc7QUFDbEMseUJBQVMsV0FBVyxVQUFwQjtBQUNILGFBRlEsRUFFTixVQUZNLENBQVQ7QUFHQSx1QkFBVyxXQUFXLFVBQXRCO0FBQ0EsbUJBQU8sRUFBUDtBQUNILFNBUkQ7QUFTSDs7QUFFRCxRQUFJLENBQUMsT0FBTyxvQkFBWixFQUFrQztBQUM5QixlQUFPLG9CQUFQLEdBQThCLFVBQVMsRUFBVCxFQUFhO0FBQ3ZDLHlCQUFhLEVBQWI7QUFDSCxTQUZEO0FBR0g7QUFFSixDQTlJRCxFQThJRyxNQTlJSCxFQThJVyxRQTlJWCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCkge1xuICAgICd1c2Ugc3RyaWN0J1xuXG4gICAgbGV0IGFuaW1hdGVIZWFkZXIgPSB0cnVlLFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICBhbmltYXRlZEhlYWRlcixcbiAgICAgICAgY2FudmFzLFxuICAgICAgICBjdHgsXG4gICAgICAgIGNpcmNsZXMsXG4gICAgICAgIGZsYXNoU3RlcCA9IDEsXG4gICAgICAgIGZsYXNoVHJpZ2dlcixcbiAgICAgICAgaGFoYWhhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgIHNjcmVhbSA9IG5ldyBBdWRpbygnLi4vYXNzZXRzL2F1ZGlvL2RlYXRoLm9nZycpLFxuICAgICAgICB0YXJnZXQ7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaW5pdEhhaGFoYSgpO1xuICAgICAgICBpbml0SGVhZGVyKCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY3JvbGxDaGVjayk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gaW5pdEhhaGFoYSgpIHtcbiAgICAgICAgaGFoYWhhLmlkID0gJ2hhaGFoYSc7XG4gICAgICAgIGhhaGFoYS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBoYWhhaGEuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGhhaGFoYSk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb250VG91Y2hUaGlzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNjcmVhbS5wbGF5KCk7XG4gICAgICAgICAgICBoYWhhaGEuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGhhaGFoYS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXRIZWFkZXIoKSB7XG4gICAgICAgIHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgdGFyZ2V0ID0ge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IGhlaWdodFxuICAgICAgICB9O1xuXG4gICAgICAgIGFuaW1hdGVkSGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlci1hbmltYXRlZCcpO1xuICAgICAgICBhbmltYXRlZEhlYWRlci5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXG4gICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZXJvJyk7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICBjaXJjbGVzID0gW107XG4gICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgd2lkdGggKiAwLjU7IHgrKykge1xuICAgICAgICAgICAgdmFyIGMgPSBuZXcgQ2lyY2xlKCk7XG4gICAgICAgICAgICBjaXJjbGVzLnB1c2goYyk7XG4gICAgICAgIH1cbiAgICAgICAgYW5pbWF0ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjcm9sbENoZWNrKCkge1xuICAgICAgICBpZiAoZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPiBoZWlnaHQpXG4gICAgICAgICAgICBhbmltYXRlSGVhZGVyID0gZmFsc2U7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGFuaW1hdGVIZWFkZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2l6ZSgpIHtcbiAgICAgICAgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICBhbmltYXRlZEhlYWRlci5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgICAgICBpZiAoYW5pbWF0ZUhlYWRlcikge1xuICAgICAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gY2lyY2xlcykge1xuICAgICAgICAgICAgICAgIGNpcmNsZXNbaV0uZHJhdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBDaXJjbGUoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMucG9zID0ge307XG4gICAgICAgICAgICBpbml0KCk7XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgICAgIF90aGlzLnBvcy54ID0gTWF0aC5yYW5kb20oKSAqIHdpZHRoO1xuICAgICAgICAgICAgX3RoaXMucG9zLnkgPSBoZWlnaHQgKyBNYXRoLnJhbmRvbSgpICogMTAwO1xuICAgICAgICAgICAgX3RoaXMuYWxwaGEgPSAwLjEgKyBNYXRoLnJhbmRvbSgpICogMC4zO1xuICAgICAgICAgICAgX3RoaXMuc2NhbGUgPSAwLjEgKyBNYXRoLnJhbmRvbSgpICogMC4zO1xuICAgICAgICAgICAgX3RoaXMudmVsb2NpdHkgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmF3ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuYWxwaGEgPD0gMCkge1xuICAgICAgICAgICAgICAgIGluaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLnBvcy55IC09IF90aGlzLnZlbG9jaXR5O1xuICAgICAgICAgICAgX3RoaXMuYWxwaGEgLT0gMC4wMDA1O1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4LmFyYyhfdGhpcy5wb3MueCwgX3RoaXMucG9zLnksIF90aGlzLnNjYWxlICogMTAsIDAsIDIgKiBNYXRoLlBJLFxuICAgICAgICAgICAgICAgIGZhbHNlKTtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgyNTUsMTQ3LDE5MCwnICsgX3RoaXMuYWxwaGEgKyAnKSc7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBsYXN0VGltZSA9IDA7XG4gICAgdmFyIHZlbmRvcnMgPSBbJ21zJywgJ21veicsICd3ZWJraXQnLCAnbyddO1xuICAgIGZvciAodmFyIHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsreCkge1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZlbmRvcnNbeF0gKyAnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ10gfHwgd2luZG93W3ZlbmRvcnNbeF0gKyAnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgfVxuXG4gICAgaWYgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbihjYWxsYmFjaywgZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB2YXIgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKTtcbiAgICAgICAgICAgIHZhciBpZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7XG4gICAgICAgICAgICB9LCB0aW1lVG9DYWxsKTtcbiAgICAgICAgICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlmICghd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgICB9O1xuICAgIH1cblxufSkod2luZG93LCBkb2N1bWVudCk7XG4iXX0=
