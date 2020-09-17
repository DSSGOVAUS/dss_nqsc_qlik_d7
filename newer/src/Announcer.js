import { h, render, Component } from 'preact'
import AriaLiveAnnouncer from './Aria/AriaLiveAnnouncer'
export default render(<AriaLiveAnnouncer />, document.getElementById('aria-live-announcer'))
