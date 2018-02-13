import * as React from 'react';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { filter, map, takeUntil, concatAll, withLatestFrom } from 'rxjs/operators'
import './demo.scss';
import { Observable } from 'rxjs/Observable';

interface Pos {
  x: number;
  y: number
}

export default class extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    let video = this.refs.video as HTMLDivElement;

    let anchor = this.refs.anchor as HTMLDivElement;
    fromEvent(document, 'scroll').pipe(
      map((e) => anchor.getBoundingClientRect().bottom < 0),
    ).subscribe((flag) => {
      flag ? video.classList.add("video-fixed") : video.classList.remove("video-fixed");
    });
    let mouseDown = fromEvent<MouseEvent>(video, 'mousedown');
    let mouseMove = fromEvent<MouseEvent>(document, 'mousemove');
    let mouseUp = fromEvent<MouseEvent>(document, 'mouseup');
    mouseDown.pipe(
      filter(() => video.classList.contains('video-fixed')),
      map((e) => mouseMove.pipe(takeUntil(mouseUp))),
      concatAll(),
      withLatestFrom(mouseDown, (move: any, down: any): Pos => {
        console.log(move)
        return {
          x: move.clientX - down.offsetX,
          y: 0
        };
      })
    )
      .subscribe((res: Pos) => {
        video.style.top = res.y + "px";
        video.style.left = res.x + 'px';
      })
  }
  validValue = (value, max, min) => {
    return Math.min(Math.max(value, min), max)
  }
  render() {
    return (
      <div className="anchor" ref="anchor">
        <div className="video" ref="video">
          <div className="masker"></div>
          <video width="100%" controls>
            <source src="http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_stereo.ogg" type="video/ogg" />
            Your browser does not support HTML5 video.
        </video>
        </div>
        dadasd
      </div>

    );
  }
}